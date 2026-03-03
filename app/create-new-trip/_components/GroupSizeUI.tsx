import React from 'react'
import { User, Users, Home, Users2 } from 'lucide-react'

const groupOptions = [
    {
        id: 1,
        title: "Solo",
        description: "A lone traveler",
        icon: User,
        value: "Solo (1 Person)"
    },
    {
        id: 2,
        title: "Couple",
        description: "Two people",
        icon: Users,
        value: "Couple (2 People)"
    },
    {
        id: 3,
        title: "Family",
        description: "3 to 5 people",
        icon: Home,
        value: "Family (3-5 People)"
    },
    {
        id: 4,
        title: "Friends",
        description: "5+ people",
        icon: Users2,
        value: "Friends (5+ People)"
    }
]

interface GroupSizeUIProps {
    onSelectOption: (value: string) => void
}

function GroupSizeUI({ onSelectOption }: GroupSizeUIProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            {groupOptions.map((option) => (
                <button
                    key={option.id}
                    onClick={() => onSelectOption(option.value)}
                    className="flex items-center gap-3 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 text-left group"
                >
                    <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 group-hover:bg-primary/10 group-hover:text-primary">
                        <option.icon className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="font-medium text-zinc-900 dark:text-zinc-100 text-sm">
                            {option.title}
                        </h4>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            {option.description}
                        </p>
                    </div>
                </button>
            ))}
        </div>
    )
}

export default GroupSizeUI
