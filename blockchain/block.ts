import {CryptoUtils} from "../utils/crypto.utils";
import {Transaction} from "./transaction";
import {IBlock} from "./block.interface";
import {BlockPrintableData} from "./block-printable.interface";

export class Block implements IBlock {
    private data: Transaction;
    private hash: string;
    private previousHash: string;
    private timestamp: Date;
    private pow: number;
    private difficulty: number;
    private difficultyRegExp: RegExp;

    constructor(data: Transaction,
                previousHash: string,
                difficulty: number) {
        this.initBlockData(data, previousHash, difficulty);
    }

    private initBlockData(data: Transaction,
                          previousHash: string,
                          difficulty: number): void {
        this.data = data;
        this.hash = "0";
        this.previousHash = previousHash;
        this.timestamp = new Date();
        this.pow = 0;
        this.difficulty = difficulty;
        this.difficultyRegExp = this.createRegexpFor(difficulty);
    }

    private createRegexpFor(difficulty: number): RegExp {
        return new RegExp(`^(0){${difficulty}}.*`);
    }

    getHash(): string {
        return this.hash;
    }

    getPreviousHash(): string {
        return this.previousHash;
    }

    mine(): void {
        while (!this.hash.match(this.difficultyRegExp)) {
            this.pow++;
            this.hash = CryptoUtils.createSha256HashFrom(this.getBlockDataAsString());
        }
    }

    getBlockDataAsString(): string {
        return this.getTransactionDataAsString() +
            this.getPreviousHash() +
            this.getTimestampToISOString() +
            this.getPowToString();
    }

    getPrintableData(): BlockPrintableData {
        return {
            data: this.getTransactionDataAsString(),
            hash: this.getHash(),
            previousHash: this.getPreviousHash(),
            timestamp: this.getTimestampToISOString(),
            pow: this.getPowToString()
        };
    }

    private getTransactionData(): Transaction {
        return this.data ?? {} as Transaction;
    }

    private getTransactionDataAsString(): string {
        return JSON.stringify(this.getTransactionData(), null, 4);
    }

    private getTimestamp(): Date {
        return this.timestamp;
    }

    private getTimestampToISOString(): string {
        return this.getTimestamp().toISOString();
    }

    private getPow(): number {
        return this.pow;
    }

    private getPowToString(): string {
        return this.getPow().toString();
    }

}
