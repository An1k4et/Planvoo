"use client";

import React from "react";
import { TripPlan } from "../../create-new-trip/_components/ChatSection";
import {
    MapPin,
    IndianRupee,
    Users,
    Calendar,
    ArrowRight
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface UserTripCardProps {
    trip: {
        id: string;
        trip_details: TripPlan;
        created_at: string;
    };
}

const UserTripCard = ({ trip }: UserTripCardProps) => {
    const router = useRouter();
    const details = trip.trip_details;

    return (
        <div className="group relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
            <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                </div>
            </div>

            <div className="space-y-6">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-medium text-zinc-400 uppercase tracking-wider">
                        <Calendar className="w-3 h-3" />
                        {new Date(trip.created_at).toLocaleDateString()}
                    </div>
                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-primary transition-colors">
                        {details.destination}
                    </h3>
                    <div className="flex items-center gap-2 text-zinc-500 text-sm">
                        <MapPin className="w-4 h-4" />
                        <span>from {details.origin}</span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 border-none text-zinc-600 dark:text-zinc-400 flex gap-1.5 items-center">
                        <Calendar className="w-3.5 h-3.5" />
                        {details.duration}
                    </Badge>
                    <Badge variant="secondary" className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 border-none text-zinc-600 dark:text-zinc-400 flex gap-1.5 items-center">
                        <IndianRupee className="w-3.5 h-3.5" />
                        {details.budget}
                    </Badge>
                    <Badge variant="secondary" className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 border-none text-zinc-600 dark:text-zinc-400 flex gap-1.5 items-center">
                        <Users className="w-3.5 h-3.5" />
                        {details.group_size}
                    </Badge>
                </div>

                <Button
                    className="w-full rounded-2xl py-6 text-base font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
                    onClick={() => router.push(`/my-trips/${trip.id}`)}
                >
                    View Itinerary
                </Button>
            </div>

            {/* Decorative background element */}
            <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-primary/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
    );
};

export default UserTripCard;
