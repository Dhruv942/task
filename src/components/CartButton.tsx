import { useState } from 'react'
import { useCart } from '../contexts/CartContext'
import type { JSX } from 'react'

export function CartButton(): JSX.Element {
	const { cart, getTotalItems, getTotalPrice } = useCart()
	const [isOpen, setIsOpen] = useState(false)

	const totalItems = getTotalItems()
	const totalPrice = getTotalPrice()

	return (
		<div className="relative">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="relative px-5 py-3 bg-blue-600 text-white rounded-xl flex items-center gap-2 font-bold shadow-lg"
			>
				<span>Cart</span>
				{totalItems > 0 && (
					<span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-7 h-7 flex items-center justify-center shadow-lg">
						{totalItems}
					</span>
				)}
			</button>

			{isOpen && (
				<>
					<div
						className="fixed inset-0 z-40 bg-black/20"
						onClick={() => setIsOpen(false)}
					/>
					<div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-2xl z-50 border border-gray-200 max-h-[80vh] overflow-hidden">
						<div className="p-4 border-b bg-blue-600 text-white">
							<h3 className="text-xl font-bold">Shopping Cart</h3>
							<p className="text-sm text-blue-100">{totalItems} {totalItems === 1 ? 'item' : 'items'}</p>
						</div>
						<div className="overflow-y-auto max-h-[60vh]">
							{cart.length === 0 ? (
								<div className="p-8 text-center text-gray-500">
				
									<p>Your cart is empty</p>
								</div>
							) : (
								<div className="p-4 space-y-3">
									{cart.map((item) => (
										<div key={item.product.id} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
											{item.product.imageUrl && (
												<img
													src={item.product.imageUrl}
													alt={item.product.name}
													className="w-16 h-16 object-cover rounded"
													loading="lazy"
												/>
											)}
											<div className="flex-1 min-w-0">
												<h4 className="font-semibold text-sm truncate">{item.product.name}</h4>
												<p className="text-sm text-gray-600">₹{item.product.price} × {item.quantity}</p>
												<p className="font-bold text-blue-600">₹{(item.product.price * item.quantity).toLocaleString()}</p>
											</div>
										</div>
									))}
								</div>
							)}
						</div>
						{cart.length > 0 && (
							<div className="p-4 border-t bg-gray-50">
								<div className="flex justify-between items-center mb-3">
									<span className="text-lg font-bold">Total:</span>
									<span className="text-2xl font-bold text-blue-600">₹{totalPrice.toLocaleString()}</span>
								</div>
								<button className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold">
									Checkout
								</button>
							</div>
						)}
					</div>
				</>
			)}
		</div>
	)
}

