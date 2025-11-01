import React from 'react'
import type { Product } from '../types'

type Props = {
	categories: Product['category'][]
	selected: Set<Product['category']>
	onToggle: (category: Product['category']) => void
}

export function CategoryFilter({ categories, selected, onToggle }: Props): JSX.Element {
	return (
		<div className="rounded-lg border bg-white p-4 shadow-sm">
			<h2 className="mb-3 text-lg font-semibold">Category</h2>
			<div className="space-y-2">
				{categories.map((c) => (
					<label key={c} className="flex cursor-pointer items-center gap-2">
						<input
							type="checkbox"
							checked={selected.has(c)}
							onChange={() => onToggle(c)}
							className="h-4 w-4"
						/>
						<span>{c}</span>
					</label>
				))}
			</div>
		</div>
	)
}
