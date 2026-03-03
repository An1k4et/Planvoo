import React from 'react'
import { Loader2, CheckCircle2, Map } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface FinalTripUIProps {
    loading: boolean
    onViewPlan?: () => void
}

function FinalTripUI({ loading, onViewPlan }: FinalTripUIProps) {
    return (
        <div className="flex flex-col items-center gap-6 mt-4 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl animate-in fade-in zoom-in duration-500">
            {loading ? (
                <div className="flex flex-col items-center gap-4 text-center">
                    <div className="relative">
                        <Loader2 className="w-12 h-12 text-primary animate-spin" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Map className="w-5 h-5 text-primary/50" />
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-lg">
                            Creating your personalized trip plan...
                        </h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                            Our AI is finding the best spots just for you.
                        </p>
                    </div>
                    <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden mt-2">
                        <div className="bg-primary h-full animate-progress-indeterminate" />
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center gap-4 text-center">
                    <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                        <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                        <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-xl">
                            Your Trip is Ready!
                        </h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                            We've crafted a perfect itinerary for your next adventure.
                        </p>
                    </div>
                    <Button
                        onClick={onViewPlan}
                        className="w-full mt-4 py-6 text-lg font-semibold rounded-xl"
                    >
                        View Trip Plan
                    </Button>
                </div>
            )}
        </div>
    )
}

export default FinalTripUI
