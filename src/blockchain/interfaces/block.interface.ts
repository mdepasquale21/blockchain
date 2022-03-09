import {BlockPrintableData} from "./block-printable.interface";

export interface IBlock {

    getHash(): string;

    getPreviousHash(): string;

    mine(): void;

    getConcatDataAsString(): string;

    getPrintableData(): BlockPrintableData;

}
