
import { RELAY_URL, RELAY_ADRRESS, BLOCKCHAIN_RPC, CHAIN_ID, CHAIN_NAME } from 'react-native-dotenv'

const inherits = require('inherits');
const ethers = require('ethers');
const Web3 = require('web3');
const EthCrypto = require('eth-crypto');

const web3 = new Web3(BLOCKCHAIN_RPC);
const RelayClient = require('@openzeppelin/gsn-provider/src/tabookey-gasless/RelayClient');

const network = {
        chainId: parseInt(CHAIN_ID),
        name: CHAIN_NAME
    }

function DebugProvider(url, network) {
    ethers.providers.BaseProvider.call(this, network.chainId);
    this.subprovider = new ethers.providers.JsonRpcProvider(url, network.chainId);
}
inherits(DebugProvider, ethers.providers.BaseProvider);


DebugProvider.prototype.perform = async function(method, params) {

    if (method === "sendTransaction") {

        const voterAddress = "0x4C3Bf861A9F822F06c10fE12CD912AaCC5e3A4f6"
        const identity = EthCrypto.createIdentity();

        let payload = {
            params: [{
                from: identity.address,
                value: null,
                useGSN: true,
                gas: params.gasLimit.toHexString(),
                data: params.data,
                gasPrice: params.gasPrice.toHexString(),
                to: voterAddress,
                txfee: 70,
                privateKey: identity.privateKey,
                relayUrl: RELAY_URL,
                relayAddr: RELAY_ADRRESS
            }]
        } 

        let relayClient = new RelayClient(web3, {verbose: true});
        let result = await relayClient.sendTransaction(payload);
        return new Promise(function (resolve, reject) {
            resolve(result);
        });  

    }

    if (method === "sendSignedTransaction") {
        return new Promise(function (resolve, reject) {
            resolve();
        });  
    }

    return this.subprovider.perform(method, params).then(function(result) {
        //console.log('DEBUG', method, params, '=>', result);
        return result;
    });
}

export const provider = (url) => {
    //return new ethers.providers.JsonRpcProvider(url, network.chainId);
    return new DebugProvider(url, network)
}

export const newWallet = (privateKey, provider) => {
    return new ethers.Wallet(privateKey, provider);
}
