import { ethers, JsonRpcProvider, TransactionReceipt, TransactionRequest, Wallet } from 'ethers';
import { currentNetwork } from './networkConfig';
import { VARS } from '@/api/v1/lib/VARS';

export const sendTransaction = async ({ to, amount }: { to: string; amount: string }): Promise<TransactionReceipt | null> => {
	const provider = new JsonRpcProvider(currentNetwork.rpcUrl);
	const wallet = new Wallet(VARS.PRIVATE_KEY as string, provider);

	const transaction: TransactionRequest = {
		to,
		value: ethers.toBigInt(amount),
		// gasLimit: 300000,
		gasPrice: ethers.toBigInt('100000000'), // 100 Gwei
	};

	const estimatedGasLimit = await provider.estimateGas(transaction);
	transaction.gasLimit = estimatedGasLimit;

	console.log(`transaction`, transaction);
	try {
		const txResponse = await wallet.sendTransaction(transaction);
		console.log('Transaction sent:', txResponse.hash);

		// Wait for the transaction to be mined
		const receipt = await txResponse.wait();
		console.log('Transaction mined:', receipt?.hash);

		return receipt;
	} catch (error) {
		console.error('Transaction failed:', error);
		return null;
	}
};
