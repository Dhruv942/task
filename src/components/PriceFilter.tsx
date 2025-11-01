import type { JSX } from 'react'

type Props = {
	minPrice: string
	maxPrice: string
	onChangeMin: (v: string) => void
	onChangeMax: (v: string) => void
}

export function PriceFilter({ minPrice, maxPrice, onChangeMin, onChangeMax }: Props): JSX.Element {
	return (
		<div className="rounded-lg border bg-white p-4 shadow-sm">
			<h2 className="mb-3 text-lg font-semibold">Price</h2>
			<div className="grid grid-cols-2 gap-3">
				<input
					type="number"
					value={minPrice}
					onChange={(e) => onChangeMin(e.target.value)}
					placeholder="Min"
					className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
				/>
				<input
					type="number"
					value={maxPrice}
					onChange={(e) => onChangeMax(e.target.value)}
					placeholder="Max"
					className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
				/>
			</div>
		</div>
	)
}
