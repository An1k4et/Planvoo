import React from "react";
import { TripPlan } from "./ChatSection";
import {
    MapPin,
    IndianRupee,
    Star,
    Info
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Hotels from "./Hotels";
import Itinerary from "./Itinerary";

interface TripPlanViewProps {
    tripPlan: TripPlan;
}

const TripPlanView = ({ tripPlan }: TripPlanViewProps) => {

    return (
        <div className="w-full h-full overflow-y-auto p-6 space-y-8 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800 bg-white dark:bg-zinc-950">
            {/* Header Section */}
            <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-700">
                <div className="flex items-center justify-between">
                    <Badge variant="outline" className="px-3 py-1 text-primary border-primary/20 bg-primary/5">
                        {tripPlan.duration} Adventure
                    </Badge>
                    <div className="flex items-center gap-2 text-zinc-500 text-sm">
                        <MapPin className="w-4 h-4" />
                        <span>{tripPlan.origin} → {tripPlan.destination}</span>
                    </div>
                </div>
                <h2 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                    Your Trip to <span className="text-primary">{tripPlan.destination}</span>
                </h2>
                <div className="flex flex-wrap gap-3">
                    <Badge variant="secondary" className="flex items-center gap-1.5">
                        <IndianRupee className="w-3.5 h-3.5" />
                        {tripPlan.budget}
                    </Badge>
                    <Badge variant="secondary" className="flex items-center gap-1.5">
                        <Star className="w-3.5 h-3.5" />
                        {tripPlan.group_size}
                    </Badge>
                </div>
            </div>

            {/* Hotels Section */}
            <Hotels hotels={tripPlan.hotels} />

            {/* Itinerary Section */}
            <Itinerary itinerary={tripPlan.itinerary} />

            {/* Footer Note */}
            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 flex gap-3 items-start">
                <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    This itinerary is AI-generated based on your preferences. Prices and timings are estimates and may vary. We recommend checking local conditions and booking in advance.
                </p>
            </div>
        </div>
    );
};

export default TripPlanView;
