import React from 'react'
import { PlusCircle, Sparkles, TrendingUp, Gem, Mountain } from 'lucide-react'

const options = [
    {
        id: 1,
        title: "Create New Trip",
        icon: PlusCircle,
        description: "Plan your next adventure from scratch",
        primary: true
    },
    {
        id: 2,
        title: "Inspire Me Where To Go",
        icon: Sparkles,
        description: "Let AI suggest your next destination",
    },
    {
        id: 3,
        title: "Most Visited Places",
        icon: TrendingUp,
        description: "Explore popular travel destinations",
    },
    {
        id: 4,
        title: "Hidden Gems",
        icon: Gem,
        description: "Discover off-the-beaten-path locations",
    },
    {
        id: 5,
        title: "Adventure Destinations",
        icon: Mountain,
        description: "Find your next adrenaline rush",
    }
]

function EmptyBoxState({ onSelectOption }: any) {
    return (
        <div className="flex flex-col items-center justify-center py-10 px-4">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                    Ready for your next adventure?
                </h2>
                <p className="text-zinc-500 dark:text-zinc-400">
                    Choose an option below to get started with your trip planning.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
                {options.map((option) => (
                    <button
                        key={option.id}
                        onClick={() => { onSelectOption(option.title) }}
                        className={`flex items-start gap-4 p-5 rounded-2xl border transition-all duration-200 text-left group
                            ${option.primary
                                ? "bg-primary/5 border-primary/20 hover:bg-primary/10 hover:border-primary/30"
                                : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-primary/50 hover:shadow-lg dark:hover:bg-zinc-800/50"
                            }`}
                    >
                        <div className={`p-3 rounded-xl shrink-0 ${option.primary ? "bg-primary text-primary-foreground" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 group-hover:text-primary group-hover:bg-primary/10"}`}>
                            <option.icon className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                                {option.title}
                            </h3>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2">
                                {option.description}
                            </p>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default EmptyBoxState