import {Block} from "./block";
import {Transaction} from "./interfaces/transaction";
import {IBlock} from "./interfaces/block.interface";
import {CryptoUtils} from "../utils/crypto.utils";
import {BlockPrintableData} from "./interfaces/block-printable.interface";
import {BlockchainPrintableData} from "./interfaces/blockchain-printable.interface";

export class Blockchain {
    protected constructor(private genesisBlock: IBlock,
                          private chain: IBlock[],
                          private difficulty: number
    ) {
    }

    public static create(difficulty: number): Blockchain {
        const genesisBlock: IBlock = new Block(0, null, null, difficulty);
        return new Blockchain(genesisBlock, [genesisBlock], difficulty);
    }

    public addBlock(transaction: Transaction): void {
        const lastBlock: IBlock = this.extractLastBlockFromChain();
        const newBlock: IBlock = new Block(
            this.getChainLength(),
            transaction,
            lastBlock.getHash(),
            this.difficulty
        );
        newBlock.mine();
        this.chain.push(newBlock);
    }

    private extractLastBlockFromChain(): IBlock {
        return this.extractBlockAt(this.getChainLength() - 1);
    }

    private extractBlockAt(index: number): IBlock {
        return this.chain[index];
    }

    private getChainLength(): number {
        return this.chain.length;
    }

    public isValid(): boolean {
        if (this.getChainLength() === 1) {
            return true;
        }
        for (let i = 1; i < this.getChainLength(); i++) {
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

    private getBlockPrintableDataList(): BlockPrintableData[] {
        let blockPrintableDataList: BlockPrintableData[] = [];
        for (let block of this.chain) {
            const blockPrintableData: BlockPrintableData = block.getPrintableData();
            blockPrintableDataList.push(blockPrintableData);
        }
        return blockPrintableDataList;
    }

    public printToConsole(): void {
        console.log('\n');
        console.log('***** Blockchain data *****');
        console.log(`Current difficulty: ${this.difficulty}`);
        console.log(`Verified: ${this.isValid()}`);
        let blocks: BlockPrintableData[] = this.getBlockPrintableDataList();
        for (let block of blocks) {
            console.log(block);
        }
        console.log('***** ----- *****');
        console.log('\n');
    }

    public formatBlockchainJson(): BlockchainPrintableData {
        let blocks: BlockPrintableData[] = this.getBlockPrintableDataList();
        return {
            currentDifficulty: this.difficulty,
            verified: this.isValid(),
            blocks,
        }
    }

}
