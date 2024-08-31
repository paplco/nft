export const NETWORKS = {
	arbitrum: {
		name: 'Arbitrum One',
		rpcUrl: 'https://arb1.arbitrum.io/rpc',
		chainId: 42161,
		blockExplorerUrl: 'https://arbiscan.io',
		arb_token_contract_address: '0x912ce59144191c1204e64559fe8253a0e49e6548',
		nativeCurrency: {
			name: 'Ethereum',
			symbol: 'ETH',
			decimals: 18,
		},
	},
	sepolia: {
		name: 'Arbitrum Sepolia Mainnet',
		rpcUrl: 'https://sepolia-rollup.arbitrum.io/rpc',
		chainId: 421614,
		blockExplorerUrl: 'https://sepolia.arbiscan.io',
		arb_token_contract_address: '0x7Cc1d0980c8D0e248e4F94cf3714F890Dc4F084c',
		nativeCurrency: {
			name: 'Ethereum',
			symbol: 'ETH',
			decimals: 18,
		},
	},
};

export const currentNetwork = NETWORKS.arbitrum;
