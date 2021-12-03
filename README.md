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

5. Start ipfs server

```sh

Note you may want to restart => jsipfs daemon

```

6. Deploy and mint the contract

```sh
npx hardhat run scripts/deploy.js --network rinkeby
npx hardhat run scripts/mint.js --network rinkeby

Sample contract deployed on Rinkeby- 0x1c72c5C32DA6ac4E046F35D769219740a6744004

http://genz.surge.sh/

```

7. Run the app

```sh
npm run start
```
