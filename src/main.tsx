import React from 'react'
import ReactDOM from 'react-dom/client'
import './style.css'
import { App } from './App'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './contexts/CartContext'

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
	<React.StrictMode>
		<BrowserRouter>
			<CartProvider>
				<App />
			</CartProvider>
		</BrowserRouter>
	</React.StrictMode>
)
