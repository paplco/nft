import { makeQueryBody, hasuraFetchAsAdmin } from '../../../lib/response';
import { cleanLog, beautifyBody } from '../../../lib/utils';
import { AirDropResult, props } from './props';

export const upsertAirdropByCode = async ({ code, address, email }: any): Promise<null | AirDropResult> => {
	let body = makeQueryBody(query, { code, address, email });
	const res = await hasuraFetchAsAdmin({ body });
	cleanLog(`upsertAirdropByCode`, { res, body: beautifyBody(body) }, true);

	return res?.data?.insert_airdrops_one || null;
};

const query = `
mutation upsertAirdrop($code: String!, $address: String!, $email: String!) {
  insert_airdrops_one(
    object: {
      code: $code,
      address: $address,
      email: $email,
      active: false
    },
    on_conflict: {
      constraint: airdrops_code_key,
      update_columns: [active, address, email]
    }
  ) {
    ${props}
  }
}

`;
