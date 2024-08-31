import { hasuraFetchAsAdmin, makeQueryBody } from '@/api/v1/lib/response';
import { beautifyBody, cleanLog } from '@/api/v1/lib/utils';
import { AirDropResult, props } from './props';
import { TransactionReceipt, toNumber } from 'ethers';

export const updateAirdropStatus = async ({
	airdrop,
	receipt,
}: {
	airdrop: AirDropResult;
	receipt: TransactionReceipt;
}): Promise<null | AirDropResult> => {
	let body = makeQueryBody(query, {
		code: airdrop.code,
		tx: receipt.hash,
	});
	const res = await hasuraFetchAsAdmin({ body });
	cleanLog(
		`updateAirdropStatus`,
		{
			res,
			variables: {
				code: airdrop.code,
				tx: receipt.hash,
			},
			body: beautifyBody(body),
		},
		true,
	);
	return res?.data?.affected_rows === 1 ? res.data.returning[0] : null;
};

const query = `
	mutation updateAirdropStatus($code: String!, $tx: String!) {
		update_airdrops(
			where: { code: { _eq: $code } }
			_set: {tx: $tx }
		) {
			affected_rows
			returning {
				${props}
			}
		}
	}
`;
