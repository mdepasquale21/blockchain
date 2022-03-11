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

    const transactions: Transaction[] = [
        {
            from: User.create('Marco').getId(),
            to: User.create('Nicola').getId(),
            amount: 7
        },
        {
            from: User.create('Daniele').getId(),
            to: User.create('Matteo').getId(),
            amount: 100
        },
        {
            from: User.create('Lorenzo').getId(),
            to: User.create('Laura').getId(),
            amount: 50
        }
    ];
    for (let transaction of transactions) {
        blockchain.addBlock(transaction);
    }

    blockchain.printToConsole();

    const blockchainData: BlockchainPrintableData = blockchain.formatBlockchainJson();
    await fs.writeFileSync(`./src/blockchain.json`,
        JSON.stringify({blockchainData}, null, 4));

}

main().then(() => {
    console.log('Blockchain executed.');
    process.exit(0);
});
