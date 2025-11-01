export type Product = {
	id: string
	name: string
	category: 'Electronics' | 'Clothing' | 'Home' | string
	price: number
	rating: number
	imageUrl?: string
	description?: string
}

export type SortKey = 'name' | 'price' | 'rating'
export type SortOrder = 'asc' | 'desc'

// Raw API type from Fake Store API (simplified per docs)
export type ApiProduct = {
	id: number
	title: string
	price: number
	description: string
	category: string
	image: string
	rating?: { rate: number; count: number }
}
