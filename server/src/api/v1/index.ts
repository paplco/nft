// src/api/v1/index.ts

import { handleRequest } from './handler';
import { optionsResponse, serverErrorResponse } from './lib/response';
import { cleanLog } from './lib/utils';
import { Env, VARS } from './lib/VARS';
import { IttyRouterRequest } from './types/global';

export default {
	async fetch(request: IttyRouterRequest, env: Env, ctx: ExecutionContext): Promise<Response> {
		try {
			VARS.initialize(env);
			if (request.method == 'OPTIONS') return optionsResponse({ request });
			else {
				return await handleRequest({ request, env, ctx });
			}
		} catch (error: any) {
			console.error('ERROR AT ROUTE HANDLER', error);
			return serverErrorResponse(error);
		}
	},
};
