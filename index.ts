import {Blockchain} from "./blockchain/blockchain";
import {Transaction} from "./blockchain/interfaces/transaction";

const difficulty = 2;
const blockchain: Blockchain = Blockchain.create(difficulty);

const transaction1: Transaction = {
    from: 'Marco',
    to: 'Nicola',
    amount: 7
};
const transaction2: Transaction = {
    from: 'Daniele',
    to: 'Matteo',
    amount: 100
};
const transaction3: Transaction = {
    from: 'Lorenzo',
    to: 'Laura',
    amount: 50
};
blockchain.addBlock(transaction1);
blockchain.addBlock(transaction2);
blockchain.addBlock(transaction3);

blockchain.printToConsole();

// cannot tamper with blockchain data from this code
// can only add a block and check if the blockchain is valid
// chain is private and block data are not directly accessible
