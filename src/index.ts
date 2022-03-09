import {Blockchain} from "./blockchain/blockchain";
import {Transaction} from "./blockchain/interfaces/transaction";
import {User} from "./user/user";

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

// cannot tamper with blockchain data from this code
// can only add a block and check if the blockchain is valid
// chain is private and block data are not directly accessible
