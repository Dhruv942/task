import React from 'react'
import type { Product } from '../types'
import { ProductCard } from './ProductCard'

type Props = {
	products: Product[]
	allCount: number
}

export function ProductGrid({ products, allCount }: Props): JSX.Element {
	return (
		<section>
			<div className="mb-8 flex items-center justify-between">
				<h2 className="text-3xl font-bold text-gray-900 tracking-tight">
					All Products
				</h2>
				<span className="text-sm font-semibold text-gray-600 bg-gray-100 px-4 py-2 rounded-full border border-gray-200">
					{products.length} of {allCount} items
				</span>
			</div>
			{products.length === 0 ? (
				<div className="text-center py-20">
					<p className="text-2xl font-semibold text-gray-500 mb-2">No products found</p>
					<p className="text-base text-gray-400">Try adjusting your filters</p>
				</div>
			) : (
				<ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{products.map((p) => (
						<ProductCard key={p.id} product={p} />
					))}
				</ul>
			)}
		</section>
	)
}
