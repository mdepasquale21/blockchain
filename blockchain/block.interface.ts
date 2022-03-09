import {BlockPrintableData} from "./block-printable.interface";

export interface IBlock {

    getHash(): string;

    getPreviousHash(): string;

    mine(): void;

    getBlockDataAsString(): string;

    getPrintableData(): BlockPrintableData;

}
