export interface Env {
	API_VERSION: string;
	RPC_URL: string;
	PRIVATE_KEY: string;
	ARB_TOKEN_CONTRACT_ADDRESS: string;
	HASURA_ENDPOINT: string;
	HASURA_ADMIN_SECRET: string;
	HASURA_GRAPHQL_JWT_SECRET: string;
	SENDGRID_API_KEY: string;
	EKONAVI_API_KEY: string;
	MAILCHIMP_MAIN_LIST_ID: string;
	MAILCHIMP_AUTH_TOKEN: string;
	MAILCHIMP_SERVER: string;
	SENDER_NET_API_TOKEN: string;
	CF_IMAGES_UPLOAD_URL: string;
	CF_IMAGES_TOKEN: string;
	ENVIRONMENT: string;
	ISR_REVALIDATE_TOKEN: string;
	APP_HOST_URL: string;
	API_HOST_URL: string;
	LOGGING_ON: boolean;
	CORS_HEADERS: any;
	KV_NAMESPACE_PROD: KVNamespace;
	KV_NAMESPACE_STAGING: KVNamespace;
	KV_NAMESPACE_DEV: KVNamespace;
	[key: string]: string | boolean | Object;
}

export class VARS {
	public static API_VERSION: string;
	public static RPC_URL: string;
	public static PRIVATE_KEY: string;
	public static ARB_TOKEN_CONTRACT_ADDRESS: string;
	public static HASURA_ENDPOINT: string;
	public static HASURA_ADMIN_SECRET: string;
	public static HASURA_GRAPHQL_JWT_SECRET: string;
	public static SENDGRID_API_KEY: string;
	public static EKONAVI_API_KEY: string;
	public static MAILCHIMP_MAIN_LIST_ID: string;
	public static MAILCHIMP_AUTH_TOKEN: string;
	public static MAILCHIMP_SERVER: string;
	public static SENDER_NET_API_TOKEN: string;
	public static CF_IMAGES_UPLOAD_URL: string;
	public static CF_IMAGES_TOKEN: string;
	public static ENVIRONMENT: string;
	public static ISR_REVALIDATE_TOKEN: string;
	public static APP_HOST_URL: string;
	public static API_HOST_URL: string;
	public static LOGGING_ON: boolean;
	public static CORS_HEADERS: any;
	public static KV_NAMESPACE_PROD: KVNamespace;
	public static KV_NAMESPACE_STAGING: KVNamespace;
	public static KV_NAMESPACE_DEV: KVNamespace;

	private static isInitialized = false;

	private constructor() {} // private to prevent instantiation

	static initialize(env: Env) {
		if (this.isInitialized) {
			console.warn('VARS already initialized.');
			return;
		}

		// Assign each key in the environment variables to the VARS static properties
		for (const key in env) {
			if (Object.prototype.hasOwnProperty.call(env, key) && key in this) {
				(this as any)[key] = env[key];
			}
		}

		this.isInitialized = true;
	}
}

const LOCAL_VARS: Partial<Env> = {
	CORS_HEADERS: {
		'content-type': 'application/json',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
		'Access-Control-Max-Age': '86400',
	},
};

export const NOTIFICATIONS_BATCH_SIZE = 10;
export const NOTIFICATIONS_MARK_JOB_COMPLETED = true;
export const NOTIFICATIONS_MARK_SENT = true;
export const NOTIFICATIONS_SEND_ONLY_TO_DEV = false;
export const BCC_TO_DEV = true;
export const SENDGRID_ON = true;
