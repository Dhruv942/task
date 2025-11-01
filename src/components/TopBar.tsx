import type { SortKey, SortOrder, Product } from '../types'
import type { JSX } from 'react'

type Props = {
	query: string
	onChangeQuery: (v: string) => void
	sortKey: SortKey
	sortOrder: SortOrder
	onChangeKey: (k: SortKey) => void
	onChangeOrder: (o: SortOrder) => void
	categories: Product['category'][]
	selectedCategories: Set<Product['category']>
	onToggleCategory: (category: Product['category']) => void
	minPrice: string
	maxPrice: string
	onChangeMinPrice: (v: string) => void
	onChangeMaxPrice: (v: string) => void
}

export function TopBar({ 
	query, 
	onChangeQuery, 
	sortKey, 
	sortOrder, 
	onChangeKey, 
	onChangeOrder,
	categories,
	selectedCategories,
	onToggleCategory,
	minPrice,
	maxPrice,
	onChangeMinPrice,
	onChangeMaxPrice
}: Props): JSX.Element {
	return (
		<div className="mt-5 space-y-5">
			<input
				type="text"
				value={query}
				onChange={(e) => onChangeQuery(e.target.value)}
				placeholder="Search for products..."
				className="w-full rounded-xl border-2 border-gray-300 px-5 py-4 text-base shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
			/>
			
			<div className="flex flex-wrap gap-4 items-center">
				<div className="flex items-center gap-3">
					<span className="text-sm font-semibold text-gray-700">Category:</span>
					<div className="flex flex-wrap gap-2">
						{categories.map((cat) => (
							<button
								key={cat}
								onClick={() => onToggleCategory(cat)}
								className={`px-4 py-2 rounded-full text-sm font-semibold ${
									selectedCategories.has(cat)
										? 'bg-blue-600 text-white shadow-md'
										: 'bg-gray-100 text-gray-700'
								}`}
							>
								{cat}
							</button>
						))}
					</div>
				</div>

				<div className="flex items-center gap-3 ml-auto">
					<span className="text-sm font-semibold text-gray-700">Price:</span>
					<input
						type="number"
						value={minPrice}
						onChange={(e) => onChangeMinPrice(e.target.value)}
						placeholder="₹ Min"
						className="w-28 rounded-xl border-2 border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
					/>
					<span className="text-gray-500 font-semibold">-</span>
					<input
						type="number"
						value={maxPrice}
						onChange={(e) => onChangeMaxPrice(e.target.value)}
						placeholder="₹ Max"
						className="w-28 rounded-xl border-2 border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
					/>
				</div>

				<div className="flex items-center gap-3">
					<span className="text-sm font-semibold text-gray-700">Sort by:</span>
					<select
						value={sortKey}
						onChange={(e) => onChangeKey(e.target.value as SortKey)}
						className="rounded-xl border-2 border-gray-300 px-4 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
					>
						<option value="name">Name</option>
						<option value="price">Price</option>
						<option value="rating">Rating</option>
					</select>
					<select
						value={sortOrder}
						onChange={(e) => onChangeOrder(e.target.value as SortOrder)}
						className="rounded-xl border-2 border-gray-300 px-4 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
					>
						<option value="asc">Low to High</option>
						<option value="desc">High to Low</option>
					</select>
				</div>
			</div>
		</div>
	)
}
