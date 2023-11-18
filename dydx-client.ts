import { IndexerClient, Network } from "@dydxprotocol/v4-client-js";
 
const client = new IndexerClient(Network.testnet().indexerConfig);

// using address on dYdX chain corresponding to EVM account
const ADDRESS = 'dydx1zmgqyp9qsadnau9pmcw95x98k6wflhtckxpqfz';

async function listPerpMarkets() {
    const markets = await client.markets.getPerpetualMarkets();
    console.log('list markets: ', markets);
}

async function getPerpMarkets(ticker: string) {
    const markets = await client.markets.getPerpetualMarkets(ticker);
    console.log('market info: ', markets);
}

async function listSparklines() {
    const response = await client.markets.getPerpetualMarketSparklines();
    console.log('Sparklines: ', response);
}

async function getOrderBook(ticker: string) {
    // ticker is the market ticket, such as "BTC-USD"
    const response = await client.markets.getPerpetualMarketOrderbook(ticker);
    const asks = response.asks;
    const bids = response.bids;
    console.log(`latest ask\n Price: $${asks[0].price} - Size: ${asks[0].size}\nlatest bid\n Price: $${bids[0].price} - Size: ${bids[0].size}`);
}

async function getTrades(ticker: string) {
    // ticker is the market ticket, such as "BTC-USD"
    const response = await client.markets.getPerpetualMarketTrades(ticker);
    const trades = response.trades;
    const sampleTrade = trades[0];
    console.log('Sample Trade info');
    console.log(`
        Id: ${sampleTrade.id}\n
        Side: ${sampleTrade.side}\n
        Size: ${sampleTrade.size}\n
        Price: ${sampleTrade.price}\n
        Created at: ${sampleTrade.createdAt}\n
        Created at height: ${sampleTrade.createdAtHeight}    
    `);
}

async function getCandles(ticker: string, resolution: string) {
    // ticker is the market ticket, such as "BTC-USD", resolution is the resolution of the candles, such as "1MIN"
    const response = await client.markets.getPerpetualMarketCandles(ticker, resolution);
    const candles = response.candles;
    const sampleCandle = candles[0];
    console.log(`sampleCandle info:\n`);
    for (let key of Object.keys(sampleCandle)) {
        console.log(`${key}: ${sampleCandle[key]}`);
    }
}

async function getAddressSubaccounts(address: string) {
    // address is the wallet address on dYdX chain
    const response = await client.account.getSubaccounts(address);
    const subaccounts = response.subaccounts;
}

async function getSubaccounts(address: string) {
    // address is the wallet address on dYdX chain
    const response = await client.account.getSubaccounts(address);
    const subaccounts = response.subaccounts;
    for (let subaccount of subaccounts) {
        console.log('=======================================');
        for (let key of Object.keys(subaccount)) {
            console.log(`${key}: ${subaccount[key]}`);
        }
        console.log('=======================================');
    }
}

async function getAssets(address: string, subaccountNumber: number) {
    // address is the wallet address on dYdX chain, subaccountNumber is the subaccount number
    const response = await client.account.getSubaccountAssetPositions(address, subaccountNumber);
    const positions = response.positions;
    for (let position of positions) {
        console.log('=======================================');
        console.log(`Position info:`);
        for (let key of Object.keys(position)) {
            console.log(`${key}: ${position[key]}`);
        }
        console.log('=======================================');
    }
}

async function getPerpPositions(address: string, subaccountNumber: number) {
    // address is the wallet address on dYdX chain, subaccountNumber is the subaccount number
    const response = await client.account.getSubaccountPerpetualPositions(address, subaccountNumber);
    const positions = response.positions;
    for (let position of positions) {
        console.log('=======================================');
        console.log(`Position info:`);
        for (let key of Object.keys(position)) {
            console.log(`${key}: ${position[key]}`);
        }
        console.log('=======================================');
    }
}

async function getPnL(address: string, subaccountNumber: number) {
    // address is the wallet address on dYdX chain, subaccountNumber is the subaccount number
    const response = await client.account.getSubaccountHistoricalPNLs(address, subaccountNumber);
    const historicalPnl = response.historicalPnl;
    for (let history of historicalPnl) {
        console.log('=======================================');
        console.log(`PnL history info:`);
        for (let key of Object.keys(history)) {
            console.log(`${key}: ${history[key]}`);
        }
        console.log('=======================================');
    }
}

async function main() {
    // list all perp markets
    // await listPerpMarkets();

    // get specific market info using market's ticker e.g. BTC-USD
    // await getPerpMarkets("BTC-USD");

    // list sparklines
    // await listSparklines();

    // get orderbook info
    // await getOrderBook("BTC-USD");

    // get trades
    // await getTrades('ETH-USD');

    // get candles
    // await getCandles('ETH-USD', '1MIN');

    // get list subaccounts of a specific address on dYdX chain
    // await getSubaccounts(ADDRESS);

    // get assets positions by specific subaccount number
    // await getAssets(ADDRESS, 0);

    // get list perp positions by specific subaccount number
    // await getPerpPositions(ADDRESS, 0);

    // get PnL history
    // await getPnL(ADDRESS, 0);
}

main();
