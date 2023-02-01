import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect, useRef } from 'react'

export default function App({ Component, pageProps }: AppProps) {
	const someRef = useRef(null);
	useEffect(() => {
		return () => {
			console.log(someRef.current)
		}
	})
	return <Component {...pageProps} />
}
