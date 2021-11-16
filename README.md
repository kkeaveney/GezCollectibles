## Getting started

Here's how to deploy this project

1. Clone the repo

```sh
git clone https://github.com/kkeaveney/GezCollectibles
```

2. Install the dependencies

```sh
npm install

```

3. Start the testnet node

```sh
npx hardhat node
```

4. Deploy the contract

```sh
npx hardhat run scripts/deploy.js --network rinkeby
npx hardhat run scripts/mint.js --network rinkeby

```


6. Run the app

```sh
npm start
```