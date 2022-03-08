export interface IBlock {

    getHash(): string;

    getPreviousHash(): string;

    mine(): void;

    getBlockDataAsString(): string;

}
