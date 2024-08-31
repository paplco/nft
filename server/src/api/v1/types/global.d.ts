// import { Request as IttyRouterRequest } from "itty-router"

import { Env } from '../lib/VARS';

export type REC = Record<string, any>;

export type UseApiResponseParams = {
	data?: any;
	success?: boolean;
	error?: string;
	v?: string;
	msg?: string | string[];
	query?: string;
};

export interface FetchParams {
	request: IttyRouterRequest;
	env: Env;
	ctx: ExecutionContext;
}

interface IttyRouterRequest extends Request {
	params?: {
		[key: string]: string;
	};
	query?: any;
}

export type UseApiRequestFunction = (request: IttyRouterRequest, params: UseApiRequestParams) => Promise<any>;

export type QueryPostConfig = {
	insert?: string;
	update?: string;
	upsert?: string;
};

export type QueryGetConfig = {
	query?: string;
	count?: string;
	count_by_date_split?: string;
};

export type UseApiRequestParams = {
	ctx: ExecutionContext;
	env: Env;
	locale?: string;
};
