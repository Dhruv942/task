import React, { createContext, useContext, useState, type ReactNode } from 'react'
import type { Product } from '../types'

type CartItem = {
	product: Product
	quantity: number
}

type CartContextType = {
	cart: CartItem[]
	addToCart: (product: Product) => void
	removeFromCart: (productId: string) => void
	updateQuantity: (productId: string, quantity: number) => void
	getTotalItems: () => number
	getTotalPrice: () => number
	clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }): JSX.Element {
	const [cart, setCart] = useState<CartItem[]>([])

	const addToCart = (product: Product): void => {
		setCart((prev) => {
			const existing = prev.find((item) => item.product.id === product.id)
			if (existing) {
				return prev.map((item) =>
					item.product.id === product.id
						? { ...item, quantity: item.quantity + 1 }
						: item
				)
			}
			return [...prev, { product, quantity: 1 }]
		})
	}

	const removeFromCart = (productId: string): void => {
		setCart((prev) => prev.filter((item) => item.product.id !== productId))
	}

	const updateQuantity = (productId: string, quantity: number): void => {
		if (quantity <= 0) {
			removeFromCart(productId)
			return
		}
		setCart((prev) =>
			prev.map((item) =>
				item.product.id === productId ? { ...item, quantity } : item
			)
		)
	}

	const getTotalItems = (): number => {
		return cart.reduce((sum, item) => sum + item.quantity, 0)
	}

	const getTotalPrice = (): number => {
		return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
	}

	const clearCart = (): void => {
		setCart([])
	}

	return (
		<CartContext.Provider
			value={{
				cart,
				addToCart,
				removeFromCart,
				updateQuantity,
				getTotalItems,
				getTotalPrice,
				clearCart,
			}}
		>
			{children}
		</CartContext.Provider>
	)
}

export function useCart(): CartContextType {
	const context = useContext(CartContext)
	if (!context) {
		throw new Error('useCart must be used within a CartProvider')
	}
	return context
}

