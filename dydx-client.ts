import { IndexerClient, Network } from "@dydxprotocol/v4-client-js";
 
const client = new IndexerClient(Network.testnet().indexerConfig);

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

async function getAddressSubaccounts(address: string) {
    // address is the wallet address on dYdX chain
    const response = await client.account.getSubaccounts(address);
    const subaccounts = response.subaccounts;
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
}

main();
