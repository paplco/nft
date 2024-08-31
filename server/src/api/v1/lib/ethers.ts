import { ethers } from 'ethers';
import { Env } from '../types';

export default {
	async fetch(request: Request, env: Env) {
		// Connect to the Ethereum provider (e.g., your local Arbitrum node)
		const provider = new ethers.providers.JsonRpcProvider(env.ETH_PROVIDER);

		// Create a wallet instance
		const wallet = new ethers.Wallet(env.PRIVATE_KEY, provider);

		// Define the IPFS hash and data hash
		const ipfsHash = 'QmXk...';
		const dataHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes('Your data here'));

		// Define the smart contract ABI and address
		const abi = ['function storeData(string ipfsHash, string dataHash) public'];
		const contractAddress = '0xYourContractAddress';
		const contract = new ethers.Contract(contractAddress, abi, wallet);

		// Prepare and send the transaction
		try {
			const tx = await contract.storeData(ipfsHash, dataHash);
			const receipt = await tx.wait();

			// Example: Fetch data from the database (like the original template)
			const stmt = env.DATABASE.prepare('SELECT * FROM comments LIMIT 3');
			const { results } = await stmt.all();

			// Respond with the transaction result and the database results
			return new Response(renderHtml(JSON.stringify({ transactionHash: receipt.transactionHash, results }, null, 2)), {
				headers: {
					'content-type': 'text/html',
				},
			});
		} catch (error) {
			return new Response(`Transaction failed: ${error.message}`, { status: 500 });
		}
	},
};

// Helper function to render HTML
function renderHtml(content: string) {
	return `
    <!DOCTYPE html>
    <html lang="en">
    <head><title>Transaction Result</title></head>
    <body><pre>${content}</pre></body>
    </html>
  `;
}
