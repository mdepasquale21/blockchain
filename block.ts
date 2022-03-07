import {CryptoUtils} from "./crypto.utils";

export class Block implements IBlock {
    private data;
    private hash: string;
    private previousHash: string;
    private timestamp: Date;
    private pow: number;

    constructor(data, previousHash) {
        this.initBlockData(data, previousHash);
    }

    private initBlockData(data: any, previousHash: string): void {
        this.data = data;
        this.hash = "";
        this.previousHash = previousHash;
        this.timestamp = new Date();
        this.pow = 0;
    }

    private mine(difficulty: number) {
        const regex = new RegExp(`^(0){${difficulty}}.*`);
        while (!this.hash.match(regex)) {
            this.pow++;
            this.hash = CryptoUtils.createHashFor(this);
        }
    }

    getData(): any {
        return this.data
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
    getData(): any;

    getHash(): string;

    getPreviousHash(): string;

    getTimestamp(): Date;

    getPow(): number;

    getTimestampToISOString(): string;

    getPowToString(): string;
}
