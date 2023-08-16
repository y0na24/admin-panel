import { useState, useCallback } from 'react'

type HttpRequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE'

interface HttpHeaders {
	[key: string]: string
}

interface RequestConfig {
	url: string
	method?: HttpRequestMethod
	body?: string | null | FormData
	headers?: HttpHeaders
}

export const useHttp = () => {
	const [loadingStatus, setLoadingStatus] = useState<string>('idle')

	const request = useCallback(
		async ({
			url,
			method = 'GET',
			body = null,
			headers = { 'Content-type': 'application/json' },
		}: RequestConfig) => {
			setLoadingStatus('loading')

			try {
				const response = await fetch(url, { method, body, headers })

				if (!response.ok) {
					throw new Error(`Could not fetch ${url}, status: ${response.status}`)
				}

				const data = await response.json()

				setLoadingStatus('idle')
				return data
			} catch (err) {
				setLoadingStatus('error')
				throw err
			}
		},
		[]
	)

	return { loadingStatus, request }
}
