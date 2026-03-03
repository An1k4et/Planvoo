import React from 'react'
import { Wallet, Banknote, Landmark } from 'lucide-react'

const budgetOptions = [
    {
        id: 1,
        title: "Cheap",
        description: "Stay conscious of costs",
        icon: Wallet,
        value: "Cheap (Economy)"
    },
    {
        id: 2,
        title: "Moderate",
        description: "Keep cost on average side",
        icon: Banknote,
        value: "Moderate (Mid-range)"
    },
    {
        id: 3,
        title: "Luxury",
        description: "Don't worry about cost",
        icon: Landmark,
        value: "Luxury (High-end)"
    }
]

interface BudgetUIProps {
    onSelectOption: (value: string) => void
}

function BudgetUI({ onSelectOption }: BudgetUIProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
            {budgetOptions.map((option) => (
                <button
                    key={option.id}
                    onClick={() => onSelectOption(option.value)}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 text-center group"
                >
                    <div className="p-3 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 group-hover:bg-primary/10 group-hover:text-primary">
                        <option.icon className="w-6 h-6" />
                    </div>
                    <div>
                        <h4 className="font-medium text-zinc-900 dark:text-zinc-100 text-sm">
                            {option.title}
                        </h4>
                        <p className="text-[10px] text-zinc-500 dark:text-zinc-400">
                            {option.description}
                        </p>
                    </div>
                </button>
            ))}
        </div>
    )
}

export default BudgetUI
