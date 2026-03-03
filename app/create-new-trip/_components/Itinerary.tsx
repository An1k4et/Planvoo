import React from "react";
import { Calendar, Clock, MapPin, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PlaceImage from "./PlaceImage";

interface ItineraryProps {
    itinerary: any[];
}

const Itinerary = ({ itinerary }: ItineraryProps) => {
    return (
        <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400">
            <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-semibold">Day-by-Day Itinerary</h3>
            </div>

            <div className="space-y-8">
                {itinerary?.map((day, dayIdx) => (
                    <div key={dayIdx} className="relative pl-8 border-l-2 border-zinc-100 dark:border-zinc-800 space-y-4">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-white dark:border-zinc-950 shadow-sm" />

                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Day {day.day}: {day.day_plan}</h4>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5 mt-1">
                                    <Clock className="w-3.5 h-3.5" />
                                    Best time: {day.best_time_to_visit_day}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {day.activities?.map((activity: any, actIdx: number) => (
                                <Card key={actIdx} className="overflow-hidden border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
                                    <div className="flex flex-col sm:flex-row">
                                        <div className="w-full sm:w-48 h-48 sm:h-auto relative shrink-0 overflow-hidden">
                                            <PlaceImage
                                                placeName={activity.place_name}
                                                className="object-cover w-full h-full hover:scale-110 transition-transform duration-700"
                                                fallback="https://placehold.co/800x600/e2e2e2/e2e2e2"
                                            />
                                        </div>
                                        <CardContent className="p-5 flex-1 space-y-3">
                                            <div className="flex items-start justify-between gap-2">
                                                <div>
                                                    <h5 className="font-bold text-zinc-900 dark:text-zinc-100">{activity.place_name}</h5>
                                                    <p className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1 mt-0.5">
                                                        <MapPin className="w-3 h-3" />
                                                        {activity.place_address}
                                                    </p>
                                                </div>
                                                <Badge variant="outline" className="bg-white dark:bg-zinc-900 shrink-0">
                                                    {activity.ticket_pricing}
                                                </Badge>
                                            </div>

                                            <p className="text-sm text-zinc-600 dark:text-zinc-300 line-clamp-2 italic">
                                                "{activity.place_details}"
                                            </p>

                                            <div className="flex flex-wrap gap-4 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                                                <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                                                    <Clock className="w-3.5 h-3.5 text-primary" />
                                                    <span>Visit: {activity.best_time_to_visit}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                                                    <ChevronRight className="w-3.5 h-3.5 text-primary" />
                                                    <span>Duration: {activity.time_travel_each_location}</span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Itinerary;
