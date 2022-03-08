import {Block, IBlock} from "./block";
import {Transaction} from "./transaction";

export class Blockchain {
    constructor(private genesisBlock: IBlock,
                private chain: IBlock[],
                private difficulty: number
    ) {
    }

    public static create(difficulty: number) {
        const genesisBlock = new Block(null, null, difficulty);
        return new Blockchain(genesisBlock, [genesisBlock], difficulty);
    }

    public addBlock(transaction: Transaction): void {
        const lastBlock: IBlock = this.extractLastBlockFromChain();
        const newBlock: IBlock = new Block(transaction, lastBlock.getHash(), this.difficulty);
        newBlock.mine();
        this.chain.push(newBlock);
    }

    private extractLastBlockFromChain() {
        return this.chain[this.chain.length - 1];
    }

// todo validate the blockchain
    public isValid(): boolean {
        return false;
    }

}
