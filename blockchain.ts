import {Block, IBlock} from "./block";
import {Transaction} from "./transaction";

export class Blockchain {
    constructor(private genesisBlock: IBlock,
                private chain: IBlock[],
                private difficulty: number
    ) {
    }

    static create(difficulty: number) {
        const genesisBlock = new Block(null, null);
        return new Blockchain(genesisBlock, [genesisBlock], difficulty);
    }

    public addBlock(transaction: Transaction): void {
        const lastBlock = this.chain[this.chain.length - 1];
        const newBlock = new Block(transaction, lastBlock.getHash());
        newBlock.mine(this.difficulty);
        this.chain.push(newBlock);
    }
}
