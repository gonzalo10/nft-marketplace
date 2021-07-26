const axios = require('axios')

describe('NFTMarket', function () {
	it('Should interact with the token contract', async function () {
		const Market = await ethers.getContractFactory('NFTMarket')
		const market = await Market.deploy()
		await market.deployed()
		const marketAddress = market.address

		const NFT = await ethers.getContractFactory('NFT')
		const nft = await NFT.deploy(marketAddress)
		await nft.deployed()
		const nftContractAddress = nft.address

		await nft.createToken('a')
		await nft.createToken('b')
		await nft.createToken('c')

		let listingPrice = await market.getListingPrice()
		listingPrice = listingPrice.toString()
		const valueSend = { value: listingPrice }

		await market.createMarketItem(nftContractAddress, 1, 1000, valueSend)
		await market.createMarketItem(nftContractAddress, 2, 1000, valueSend)
		await market.createMarketItem(nftContractAddress, 3, 1000, valueSend)

		const [_, userAddress, userAddress2] = await ethers.getSigners()

		await market
			.connect(userAddress)
			.createMarketSale(nftContractAddress, 1, { value: 1000 })
		await market
			.connect(userAddress2)
			.createMarketSale(nftContractAddress, 2, { value: 1000 })

		items = await market.fetchMarketItems()
		items = await Promise.all(
			items.map(async (i) => {
				const tokenUri = await nft.tokenURI(i.tokenId)
				let item = {
					price: i.price.toNumber(),
					tokenId: i.tokenId.toNumber(),
					seller: i.seller,
					owner: i.owner,
					tokenUri
				}
				return item
			})
		)
		console.log('items: ', items)

		const myNfts = await market.connect(userAddress2).fetchMyNFTs()
		console.log('myNfts:', myNfts)
	})
})
