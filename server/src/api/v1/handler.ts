import { getGeneralHeaders, notFoundResponse, serverErrorResponse } from './lib/response';
import { FetchParams } from './types/global';
import { OpenAPIRouter } from '@cloudflare/itty-router-openapi';

import airdrop from './routes/airdrop/airdrop';
import codegen from './routes/codegen/codegen';

const router = OpenAPIRouter({
	base: '/api/v1',
});

router
	.post('/airdrop', airdrop)
	.get('/codegen', codegen)
	.all('/favicon.ico') //empty response
	.all('*', () => {
		return notFoundResponse();
	});

export const handleRequest = async ({ request, env, ctx }: FetchParams): Promise<Response> => {
	const url = new URL(request.url);
	const pathname = url.pathname;

	if (!pathname.startsWith('/api/v1')) {
		return notFoundResponse();
	}

	console.log(`\n\n==== handleRequest [ ${request.url} ]\n`);
	const locale = request.headers.get('content-language');

	try {
		return await router.handle(request, { env, ctx, locale });
	} catch (error: any) {
		console.error(`Error in handleRequest: `, error);
		return serverErrorResponse(error?.message || 'Error in handleRequest');
	}
};
