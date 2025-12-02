import { handleAuthRequest } from '@levino/pocketbase-auth'

export const onRequest = async (context) => {
	const { request, env, next } = context

	// Debug: Check if middleware is running
	const url = new URL(request.url)
	if (url.pathname === '/_debug') {
		return new Response(
			JSON.stringify({
				middleware: 'running',
				hasPocketbaseUrl: !!env.POCKETBASE_URL,
				hasPocketbaseGroup: !!env.POCKETBASE_GROUP,
			}),
			{ headers: { 'Content-Type': 'application/json' } },
		)
	}

	const options = {
		pocketbaseUrl: env.POCKETBASE_URL,
		pocketbaseUrlMicrosoft: env.POCKETBASE_URL_MICROSOFT,
		groupField: env.POCKETBASE_GROUP,
	}
	const authResponse = await handleAuthRequest(request, options)
	if (authResponse) {
		return authResponse
	}
	return next()
}
