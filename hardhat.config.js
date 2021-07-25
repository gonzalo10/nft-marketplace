require('@nomiclabs/hardhat-waffle')
require('dotenv').config()

console.log(process.env.PRIVATE_KEY)
module.exports = {
	defaultNetwork: 'hardhat',
	networks: {
		localhost: {
			url: 'http://localhost:8545'
			/*
        notice no mnemonic here? it will just use account 0 of the hardhat node to deploy
        (you can put in a mnemonic here to set the deployer locally)
      */
		},
		hardhat: {
			chainId: 1337
		},
		mumbai: {
			url: 'https://rpc-mumbai.matic.today',
			accounts: [process.env.PRIVATE_KEY]
		},
		matic: {
			url: 'https://rpc-mainnet.maticvigil.com',
			accounts: [process.env.PRIVATE_KEY]
		}
	},
	solidity: {
		version: '0.8.4',
		settings: {
			optimizer: {
				enabled: true,
				runs: 200
			}
		}
	}
}
