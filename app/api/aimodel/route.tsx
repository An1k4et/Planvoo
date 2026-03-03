import { NextRequest, NextResponse } from "next/server";
import OpenAI from 'openai';
import { createSupabaseServerClient } from "@/lib/supabase/server-client";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPEN_ROUTER_API_KEY,
});

const systemPrompt = `You are an AI Trip Planner Agent. Your goal is to help the user plan a trip by asking one relevant trip-related question at a time.
Only ask questions about the following details in order, and wait for the user's answer before asking the next:

1. Starting location (source)
2. Destination city or country
3. Group size (Solo, Couple, Family, Friends)
4. Budget (Low, Medium, High)
5. Trip duration (number of days)

Do not ask multiple questions at once, and never ask irrelevant questions.
If any answer is missing or unclear, politely ask the user to clarify before proceeding.
Always maintain a conversational, interactive style while asking questions.
Along with response also send which ui component to display for generative UI for example 'budget/groupSize/tripDuration/final', where final means AI generating result.

Once all required information is collected, generate and return a strict JSON response only (no explanations or extra text) with following JSON schema:

{
  resp: "Text Resp",
  ui: "budget/groupSize/tripDuration/final"
}
`;

const final_prompt = `Generate Travel Plan with give details, give me Hotels options list with HotelName,
Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggested itinerary with placeName, Place Details,
Geo Coordinates, Place address, ticket Pricing, Time travel each of the location , with each day plan with best time to visit in .
Output Schema:
{
  "trip_plan": {
    "destination": "string",
    "duration": "string",
    "origin": "string",
    "budget": "string",
    "group_size": "string",
    "hotels": [
      {
        "hotel_name": "string",
        "hotel_address": "string",
        "price_per_night": "string",
        "hotel_image_url": "string",
        "geo_coordinates": {
          "latitude": "number",
          "longitude": "number"
        },
        "rating": "number",
        "description": "string"
      }
    ],
    "itinerary": [
      {
        "day": "number",
        "day_plan": "string",
        "best_time_to_visit_day": "string",
        "activities": [
          {
            "place_name": "string",
            "place_details": "string",
            "place_image_url": "string",
            "geo_coordinates": {
              "latitude": "number",
              "longitude": "number"
            },
            "place_address": "string",
            "ticket_pricing": "string",
            "time_travel_each_location": "string",
            "best_time_to_visit": "string"
          }
        ]
      }
    ]
  }
}`;


function safeJsonParse(content: string) {
  try {
    return JSON.parse(content);
  } catch {
    const match = content.match(/\{[\s\S]*\}/);
    if (!match) {
      throw new Error("No JSON found in model response");
    }
    return JSON.parse(match[0]);
  }
}



export async function POST(req: NextRequest) {
  const { messages, isFinal } = await req.json();

  try {
    const supabase = await createSupabaseServerClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Rate limit check: only 1 trip allowed per user
    if (isFinal) {
      const { count, error: countError } = await supabase
        .from("trips")
        .select("*", { count: 'exact', head: true })
        .eq("user_id", user.id);

      if (countError) {
        console.error("Error checking trip count:", countError);
        return NextResponse.json({ error: "Failed to check trip count" }, { status: 500 });
      }

      if (count && count >= 1) {
        return NextResponse.json({
          resp: "You have already generated a trip. Your limit is 1 trip plan.",
          error: "Rate limit reached"
        }, { status: 403 });
      }
    }

    const MODEL = process.env.OPENROUTER_MODEL || "openrouter/free";

    const completion = await openai.chat.completions.create({
      model: MODEL,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: isFinal
            ? final_prompt + "\n\nReturn ONLY valid JSON. No explanation."
            : systemPrompt + "\n\nReturn ONLY valid JSON."
        },
        ...messages
      ]
    });

    const message = completion.choices[0].message;
    if (!message.content) {
      throw new Error("Empty response from model");
    }

    const parsed = safeJsonParse(message.content);

    return NextResponse.json(parsed);
  }
  catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 });
  }
}
