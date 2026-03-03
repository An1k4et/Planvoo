"use client";

import React, { useEffect, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";
import { TripPlan } from "../create-new-trip/_components/ChatSection";
import UserTripCard from "./_components/UserTripCard";
import { Loader2, Plane, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface Trip {
    id: string;
    user_id: string;
    trip_details: TripPlan;
    created_at: string;
}

const MyTrips = () => {
    const [trips, setTrips] = useState<Trip[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = getSupabaseBrowserClient();
    const router = useRouter();

    useEffect(() => {
        fetchTrips();
    }, []);

    const fetchTrips = async () => {
        try {
            setLoading(true);
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                router.push("/");
                return;
            }

            const { data, error } = await supabase
                .from("trips")
                .select("*")
                .eq("user_id", user.id)
                .order("created_at", { ascending: false });

            if (error) throw error;
            setTrips(data || []);
        } catch (error) {
            console.error("Error fetching trips:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex h-[calc(100vh-64px)] items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-64px)] bg-zinc-50 dark:bg-zinc-950 p-6 md:p-12">
            <div className="max-w-7xl mx-auto space-y-12">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                            <Plane className="w-3.5 h-3.5" />
                            My Travel History
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-100 italic">
                            Your Saved <span className="text-primary">Adventures</span>
                        </h1>
                        <p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-2xl">
                            Explore your past trip plans, itineraries, and memories all in one place.
                        </p>
                    </div>
                    {trips.length > 0 && (
                        <Button
                            className="rounded-2xl px-6 py-6 h-auto shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all hover:scale-[1.02]"
                            onClick={() => router.push("/create-new-trip")}
                        >
                            <Plus className="w-5 h-5 mr-2" />
                            Create New Trip
                        </Button>
                    )}
                </div>

                {/* Grid */}
                {trips.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {trips.map((trip) => (
                            <UserTripCard key={trip.id} trip={trip} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-24 px-6 text-center space-y-8 bg-white dark:bg-zinc-900 rounded-[3rem] border border-zinc-200 dark:border-zinc-800 shadow-sm">
                        <div className="w-24 h-24 bg-zinc-100 dark:bg-zinc-800 rounded-3xl flex items-center justify-center rotate-3">
                            <Plane className="w-12 h-12 text-zinc-400 dark:text-zinc-500" />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                                No trips planned yet
                            </h2>
                            <p className="text-zinc-500 dark:text-zinc-400 max-w-sm">
                                Start your journey by creating your first AI-powered travel itinerary.
                            </p>
                        </div>
                        <Button
                            size="lg"
                            className="rounded-2xl px-8 py-7 h-auto text-lg font-semibold shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all hover:scale-[1.05]"
                            onClick={() => router.push("/create-new-trip")}
                        >
                            Get Started Now
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyTrips;
