import {Block} from "./block";
import {Transaction} from "./transaction";
import {IBlock} from "./block.interface";
import {CryptoUtils} from "../utils/crypto.utils";

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

    public isValid(): boolean {
        if (this.chain.length === 1) {
            return true;
        }
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
            if (
                currentBlock.getHash() !== CryptoUtils.recalculateSha256HashFor(currentBlock) ||
                previousBlock.getHash() !== currentBlock.getPreviousHash()
            ) {
                return false;
            }
        }
        return true;
    }

}
