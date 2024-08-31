import { cleanLog } from '@/api/v1/lib/utils';
import { VARS } from '@/api/v1/lib/VARS';
import { BigNumberish, Contract, JsonRpcProvider, parseUnits, TransactionReceipt, Wallet } from 'ethers';
import { currentNetwork } from './networkConfig';
import { ethers } from 'ethers';

export const executeAirdrop = async ({ airdrop, recipient, amount, code }: any): Promise<TransactionReceipt | null> => {
	try {
		const { uuid, address, chain_id, code, amount } = airdrop;

		// return await sendTransaction({ to: recipient, amount });
		// return await tokenContractTransfer({ to: recipient, amount });

		return await sendARBTokens(recipient, '5');
	} catch (error: any) {
		console.log(`error`, error);
		return null;
	}
};

export const tokenContractTransfer = async ({ to, amount }: { to: string; amount: string }): Promise<TransactionReceipt | null> => {
	try {
		const provider = new JsonRpcProvider(currentNetwork.rpcUrl);
		const wallet = new Wallet(VARS.PRIVATE_KEY as string, provider);

		// ARB token contract instance
		const tokenContract = new Contract(
			currentNetwork.arb_token_contract_address,
			['function transfer(address to, uint256 amount) public returns (bool)'],
			wallet,
		);

		// Transfer ARB tokens
		const valueToSend: BigNumberish = parseUnits(amount.toString(), 18); // Converts to wei equivalent

		// Now use the BigNumber directly in the transfer
		const tx = await tokenContract.transfer(to, valueToSend);

		cleanLog(`tokenContract transfer:`, { tx }, true);

		return tx;
	} catch (error: any) {
		console.log(`error`, error);
		return null;
	}
};

// Define the contract address and ABI
const ABI = [
	// ERC-20 ABI with just the transfer function
	'function transfer(address to, uint256 amount) public returns (bool)',
];

const sendARBTokens = async (to: string, amount: string) => {
	try {
		const provider = new JsonRpcProvider(currentNetwork.rpcUrl);
		const wallet = new Wallet(VARS.PRIVATE_KEY as string, provider);
		const tokenContract = new ethers.Contract(currentNetwork.arb_token_contract_address, ABI, wallet);

		// Convert the amount to the smallest unit (wei)
		const valueToSend = ethers.parseUnits(amount, 18); // ARB has 18 decimal places

		// Send the tokens
		const tx = await tokenContract.transfer(to, valueToSend);

		// Wait for the transaction to be mined
		const receipt = await tx.wait();
		console.log('Transaction mined:', receipt.transactionHash);

		return receipt;
	} catch (error) {
		console.error('Error sending ARB tokens:', error);
	}
	return null;
};
