import {Blockchain} from "./blockchain/blockchain";
import {Transaction} from "./blockchain/interfaces/transaction";
import {User} from "./user/user";
import {BlockchainPrintableData} from "./blockchain/interfaces/blockchain-printable.interface";

import * as fs from 'fs';

// Note:
// cannot tamper with blockchain data from this code
// can only add a block and check if the blockchain is valid
// chain is private and block data are not directly accessible

async function main() {

    const difficulty = 3;
    const blockchain: Blockchain = Blockchain.create(difficulty);

    const userMarco: string = User.create('Marco').getId();
    const userNicola: string = User.create('Nicola').getId();
    const userDaniele: string = User.create('Daniele').getId();
    const userMatteo: string = User.create('Matteo').getId();
    const userLorenzo: string = User.create('Lorenzo').getId();
    const userLaura: string = User.create('Laura').getId();

    const transactions: Transaction[] = [
        {
            from: userMarco,
            to: userNicola,
            amount: 7
        },
        {
            from: userDaniele,
            to: userMatteo,
            amount: 100
        },
        {
            from: userLorenzo,
            to: userLaura,
            amount: 50
        },
        {
            from: userMarco,
            to: userLaura,
            amount: 550
        },
        {
            from: userMatteo,
            to: userMarco,
            amount: 15
        }
    ];
    for (let transaction of transactions) {
        blockchain.addBlock(transaction);
    }

    const blockchainData: BlockchainPrintableData = blockchain.formatBlockchainJson();

    console.log('\n');
    console.log('***** Blockchain data *****');
    console.log(blockchainData);
    console.log('***** ----- *****');
    console.log('\n');

    const blockchainDataString: string = JSON.stringify({blockchainData}, null, 4);
    await fs.writeFileSync(`./src/blockchain.json`, blockchainDataString);

}

main().then(() => {
    console.log('Blockchain executed.');
    process.exit(0);
});
