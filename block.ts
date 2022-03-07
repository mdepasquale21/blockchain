import {CryptoUtils} from "./crypto.utils";
import {Transaction} from "./transaction";

export class Block implements IBlock {
    private data: Transaction;
    private hash: string;
    private previousHash: string;
    private timestamp: Date;
    private pow: number;

    constructor(data: Transaction, previousHash: string) {
        this.initBlockData(data, previousHash);
    }

    private initBlockData(data: Transaction, previousHash: string): void {
        this.data = data;
        this.hash = "";
        this.previousHash = previousHash;
        this.timestamp = new Date();
        this.pow = 0;
    }

    mine(difficulty: number) {
        const regex = new RegExp(`^(0){${difficulty}}.*`);
        while (!this.hash.match(regex)) {
            this.pow++;
            this.hash = CryptoUtils.createHashFor(this);
        }
    }

    getBlockDataAsString(): string {
        return this.getTransactionDataAsString() +
            this.getPreviousHash() +
            this.getTimestampToISOString() +
            this.getPowToString();
    }

    getHash(): string {
        return this.hash;
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

export interface IBlock {

    mine(difficulty: number): void;

    getBlockDataAsString(): string;

    getHash(): string;

}
