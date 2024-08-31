import { forbiddenResponse, serverErrorResponse, successResponse } from '../../lib/response';
import { cleanLog } from '../../lib/utils';
import { UseApiRequestFunction } from '../../types/global';
import { executeAirdrop } from './includes/executeAirdrop';
import { getValidAirdropByCode } from './includes/getValidAirdropByCode';
import { currentNetwork } from './includes/networkConfig';
import { updateAirdropStatus } from './includes/updateAirdropStatus';
import { upsertAirdropByCode } from './includes/upsertAirdropByCode';

const routeHandler: UseApiRequestFunction = async (request, params) => {
	try {
		const { recipient, code, email }: any = await request.json();
		console.log(`params`, { recipient, code, email });
		let airdrop = await getValidAirdropByCode({ code });
		if (airdrop) {
			airdrop = await upsertAirdropByCode({ code, address: recipient, email });
			cleanLog(`airdrop upsertAirdropByCode result`, { airdrop }, true);
			if (airdrop && airdrop.tx === null) {
				const receipt = await executeAirdrop({ airdrop, recipient, amount: airdrop.amount, code });
				if (receipt?.hash && receipt?.status === 1) {
					await updateAirdropStatus({ airdrop, receipt });
					return successResponse({
						receipt,
						message: 'Airdrop successful! 🪂',
						blockExplorerUrl: currentNetwork.blockExplorerUrl,
						tx: receipt.hash,
					});
				} else {
					return forbiddenResponse('Airdrop failed. Please try again.');
				}
			}
		} else {
			return forbiddenResponse('Access code is not valid.');
		}
	} catch (error: any) {
		return serverErrorResponse(`Airdrop failed: ${error.message}`);
	}
};

export default routeHandler;
