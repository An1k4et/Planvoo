import React, { useState } from 'react'
import { Minus, Plus, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface TripDurationUIProps {
    onSelectOption: (value: string) => void
}

function TripDurationUI({ onSelectOption }: TripDurationUIProps) {
    const [days, setDays] = useState(1)

    const handleIncrement = () => setDays(prev => Math.min(prev + 1, 30))
    const handleDecrement = () => setDays(prev => Math.max(prev - 1, 1))

    return (
        <div className="flex flex-col items-center gap-4 mt-4 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
            <div className="flex items-center gap-3 text-primary">
                <Calendar className="w-5 h-5" />
                <span className="font-semibold text-sm uppercase tracking-wider">Select Duration</span>
            </div>

            <div className="flex items-center gap-8">
                <button
                    onClick={handleDecrement}
                    className="w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                >
                    <Minus className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                </button>

                <div className="flex flex-col items-center">
                    <span className="text-4xl font-bold text-zinc-900 dark:text-zinc-100">{days}</span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">DAYS</span>
                </div>

                <button
                    onClick={handleIncrement}
                    className="w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                >
                    <Plus className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                </button>
            </div>

            <Button
                onClick={() => onSelectOption(`${days} Days`)}
                className="w-full mt-2 rounded-xl"
            >
                Confirm Duration
            </Button>
        </div>
    )
}

export default TripDurationUI
