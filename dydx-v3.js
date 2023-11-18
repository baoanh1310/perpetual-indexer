const { 
    DydxClient, 
    LeaderboardPnlPeriod, 
    LeaderboardPnlSortBy 
} = require('@dydxprotocol/v3-client');

require('dotenv').config()

const STARK_KEY = process.env.STARK_KEY;
const STARK_PRIVATE_KEY = process.env.STARK_PRIVATE_KEY;
const STARK_KEY_YCOORDINATE = process.env.STARK_KEY_YCOORDINATE;

const HTTP_HOST = 'https://api.dydx.exchange';
const ETHEREUM_RPC_URL = 'https://eth.llamarpc.com';
const ETHEREUM_ADDRESS = '0xbE5899c7479412c2225d1448720427A3B8424242';

const client = new DydxClient(HTTP_HOST, { 
    apiTimeout: 3000,
    starkPrivateKey: STARK_PRIVATE_KEY
});

const { Web3 } = require('web3');
const web3 = new Web3(ETHEREUM_RPC_URL);

const privateClient = new DydxClient(HTTP_HOST, { networkId: 1, web3 });

async function getMarkets() {
    const markets = await client.public.getMarkets();
    console.log(`Markets list:`);
    for (let key of Object.keys(markets.markets)) {
        console.log(`${key}: ${markets.markets[key]}`);
    }
}

async function getLeaderboardPnLs() {
    // Get the top PNLs for a specified period and how they rank against each other.
    const leaderboardPnls = await client.public.getLeaderboardPnls({
        period: LeaderboardPnlPeriod.WEEKLY,
        sortBy: LeaderboardPnlSortBy.ABSOLUTE,
        limit: 10,
    });
    const topPnLs = leaderboardPnls.topPnls;
    console.log(`Top PnLs:`);
    for (let obj of topPnLs) {
        console.log('=======================================');
        for (let key of Object.keys(obj)) {
            console.log(`${key}: ${obj[key]}`)
        }
        console.log('=======================================');
    }
}

async function getPublicProfile(publicId) {
    const publicProfile = await client.public.getProfilePublic(publicId);
    for (let key of Object.keys(publicProfile)) {
        console.log(`${key}: ${publicProfile[key]}`);
    }
}

async function onboarding(ethereumAddress) {
    const onboardingInformation = await privateClient.onboarding.createUser(
        {
          starkKey: STARK_KEY,
          starkKeyYCoordinate: STARK_KEY_YCOORDINATE,
        },
        ethereumAddress,
    );
    for (let key of Object.keys(onboardingInformation)) {
        console.log(`${key}: ${onboardingInformation[key]}`)
    }
}

async function deriveStarkKey(ethereumAddress) {
    const keyPairWithYCoordinate = await privateClient.onboarding.deriveStarkKey(
        ethereumAddress,
    );
    for (let key of Object.keys(keyPairWithYCoordinate)) {
        console.log(`${key}: ${keyPairWithYCoordinate[key]}`)
    }
}

async function createApiKey(ethereumAddress) {
    // Limit: 20 API keys per user
    const apiKey = await client.ethPrivate.createApiKey(
        ethereumAddress,
    );
    console.log(`Registered API Key: ${apiKey}`);
}

async function getApiKeys() {
    const apiKeys = await client.private.getApiKeys();
    console.log(`API Keys: ${apiKeys}`);
}

async function getUserInfo() {
    const user = await client.private.getUser();
    for (let key of Object.keys(user)) {
        console.log(`${key}: ${user[key]}`);
    }
}

async function main() {
    // list all markets
    // await getMarkets();

    // get top leaderboard
    await getLeaderboardPnLs();

    // get public profile by using user's publicId
    // await getPublicProfile('KTUCGGII');

    // onboarding user
    // await onboarding(ETHEREUM_ADDRESS);

    // derive STARK key
    // await deriveStarkKey(ETHEREUM_ADDRESS);

    // await createApiKey(ETHEREUM_ADDRESS);

    // await getApiKeys();

    // await getUserInfo();
}

main();