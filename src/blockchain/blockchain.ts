import {Block} from "./block";
import {Transaction} from "./interfaces/transaction";
import {IBlock} from "./interfaces/block.interface";
import {CryptoUtils} from "../utils/crypto.utils";
import {BlockPrintableData} from "./interfaces/block-printable.interface";
import {BlockchainPrintableData} from "./interfaces/blockchain-printable.interface";

export class Blockchain {

    // Estimated time to add a new block to the chain (after mining)
    // Constant value: 10 min for Bitcoin, 13 seconds for Ethereum
    // We'll use 13 milliseconds for our simple problem
    private readonly blockTime = 13;
    // Adjust difficulty every nBlocks based on the time it took (2016 blocks for Bitcoin, 1 block for Ethereum)
    private readonly nBlocks = 1;
    // Estimated time to add new nBlocks blocks to the chain
    private readonly estimatedMiningTime = this.nBlocks * this.blockTime;

    // Complete formula to update difficulty should be:
    // newDifficulty = oldDifficulty * (this.estimatedMiningTime / actualMiningTimeOfPreviousNBlocksBlocks)
    // difficulty increases if estimated mining time is larger than actual mining time,
    // vice versa it decreases when estimated time is smaller than actual time

    // We use the Ethereum value for nBlocks and a very small custom blockTime
    // difficulty is recalculated after every block is mined, and it will be slightly different at each iteration
    // We'll use a simplified formula for recalculating difficulty
    // We'll increase/decrease difficulty by 1 if estimated time is larger/smaller than actual mining time

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
        this.difficulty += this.isEstimatedTimeLargerThanActualMiningTime() ? 1 : -1;
    }

    private isEstimatedTimeLargerThanActualMiningTime(): boolean {
        return this.estimatedMiningTime > this.getMiningTimeOfLastBlock();
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
