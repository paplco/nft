import { IttyRouterRequest } from '../types/global';
import { cleanLog, beautifyBody } from './utils';
import { VARS } from './VARS';

export interface ApiResponse {
	code: number;
	data?: any;
	success: boolean;
	error?: string;
	version: string;
}

export interface createResponse {
	code: number;
	data?: any;
	success?: boolean;
	error?: string;
	headers?: any;
}

export const createResponse = ({ code, data, error, headers }: createResponse): Response => {
	// return new Response(`Transfer successful:`, { status: 200, headers: getGeneralHeaders() });
	const response: ApiResponse = {
		code,
		data: data || null,
		success: code === 200,
		version: VARS.API_VERSION,
	};

	if (error) {
		response.error = error;
		console.error(`RESPONSE ERROR`, { error });
	}

	return new Response(data || error ? JSON.stringify(response) : null, {
		headers: getGeneralHeaders(), //headers || { 'Content-Type': 'application/json' },
		status: code,
	});
};

export const getGeneralHeaders = (request?: IttyRouterRequest) => {
	const headers = new Headers();
	headers.set('Access-Control-Allow-Origin', '*');
	headers.set('Access-Control-Allow-Content-Type', '*');
	headers.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE');
	headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	headers.set('Access-Control-Allow-Credentials', 'true');
	return headers;
};

export const successResponse = (data: any) => createResponse({ code: 200, data });
export const forbiddenResponse = (error: string) => createResponse({ code: 403, data: null, error });
export const notFoundResponse = () => createResponse({ code: 404, data: null, error: 'Not Found' });
export const serverErrorResponse = (error: string) => createResponse({ code: 500, data: null, error });
export const optionsResponse = (request: any) => createResponse({ code: 204, data: null, headers: getGeneralHeaders(request) });

export const makeQueryBody = (query: string, variables = {}) => {
	let body = JSON.stringify({
		query,
		variables,
	});
	return body;
};

export type hasuraResponse = {
	data?: any;
	errors?: any;
	status?: number;
	headers?: any;
	returning?: any;
	query?: string;
} | null;

export type hasuraFetchAsAdminFunction = ({ body, trace }: { body: string; trace?: boolean }) => Promise<hasuraResponse>;

export const hasuraFetchAsAdmin: hasuraFetchAsAdminFunction = async ({ body, trace }: any): Promise<hasuraResponse> => {
	const request: IttyRouterRequest = new Request('', {});
	let headers: Headers = getGeneralHeaders(request);
	headers = addAdminHeader(headers);

	const gqlResponse = await fetch(VARS.HASURA_ENDPOINT, {
		method: 'POST',
		headers,
		body,
	});

	let res: any;
	try {
		res = await gqlResponse.json();
	} catch (error: any) {
		console.error(``, error);
	}

	if (trace === true) {
		cleanLog(`\n====\nhasuraFetchAsAdmin\n`, { body: beautifyBody(body), res }, true);
	}

	if (!res?.data && !res?.errors) {
		return null;
	}
	return res;
};

export const addAdminHeader = (headers: Headers): Headers => {
	headers.set('x-hasura-admin-secret', VARS.HASURA_ADMIN_SECRET);
	return headers;
};
