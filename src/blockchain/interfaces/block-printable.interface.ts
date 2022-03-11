import {Transaction} from "./transaction";

export interface BlockPrintableData {
    index: number;
    data: Transaction;
    hash: string;
    previousHash: string;
    timestamp: string;
    pow: number;
    difficulty: number;
}
