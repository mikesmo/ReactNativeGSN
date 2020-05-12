
const inherits = require('inherits');
const ethers = require('ethers');

const network = {
        chainId: 161,
        name: "standalone"
    }

function DebugProvider(url, network) {
    ethers.providers.BaseProvider.call(this, network.chainId);
    this.subprovider = new ethers.providers.JsonRpcProvider(url, network.chainId);
}
inherits(DebugProvider, ethers.providers.BaseProvider);


DebugProvider.prototype.perform = function(method, params) {
    let signature = ''; // Need to generate signatre
    let relayHubAddress = '';

    if (method === "sendTransaction") {
        let req = {
            encodedFunction: params.data,
            signature: signature,
            approvalData: [], // Can be empty
            from: params.from,
            to: params.to,
            gasPrice: 500000000000,
            gasLimit: 100000,
            relayFee: 70,
            RecipientNonce: 0,
            RelayMaxNonce: 58,
            RelayHubAddress: relayHubAddress
        }

        return new Promise(function (resolve, reject) {
            let gas = ethers.utils.bigNumberify("1000000000000000000000")
            resolve("1000000000000000000000");
        });  
    }

    return this.subprovider.perform(method, params).then(function(result) {
        console.log('DEBUG', method, params, '=>', result);
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