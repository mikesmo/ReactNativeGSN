# New GSN Relay client

To send a gasless transaction, a signed transaction message is sent to a GSN (Gas Station Network) relay server that sends the transaction to the blockchain network and pays the gas fee onbehalf of the sender. 

**Problem**

The current relay client in the `@openzeppelin` library that we are using only works in the broswer, not in a react native app. This is because it references Node.js libraries. 

**Solution**

A simple relay client needs be developed using javascript libraries that are compatible with React Native. 

Whenever a client application attempts to send a blockchain transaction the relay client needs to intercept the `sendTransaction` API call and instead send a signed message to the relay server of the GSN.

## Current Relay Client

The following instructions shows you how to set up your local environment so that you can get the existing relay client working that uses `@openzeppelin`. You will use this to test a working transaction that is relayed via the GSN that you will then repeat using the new relay client.

To set up your enviroment you will need:

1. A local Lightstreams blockchain running in `standalone` mode.
2. A local GSN relay server.

### Setting up a local Lightstreams blockchain

1. Follow these instructions to install `leth`
https://docs.lightstreams.network/products/smart-vault/getting-started/installation

2. Initialise and run a local node in `standalone` mode

```
$ leth init --nodeid=1 --network=standalone
$ leth run --nodeid=1 --network=standalone --https
```

If all is running correctly, you should see the following message:
```
All Leth online/offline services are up and running!
```

### Setting up a local GSN relay server


1. Clone the following github repo:
```
$ git clone https://github.com/lightstreams-network/tabookey-gasless
```

2. Change directory, check out stable branch and install node modules
```
$ cd tabookey-gasless
$ git checkout -b dev-lightstreams origin/stable
$ yarn install
```

Note: You may get the following npm error: `npm ERR! cb() never called!`. This is ok.

3. Create dir path and download the compiled Relay Server executive for macOS
```
$ mkdir -p build/server/bin/
$ wget "https://s3.eu-central-1.amazonaws.com/lightstreams-public/gsn/latest/RelayHttpServer-osx" -O build/server/bin/RelayHttpServer
```

4. Update the permissions
```
$ chmod u+x build/server/bin/RelayHttpServer
```

5. Set the environment variables with default valuessou
```
$ cp .env.sample .env
```

5. Send stake to relay hub
```
$ leth wallet transfer --nodeid=1 --network=standalone --from=0xc916cfe5c83dd4fc3c3b0bf2ec2d4e401782875e --to=0xd54E368344d633763Df624b2B9cF2db3712EC390 --value=100000000000000000000
```

leth wallet transfer --nodeid=1 --network=standalone --from=0xc916cfe5c83dd4fc3c3b0bf2ec2d4e401782875e --to=0x4bfb7c5808FCc0092d2Da1DF40934696cF99737F --value=100000000000000000000

5. Run the Relay Server
```
$ source .env && ./relay.sh
```
