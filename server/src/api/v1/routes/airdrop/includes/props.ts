export const props = `
				uuid
				code
				amount
				address
				tx
				chain_id
				active
				email
`;

export interface AirDropResult {
	uuid: string;
	code: string;
	amount: number;
	address: string;
	tx: string;
	chain_id: string;
	active: boolean;
	email: string;
}
