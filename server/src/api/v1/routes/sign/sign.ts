import { ethers } from 'ethers';
import { Env } from '../../lib/VARS';

export default {
	async fetch(request: Request, env: Env) {
		// Initialize the wallet with a private key
		const privateKey = '0xYourPrivateKey'; // Replace with your actual private key
		const wallet = new ethers.Wallet(privateKey);

		const message = 'This is a message to be signed';

		// Sign the message
		const signedMessage = await wallet.signMessage(message);

		// Return the signed message
		return new Response(JSON.stringify(signedMessage), {
			headers: {
				'content-type': 'application/json',
			},
		});
	},
};
