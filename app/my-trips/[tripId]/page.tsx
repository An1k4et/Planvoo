"use client";

import React, { useEffect, useState, use } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";
import { TripPlan } from "../../create-new-trip/_components/ChatSection";
import TripPlanView from "../../create-new-trip/_components/TripPlanView";
import { Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface TripDetailPageProps {
    params: Promise<{ tripId: string }>;
}

const TripDetailPage = ({ params }: TripDetailPageProps) => {
    const { tripId } = use(params);
    const [tripPlan, setTripPlan] = useState<TripPlan | null>(null);
    const [loading, setLoading] = useState(true);
    const supabase = getSupabaseBrowserClient();
    const router = useRouter();

    useEffect(() => {
        if (tripId) {
            fetchTripDetails();
        }
    }, [tripId]);

    const fetchTripDetails = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from("trips")
                .select("*")
                .eq("id", tripId)
                .single();

            if (error) throw error;
            if (data) {
                const tripData = data as any;
                setTripPlan(tripData.trip_details as TripPlan);
            }
        } catch (error) {
            console.error("Error fetching trip details:", error);
            router.push("/my-trips");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex h-[calc(100vh-64px)] items-center justify-center bg-white dark:bg-zinc-950">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!tripPlan) {
        return (
            <div className="flex flex-col h-[calc(100vh-64px)] items-center justify-center p-6 text-center space-y-4 bg-white dark:bg-zinc-950">
                <h2 className="text-2xl font-bold">Trip not found</h2>
                <Button onClick={() => router.push("/my-trips")}>Back to My Trips</Button>
            </div>
        );
    }

    return (
        <div className="h-[calc(100vh-64px)] overflow-hidden flex flex-col bg-white dark:bg-zinc-950">
            {/* Control Bar */}
            <div className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-900/50 backdrop-blur-sm">
                <Button
                    variant="ghost"
                    className="rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    onClick={() => router.push("/my-trips")}
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to History
                </Button>
                <div className="text-xs font-medium text-zinc-400">
                    Sytem ID: {tripId}
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-hidden">
                <TripPlanView tripPlan={tripPlan} />
            </div>
        </div>
    );
};

export default TripDetailPage;
