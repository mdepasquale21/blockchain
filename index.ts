import {Blockchain} from "./blockchain/blockchain";
import {Transaction} from "./blockchain/interfaces/transaction";

const difficulty = 3;
const blockchain: Blockchain = Blockchain.create(difficulty);

const transactions: Transaction[] = [
    {
        from: 'Marco',
        to: 'Nicola',
        amount: 7
    },
    {
        from: 'Daniele',
        to: 'Matteo',
        amount: 100
    },
    {
        from: 'Lorenzo',
        to: 'Laura',
        amount: 50
    }
];
for (let transaction of transactions) {
    blockchain.addBlock(transaction);
}

blockchain.printToConsole();

// cannot tamper with blockchain data from this code
// can only add a block and check if the blockchain is valid
// chain is private and block data are not directly accessible
