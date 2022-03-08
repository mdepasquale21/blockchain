import {CryptoUtils} from "../utils/crypto.utils";
import {Transaction} from "./transaction";
import {IBlock} from "./block.interface";

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
        this.hash = "";
        this.previousHash = previousHash;
        this.timestamp = new Date();
        this.pow = 0;
        this.difficulty = difficulty;
        this.difficultyRegExp = this.createRegexpFor(difficulty);
    }

    private createRegexpFor(difficulty: number) {
        return new RegExp(`^(0){${difficulty}}.*`);
    }

    getHash(): string {
        return this.hash;
    }

    mine(): void {
        while (!this.hash.match(this.difficultyRegExp)) {
            this.pow++;
            this.hash = CryptoUtils.createSha256HashFrom(this.getBlockDataAsString());
        }
    }

    private getBlockDataAsString(): string {
        return this.getTransactionDataAsString() +
            this.getPreviousHash() +
            this.getTimestampToISOString() +
            this.getPowToString();
    }

    private getTransactionData(): Transaction {
        return this.data;
    }

    private getTransactionDataAsString(): string {
        return JSON.stringify(this.getTransactionData());
    }

    private getPreviousHash(): string {
        return this.previousHash;
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
