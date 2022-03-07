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

    getTransactionData(): Transaction {
        return this.data;
    }

    getTransactionDataAsString(): string {
        return JSON.stringify(this.getTransactionData());
    }

    getHash(): string {
        return this.hash;
    }

    getPreviousHash(): string {
        return this.previousHash;
    }

    getTimestamp(): Date {
        return this.timestamp;
    }

    getPow(): number {
        return this.pow;
    }

    getTimestampToISOString(): string {
        return this.getTimestamp().toISOString();
    }

    getPowToString(): string {
        return this.getPow().toString();
    }

}

export interface IBlock {
    getTransactionData(): Transaction;

    getTransactionDataAsString(): string;

    getHash(): string;

    getPreviousHash(): string;

    getTimestamp(): Date;

    getPow(): number;

    getTimestampToISOString(): string;

    getPowToString(): string;
}
