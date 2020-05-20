# Pharma-Chain Blockchain Solutions

## Start

```
# Install dependencies - From the root of your project
npm i
# Create a new development blockchain network  - From the root of your project
npm run env:restart
# Install your smart contract
npm run cc:start -- supplychain
# Start the Rest Server
npm run server:rest-api
```

## Upgrade

```
# If you want to add new function to the controller
# Add the required function in the controller.ts and update the api.json file
# stop the running server by Ctrl + c
npm run server:refresh-api -- supplychain <new-version like 1.1>
```

## Some Terminologies of env.ts file

```
# chaincode: the name of the smart contract. This is given when you installed it with hurl install <name> <language></language> </name>

# channel: by default a channel (ledger) is created for you with Hurley. Its name is ch1 and each subsequent channel will follow that pattern (ch2, ch3, ch4) check more on channels here.

# identityName: Its the name of the user that will be used to run the server (wallet). In this case Hurley also handles an standard (like user1, user2, user3) depending on how many to told it to create.

# identityOrg: Just like identityName this property refers to the organization of the identity which will be used to run, query, and submit transactions to the network.

# keyStore: The key store is a path where cryptographic objects are stored (for example the private key/wallet). This folder can be located anywhere and this property fallbacks to Hurley defaults.

# networkProfile: The network profile is a file with the addresses and certificates to communicate with the blockchain network. This coordinates are used by Fabric's official SDK.

# port: This is simply the port that will be used for the server. We previously set it in the app.ts file, but we will relocate it to this central configurations repository.

# couchDB*: This properties will define the coordinates to communicate with the CouchDB server of one of the peers. This is because we want to query some data directly and not through the peers - which is another way to do queries.
```
