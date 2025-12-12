import { handleAuthRequest } from "@levino/pocketbase-auth";

export interface Env {
	POCKETBASE_URL: string;
	POCKETBASE_URL_MICROSOFT?: string;
	POCKETBASE_GROUP?: string;
	ASSETS: Fetcher;
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const options = {
			pocketbaseUrl: env.POCKETBASE_URL,
			pocketbaseUrlMicrosoft: env.POCKETBASE_URL_MICROSOFT,
			groupField: env.POCKETBASE_GROUP,
		};

		const authResponse = await handleAuthRequest(request, options);
		if (authResponse) {
			return authResponse;
		}

		// Serve static assets
		return env.ASSETS.fetch(request);
	},
};
