import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchProductById } from '../api'
import type { Product } from '../types'
import type { JSX } from 'react/jsx-runtime'
import { useCart } from '../contexts/CartContext'

export default function ProductDetail(): JSX.Element {
	const { id } = useParams<{ id: string }>()
	const [product, setProduct] = useState<Product | null>(null)
	const [error, setError] = useState<string | null>(null)
	const { addToCart } = useCart()
	const [isAdding, setIsAdding] = useState(false)

	useEffect(() => {
		let cancelled = false
		;(async () => {
			try {
				if (!id) return
				const p = await fetchProductById(Number(id))
				if (!cancelled) setProduct(p)
			} catch (e) {
				if (!cancelled) setError('Failed to load product')
			}
		})()
		return () => {
			cancelled = true
		}
	}, [id])

	if (error) {
		return (
			<div className="mx-auto max-w-4xl px-4 py-8">
				<p className="text-sm text-red-600">{error}</p>
				<Link to="/" className="mt-4 inline-block rounded-md border px-3 py-2">Back</Link>
			</div>
		)
	}

	if (!product) {
		return <div className="mx-auto max-w-4xl px-4 py-8">Loading...</div>
	}

	return (
		<div className="mx-auto max-w-4xl px-4 py-8">
			<Link to="/" className="inline-block text-blue-600"> Back to products</Link>
			<div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
				<div className="border rounded-md overflow-hidden bg-white">
					{product.imageUrl && (
						<img src={product.imageUrl} alt={product.name} className="w-full h-full object-contain p-6" loading="lazy" />
					)}
				</div>
				<div>
					<h1 className="text-2xl font-bold">{product.name}</h1>
					<p className="mt-2 text-gray-700">{product.description}</p>
					<div className="mt-4 flex items-center gap-4">
						<span className="text-xl font-bold text-blue-600">₹{product.price.toLocaleString()}</span>
						<span className="text-sm text-amber-600">Rating: {product.rating}</span>
						<span className="text-sm text-gray-600">{product.category}</span>
					</div>
					<button
						onClick={() => {
							if (product) {
								setIsAdding(true)
								addToCart(product)
								setTimeout(() => setIsAdding(false), 300)
							}
						}}
						className={`mt-6 rounded-lg px-6 py-3 font-semibold ${
							isAdding
								? 'bg-green-600 text-white'
								: 'bg-black text-white'
						}`}
					>
						{isAdding ? 'Added to Cart!' : 'Add to Cart'}
					</button>
				</div>
			</div>
		</div>
	)
}
