import {BlockPrintableData} from "./block-printable.interface";

export interface BlockchainPrintableData {
    currentDifficulty: number;
    verified: boolean;
    blocks: BlockPrintableData[];
}
