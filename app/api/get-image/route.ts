import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
    try {
        const { placeName } = await req.json();

        if (!placeName) {
            return NextResponse.json({ error: "Place name is required" }, { status: 400 });
        }

        const accessKey = process.env.UNSPLASH_ACCESS_KEY || process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

        if (!accessKey) {
            console.error("Unsplash Access Key is missing");
            return NextResponse.json({ error: "API configuration error" }, { status: 500 });
        }

        const response = await axios.get(`https://api.unsplash.com/search/photos`, {
            params: {
                query: placeName,
                client_id: accessKey,
                per_page: 1
            }
        });

        const photoUrl = response.data?.results?.[0]?.urls?.regular || null;

        return NextResponse.json({ photoUrl });
    } catch (error: any) {
        console.error("Error fetching image from Unsplash:", error.response?.data || error.message);
        return NextResponse.json({ error: "Failed to fetch image" }, { status: 500 });
    }
}
