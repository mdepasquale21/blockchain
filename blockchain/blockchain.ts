import {Block} from "./block";
import {Transaction} from "./transaction";
import {IBlock} from "./block.interface";
import {CryptoUtils} from "../utils/crypto.utils";
import {BlockPrintableData} from "./block-printable.interface";

export class Blockchain {
    constructor(private genesisBlock: IBlock,
                private chain: IBlock[],
                private difficulty: number
    ) {
    }

    public static create(difficulty: number): Blockchain {
        const genesisBlock: IBlock = new Block(null, null, difficulty);
        return new Blockchain(genesisBlock, [genesisBlock], difficulty);
    }

    public addBlock(transaction: Transaction): void {
        const lastBlock: IBlock = this.extractLastBlockFromChain();
        const newBlock: IBlock = new Block(transaction, lastBlock.getHash(), this.difficulty);
        newBlock.mine();
        this.chain.push(newBlock);
    }

    private extractLastBlockFromChain(): IBlock {
        return this.extractBlockAt(this.chain.length - 1);
    }

    private extractBlockAt(index: number): IBlock {
        return this.chain[index];
    }

    public isValid(): boolean {
        if (this.chain.length === 1) {
            return true;
        }
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock: IBlock = this.extractBlockAt(i);
            const previousBlock: IBlock = this.extractBlockAt(i - 1);
            if (
                currentBlock.getHash() !== CryptoUtils.recalculateSha256HashFor(currentBlock) ||
                previousBlock.getHash() !== currentBlock.getPreviousHash()
            ) {
                return false;
            }
        }
        return true;
    }

    public printToConsole(): void {
        console.log('\n');
        console.log('***** Blockchain data *****');
        console.log(`Difficulty: ${this.difficulty}`);
        console.log(`Verified: ${this.isValid()}`);
        for (let block of this.chain) {
            const blockPrintableData: BlockPrintableData = block.getPrintableData();
            console.log(blockPrintableData);
        }
        console.log('***** ----- *****');
        console.log('\n');
    }

}
