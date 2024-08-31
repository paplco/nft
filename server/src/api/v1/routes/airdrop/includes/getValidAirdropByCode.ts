import { hasuraFetchAsAdmin, makeQueryBody } from '@/api/v1/lib/response';
import { beautifyBody, cleanLog } from '@/api/v1/lib/utils';
import { AirDropResult, props } from './props';

export const getValidAirdropByCode = async ({ code }: any): Promise<null | AirDropResult> => {
	let body = makeQueryBody(query, { code });
	const res = await hasuraFetchAsAdmin({ body });
	cleanLog(`getValidAirdropByCode`, { res, body: beautifyBody(body) }, true);
	return res?.data?.airdrops?.[0] || null;
};

const query = `
	query getValidAirdropByCode($code: String!) {
		airdrops(limit: 1, where: { code: { _eq: $code }, active: { _eq: true } }) {
			${props}
		}
	}
`;
