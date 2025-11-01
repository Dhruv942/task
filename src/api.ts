import type { ApiProduct, Product } from './types'

const BASE_URL = 'https://fakestoreapi.com'

export async function fetchProducts(limit?: number): Promise<Product[]> {
	const url = new URL(`${BASE_URL}/products`)
	if (typeof limit === 'number') url.searchParams.set('limit', String(limit))
	const res = await fetch(url)
	if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`)
	const data = (await res.json()) as ApiProduct[]
	return data.map(mapApiToProduct)
}

export async function fetchProductById(id: number): Promise<Product> {
	const res = await fetch(`${BASE_URL}/products/${id}`)
	if (!res.ok) throw new Error(`Failed to fetch product ${id}: ${res.status}`)
	const data = (await res.json()) as ApiProduct
	return mapApiToProduct(data)
}

export function mapApiToProduct(api: ApiProduct): Product {
	return {
		id: String(api.id),
		name: api.title,
		category: api.category,
		price: api.price,
		rating: api.rating?.rate ?? 4,
		imageUrl: api.image,
		description: api.description,
	}
}
