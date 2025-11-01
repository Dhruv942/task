import React, { useState } from 'react'
import type { Product } from '../types'
import { Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import type { JSX } from 'react'

type Props = {
	product: Product
}

export function ProductCard({ product }: Props): JSX.Element {
	const { addToCart } = useCart()
	const [isAdding, setIsAdding] = useState(false)

	const handleAddToCart = (e: React.MouseEvent): void => {
		e.preventDefault()
		setIsAdding(true)
		addToCart(product)
		setTimeout(() => setIsAdding(false), 300)
	}

	return (
		<li className="rounded-2xl border border-gray-300 bg-white overflow-hidden shadow-md">
			<Link to={`/product/${product.id}`} className="block">
				{product.imageUrl && (
					<div className="relative mb-4 aspect-square w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
						<img
							src={product.imageUrl}
							alt={product.name}
							className="h-full w-full object-contain p-2 transition-opacity duration-300"
							loading="lazy"
							decoding="async"
							onError={(e) => {
								const target = e.target as HTMLImageElement
								target.style.display = 'none'
							}}
						/>
						<span className="absolute top-3 right-3 bg-black/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
							{product.category}
						</span>
					</div>
				)}
				<div className="px-5 pb-5">
					<h3 className="text-base font-bold text-gray-900 line-clamp-2 min-h-12 mb-3 leading-snug">
						{product.name}
					</h3>
					<div className="flex items-center justify-between mb-4">
						<span className="text-2xl font-bold text-blue-600">₹{product.price.toLocaleString()}</span>
						<div className="flex items-center gap-1 bg-yellow-50 border border-yellow-200 px-3 py-1.5 rounded-full">
							<span className="text-xs font-semibold text-yellow-700">{product.rating}/5</span>
						</div>
					</div>
				</div>
			</Link>
			<button
				onClick={handleAddToCart}
				className={`mx-5 mb-5 w-[calc(100%-2.5rem)] rounded-xl px-5 py-3.5 text-sm font-bold text-white shadow-lg ${
					isAdding
						? 'bg-green-600 scale-[0.98]'
						: 'bg-black'
				}`}
			>
				{isAdding ? 'Added!' : 'Add to Cart'}
			</button>
		</li>
	)
}
