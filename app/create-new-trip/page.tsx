"use client";
import React, { useState } from "react";
import ChatSection, { TripPlan } from "./_components/ChatSection";
import TripPlanView from "@/app/create-new-trip/_components/TripPlanView";
import dynamic from "next/dynamic";

const CesiumGlobe = dynamic(() => import("./_components/CesiumGlobe"), { ssr: false });

const CreateNewTrip = () => {
    const [tripDetails, setTripDetails] = useState<TripPlan | null>(null);
    const [showPlan, setShowPlan] = useState(false);

    return (
        <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-zinc-50 dark:bg-zinc-950">
            {/* Left Side - Trip Plan or Welcome Container (50%) */}
            <div className="hidden md:flex flex-1 items-center justify-center relative overflow-hidden border-r border-zinc-200 dark:border-zinc-800">
                {showPlan && tripDetails ? (
                    <TripPlanView tripPlan={tripDetails} />
                ) : (
                    <div className="w-full h-full relative">
                        <CesiumGlobe />

                        {/* Overlay Text */}
                        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/30 pointer-events-none">
                            <div className="text-center space-y-4 p-8 backdrop-blur-sm bg-black/10 rounded-3xl">
                                <h1 className="text-4xl font-bold tracking-tight text-white drop-shadow-md">
                                    Plan Your Next <span className="text-primary">Adventure</span>
                                </h1>
                                <p className="text-white/90 max-w-md mx-auto text-lg drop-shadow-sm">
                                    Our AI-powered travel assistant will help you create the perfect itinerary in seconds.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Right Side - Chat Section (50%) */}
            <div className="flex-1 w-full md:max-w-[50%] h-full">
                <ChatSection
                    onTripPlanUpdate={(plan) => setTripDetails(plan)}
                    onViewPlan={() => setShowPlan(true)}
                />
            </div>
        </div>
    );
};

export default CreateNewTrip;
