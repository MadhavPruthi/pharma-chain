# pharmaTest - drug

## Start

```
# Install dependencies - From the root of your project
npm i
# Create a new development blockchain network  - From the root of your project
npm run env:restart
# Install your smart contract
npm run cc:start -- supplychain
# Make a testing call to create a record in the ledger
# Beware that the first call may fail with a timeout! Just happens the first time
hurl invoke drug drug_create "{\"name\":\"my first request\",\"id\":\"0001\",\"created\":0,\"modified\":0}"
```

## About Hurley

You may as well install **Hurley** globally for easier and more flexible management.

`npm i -g @worldsibu/hurley`

Since with Hurley globally you have control over everything, some things that you can do, for example, is installing a Convector Smart Contract with a different name than the one you used for your project.

```
# Use the same package
# Install a new chaincode with the same source code but the name 'anothernameforyourcc'
hurl install anothernameforyourcc node
```

Other complex tasks you may need is installing to a different channel.

```
# Use the same package
# Be sure you started your environment with more than one channel running 'hurl new --channels 2'. Otherwise this will throw an error.
hurl install anothernameforyourcc node --channel ch2
```

---

If you don't want to, don't worries! This project works right away.

## Start - if you have Hurley globally

### Bring your project to life

```
# Install dependencies - From the root of your project
npm i
# Create a new development blockchain network  - From the root of your project
hurl new
```

### Install and upgrade chaincodes

```
# Package your smart contract's code  - From the root of your project
npm run cc:package -- supplychain org1
# Install to your blockchain - From the root of your project
hurl install drug node -P ./chaincode-supplychain
# Install in debug mode, this will run the chaincode server locally so you can debug
hurl install drug node -P ./chaincode-supplychain --debug

# Upgrade your existing chaincode - From the root of your project
hurl upgrade drug node 1.2 -P ./chaincode-supplychain
```

## Start - if you don't have Hurley globally

### Bring your project to life

```
# Install dependencies - From the root of your project
npm i
# Create a new development blockchain network  - From the root of your project
npm run env:restart
```

### Install and upgrade chaincodes

```
# Install to your blockchain - From the root of your project
npm run cc:start -- supplychain

# Upgrade your existing chaincode - From the root of your project
npm run cc:upgrade -- supplychain 1.2
```

```
chaincode: the name of the smart contract. This is given when you installed it with hurl install <name> <language></language> </name>
channel: by default a channel (ledger) is created for you with Hurley. Its name is ch1 and each subsequent channel will follow that pattern (ch2, ch3, ch4) check more on channels here.
identityName: Its the name of the user that will be used to run the server (wallet). In this case Hurley also handles an standard (like user1, user2, user3) depending on how many to told it to create.
identityOrg: Just like identityName this property refers to the organization of the identity which will be used to run, query, and submit transactions to the network.
keyStore: The key store is a path where cryptographic objects are stored (for example the private key/wallet). This folder can be located anywhere and this property fallbacks to Hurley defaults.
networkProfile: The network profile is a file with the addresses and certificates to communicate with the blockchain network. This coordinates are used by Fabric's official SDK.
port: This is simply the port that will be used for the server. We previously set it in the app.ts file, but we will relocate it to this central configurations repository.
couchDB*: This properties will define the coordinates to communicate with the CouchDB server of one of the peers. This is because we want to query some data directly and not through the peers - which is another way to do queries.
```
