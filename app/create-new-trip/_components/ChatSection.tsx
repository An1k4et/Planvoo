"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Send, User, Bot, Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import EmptyBoxState from "./EmptyBoxState";
import GroupSizeUI from "./GroupSizeUI";
import BudgetUI from "./BudgetUI";
import TripDurationUI from "./TripDurationUI";
import FinalTripUI from "./FinalTripUI";
import { v4 as uuidv4 } from 'uuid';
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";
import { Json } from "@/lib/supabase/database";



type Message = {
    role: string,
    content: string,
    ui?: string,
};

export type TripPlan = {
    budget: string;
    destination: string;
    duration: string;
    group_size: string;
    origin: string;
    hotels: any[];
    itinerary: any[];
}


const saveTripToSupabase = async (tripPlan: TripPlan) => {
    const supabase = getSupabaseBrowserClient();

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
        console.error("Authentication error:", userError?.message || "User not logged in");
        return;
    }

    if (!tripPlan) {
        console.error("No trip plan to save");
        return;
    }

    const tripId = uuidv4();

    const { error } = await (supabase as any)
        .from("trips")
        .insert({
            id: tripId,
            user_id: user.id,
            trip_details: tripPlan,
        });


    if (error) {
        console.error("Failed to save trip:", error.message, error.details, error.hint);
    } else {
        console.log("Trip saved successfully with ID:", tripId);
    }
};



interface ChatSectionProps {
    onTripPlanUpdate: (plan: TripPlan) => void;
    onViewPlan: () => void;
}

const ChatSection = ({ onTripPlanUpdate, onViewPlan }: ChatSectionProps) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [isFinal, setIsFinal] = useState(false);
    const [tripDetails, setTripDetails] = useState<TripPlan>();
    const [hasExistingTrip, setHasExistingTrip] = useState(false);

    useEffect(() => {
        checkUserTripCount();
    }, []);

    const checkUserTripCount = async () => {
        const supabase = getSupabaseBrowserClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
            const { count, error } = await supabase
                .from("trips")
                .select("*", { count: 'exact', head: true })
                .eq("user_id", user.id);

            if (!error && count && count >= 1) {
                setHasExistingTrip(true);
            }
        }
    };

    const handleSend = async (overrideInput?: string) => {
        const messageContent = overrideInput || input;
        if (!messageContent.trim() || loading) return;



        setLoading(true);

        const userMessage: Message = {
            role: "user",
            content: messageContent,
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");

        try {
            const result = await axios.post("/api/aimodel", {
                messages: [...messages, userMessage],
                isFinal: isFinal
            });

            // Simulate AI response 
            setTimeout(() => {
                !isFinal && setMessages((prev) => [
                    ...prev,
                    {
                        role: "assistant",
                        content: result?.data?.resp,
                        ui: result?.data?.ui
                    },
                ]);
            }, 1000);

            if (isFinal) {
                const tripPlan = result?.data?.trip_plan;
                setTripDetails(tripPlan);
                onTripPlanUpdate(tripPlan);
                setIsFinal(false);
                console.log(tripPlan);
                await saveTripToSupabase(tripPlan);
            }
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: "Something went wrong. Please try again.",
                },
            ]);
        } finally {
            setLoading(false);
            // Refresh trip count check after final generation
            if (isFinal) {
                setTimeout(checkUserTripCount, 2000);
            }
        }
    };

    const RenderGenerativeUi = (ui: string) => {
        const onSelect = (v: string) => {
            setInput(v);
            // We need to call handleSend but handleSend uses the current 'input' state
            // which might not be updated yet. So we pass the value directly or use a trick.
            // For now, let's just set input and the user can press send, 
            // OR we can refactor handleSend to take an optional value.
        }

        if (ui == 'budget') {
            return <BudgetUI onSelectOption={(v) => { setInput(v); setTimeout(() => handleSend(v), 0) }} />
        }
        if (ui == 'groupSize') {
            return <GroupSizeUI onSelectOption={(v) => { setInput(v); setTimeout(() => handleSend(v), 0) }} />
        }
        if (ui == 'tripDuration') {
            return <TripDurationUI onSelectOption={(v) => { setInput(v); setTimeout(() => handleSend(v), 0) }} />
        }
        if (ui == 'final') {
            return <FinalTripUI
                loading={loading}
                onViewPlan={onViewPlan} />
        }

        return null;
    }

    useEffect(() => {
        const lastMessage = messages[messages.length - 1];
        if (lastMessage?.ui == 'final') {
            setIsFinal(true);
            setInput('Ok, Great!');
            //handleSend();
        }
    }, [messages]);

    useEffect(() => {
        if (isFinal && input) {
            handleSend();
        }
    }, [isFinal]);

    return (
        <div className="flex flex-col h-full bg-white dark:bg-zinc-950 border-l border-zinc-200 dark:border-zinc-800 shadow-2xl">
            {/* Header */}
            <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-3 bg-zinc-50/50 dark:bg-zinc-900/50 backdrop-blur-sm">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bot className="w-6 h-6 text-primary" />
                </div>
                <div>
                    <h2 className="font-semibold text-zinc-900 dark:text-zinc-100">AI Travel Planner</h2>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        {hasExistingTrip ? "Trip limit reached (1/1)" : "Always active to help you"}
                    </p>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800">
                {messages.length === 0 &&
                    <EmptyBoxState onSelectOption={(v: string) => { setInput(v); handleSend(v) }} />
                }
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}
                    >
                        <div
                            className={`max-w-[80%] flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"
                                }`}
                        >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                                }`}>
                                {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                            </div>
                            <div
                                className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.role === "user"
                                    ? "bg-primary text-primary-foreground rounded-tr-none"
                                    : "bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-tl-none"
                                    }`}
                            >
                                {msg.role === "assistant" && loading && msg.content === "" ? (
                                    <div className="flex items-center gap-2">
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        <span className="text-xs">Thinking...</span>
                                    </div>
                                ) : (
                                    msg.content
                                )}
                                {msg.ui && RenderGenerativeUi(msg.ui)}
                            </div>

                        </div>
                    </div>
                ))}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 backdrop-blur-sm">
                <div className="relative flex items-center gap-2 max-w-4xl mx-auto">
                    <Textarea
                        placeholder={hasExistingTrip ? "You have reached your limit of 1 trip plan." : "Type your message..."}
                        value={input}
                        disabled={loading || hasExistingTrip}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        className="pr-12 py-6 rounded-2xl border-zinc-200 dark:border-zinc-800 focus-visible:ring-primary shadow-inner bg-white dark:bg-zinc-950"
                    />
                    <Button
                        size="icon"
                        disabled={loading || hasExistingTrip}
                        onClick={() => handleSend()}
                        className="absolute right-2 rounded-xl h-10 w-10"
                    >
                        {loading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Send className="w-4 h-4" />
                        )}
                    </Button>

                </div>
                <p className="text-[10px] text-center mt-2 text-zinc-400 dark:text-zinc-500">
                    AI can make mistakes. Check important info.
                </p>
            </div>
        </div>
    );
};

export default ChatSection;
