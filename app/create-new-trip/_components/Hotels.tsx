import React from "react";
import { Hotel } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import PlaceImage from "./PlaceImage";

interface HotelsProps {
    hotels: any[];
}

const Hotels = ({ hotels }: HotelsProps) => {
    return (
        <section className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            <div className="flex items-center gap-2">
                <Hotel className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-semibold">Recommended Stays</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {hotels?.map((hotel, idx) => (
                    <Card key={idx} className="overflow-hidden border-zinc-200 dark:border-zinc-800 hover:shadow-md transition-shadow">
                        <div className="aspect-video relative overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                            <PlaceImage
                                placeName={hotel.hotel_name}
                                className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                                fallback="https://placehold.co/800x600/e2e2e2/e2e2e2"
                            />
                            <div className="absolute top-2 right-2">
                                <Badge className="bg-white/90 dark:bg-zinc-900/90 text-zinc-900 dark:text-zinc-100 backdrop-blur-sm border-none">
                                    ⭐ {hotel.rating}
                                </Badge>
                            </div>
                        </div>
                        <CardContent className="p-4 space-y-2">
                            <h4 className="font-bold text-zinc-900 dark:text-zinc-100 line-clamp-1">{hotel.hotel_name}</h4>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">{hotel.description}</p>
                            <div className="flex items-center justify-between pt-2">
                                <span className="text-sm font-semibold text-primary">{hotel.price_per_night}</span>
                                <Badge variant="outline" className="text-[10px]">Per Night</Badge>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
};

export default Hotels;
