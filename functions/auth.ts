import { handleAuthRequest } from "@levino/pocketbase-auth";

interface Env {
	ASSETS: Fetcher;
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const authResponse = await handleAuthRequest(request, {
			pocketbaseUrl: "https://api.levinkeller.de",
			groupField: "example",
		});
		if (authResponse) {
			return authResponse;
		}

		return env.ASSETS.fetch(request);
	},
};
