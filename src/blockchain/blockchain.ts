import {Block} from "./block";
import {Transaction} from "./interfaces/transaction";
import {IBlock} from "./interfaces/block.interface";
import {CryptoUtils} from "../utils/crypto.utils";
import {BlockPrintableData} from "./interfaces/block-printable.interface";
import {BlockchainPrintableData} from "./interfaces/blockchain-printable.interface";

export class Blockchain {

    // Estimated time to add a new block to the chain (after mining)
    // Constant value: 10 min for Bitcoin, 13 seconds for Ethereum
    // We'll use 13ms
    private readonly blockTime = 13;
    // Adjust difficulty every nBlocks based on the time it took (2016 blocks for Bitcoin, 1 block for Ethereum)
    private readonly nBlocks = 1;
    // Complete formula should be
    // newDifficulty = oldDifficulty * ((this.nBlocks * this.blockTime) / actualMiningTimeOfPreviousNBlocksBlocks)
    // We use the Ethereum value for nBlocks and a very small custom blockTime
    // We'll also use a simplified formula for recalculating difficulty (see below)
    // difficulty is recalculated after every block is mined, and it will be slightly different at each iteration

    protected constructor(private genesisBlock: IBlock,
                          private chain: IBlock[],
                          private difficulty: number
    ) {
    }

    public static create(difficulty: number): Blockchain {
        const genesisBlock: IBlock = new Block(0, null, null, difficulty);
        return new Blockchain(genesisBlock, [genesisBlock], difficulty);
    }

    private adjustDifficulty(): void {
        this.difficulty += (this.getMiningTimeOfLastBlock() > (this.nBlocks * this.blockTime)) ? -1: 1;
    }

    private getMiningTimeOfLastBlock(): number {
        return new Date().getTime() - this.extractLastBlockFromChain().getTimestampInMilliseconds();
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
        this.adjustDifficulty();
    }

    private getChainLength(): number {
        return this.chain.length;
    }

    private extractLastBlockFromChain(): IBlock {
        return this.extractBlockAt(this.getChainLength() - 1);
    }

    private extractBlockAt(index: number): IBlock {
        return this.chain[index];
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

    public formatBlockchainJson(): BlockchainPrintableData {
        let blocks: BlockPrintableData[] = this.getBlockPrintableDataList();
        return {
            currentDifficulty: this.difficulty,
            verified: this.isValid(),
            blocks,
        }
    }

}
