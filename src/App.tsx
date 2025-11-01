import { useEffect, useMemo, useState, type JSX } from 'react'
import { Routes, Route } from 'react-router-dom'
import { fetchProducts } from './api'
import type { Product, SortKey, SortOrder } from './types'
import { ProductGrid } from './components/ProductGrid'
import { SAMPLE_PRODUCTS } from './data'
import { TopBar } from './components/TopBar'
import ProductDetail from './pages/ProductDetail'
import { CartButton } from './components/CartButton'

export function App(): JSX.Element {
	const [products, setProducts] = useState<Product[] | null>(null)
	const [loadError, setLoadError] = useState<string | null>(null)

	const [query, setQuery] = useState<string>('')
	const [debouncedQuery, setDebouncedQuery] = useState<string>('')
	const [selectedCategories, setSelectedCategories] = useState<Set<Product['category']>>(new Set())
	const [sortKey, setSortKey] = useState<SortKey>('name')
	const [sortOrder, setSortOrder] = useState<SortOrder>('asc')
	const [minPrice, setMinPrice] = useState<string>('')
	const [maxPrice, setMaxPrice] = useState<string>('')

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedQuery(query)
		}, 300)

		return () => {
			clearTimeout(timer)
		}
	}, [query])

	useEffect(() => {
		let cancelled = false
		;(async () => {
			try {
				const list = await fetchProducts(50)
				if (!cancelled) setProducts(list)
			} catch (err) {
				console.error(err)
				if (!cancelled) {
					setLoadError('Failed to load products. Showing sample data.')
					setProducts(SAMPLE_PRODUCTS)
				}
			}
		})()
		return () => {
			cancelled = true
		}
	}, [])

	const allProducts = products ?? []
	const categories = useMemo<Product['category'][]>(() => {
		const set = new Set<Product['category']>(allProducts.map((p) => p.category))
		return Array.from(set)
	}, [allProducts])

	const filteredProducts = useMemo(() => {
		const q = debouncedQuery.trim().toLowerCase()
		const min = minPrice ? Number(minPrice) : undefined
		const max = maxPrice ? Number(maxPrice) : undefined

		let result = allProducts.filter((p) => {
			if (q && !p.name.toLowerCase().includes(q)) return false
			if (selectedCategories.size > 0 && !selectedCategories.has(p.category)) return false
			if (typeof min === 'number' && !Number.isNaN(min) && p.price < min) return false
			if (typeof max === 'number' && !Number.isNaN(max) && p.price > max) return false
			return true
		})

		result.sort((a, b) => {
			const dir = sortOrder === 'asc' ? 1 : -1
			if (sortKey === 'name') return a.name.localeCompare(b.name) * dir
			if (sortKey === 'price') return (a.price - b.price) * dir
			return (a.rating - b.rating) * dir
		})

		return result
	}, [allProducts, debouncedQuery, selectedCategories, sortKey, sortOrder, minPrice, maxPrice])

	function toggleCategory(cat: Product['category']): void {
		setSelectedCategories((prev) => {
			const next = new Set(prev)
			if (next.has(cat)) next.delete(cat)
			else next.add(cat)
			return next
		})
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
			<header className="sticky top-0 z-10 border-b bg-white/95 backdrop-blur-md shadow-md">
				<div className="mx-auto max-w-7xl px-4 py-7">
					<div className="flex items-center justify-between mb-5">
						<div>
							<h1 className="text-4xl font-bold text-gray-900 mb-1 tracking-tight">Shop Now</h1>
							<p className="text-base text-gray-600 font-medium">Discover amazing products</p>
							{loadError && <p className="mt-2 text-xs text-amber-600 font-semibold">{loadError}</p>}
						</div>
						<CartButton />
					</div>
					<TopBar
						query={query}
						onChangeQuery={setQuery}
						sortKey={sortKey}
						sortOrder={sortOrder}
						onChangeKey={setSortKey}
						onChangeOrder={setSortOrder}
						categories={categories}
						selectedCategories={selectedCategories}
						onToggleCategory={toggleCategory}
						minPrice={minPrice}
						maxPrice={maxPrice}
						onChangeMinPrice={setMinPrice}
						onChangeMaxPrice={setMaxPrice}
					/>
				</div>
			</header>

			<Routes>
				<Route
					path="/"
					element={
						products === null ? (
							<div className="mx-auto max-w-7xl px-4 py-16 text-center">
								<div className="inline-block w-14 h-14 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-5"></div>
								<p className="text-xl text-gray-600 font-semibold">Loading products...</p>
							</div>
						) : (
							<main className="mx-auto max-w-7xl px-4 py-10">
								<ProductGrid products={filteredProducts} allCount={allProducts.length} />
							</main>
						)
					}
				/>
				<Route path="/product/:id" element={<ProductDetail />} />
			</Routes>
		</div>
	)
}
