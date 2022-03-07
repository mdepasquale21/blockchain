import {createHash} from 'crypto';
import {IBlock} from "./block";

export class CryptoUtils {
    private static readonly algorithm = "sha256";
    private static readonly encoding = "hex";

    static createHashFor(block: IBlock) {
        const stringBlockData: string = this.buildStringBlockData(block)
        return createHash(this.algorithm).update(stringBlockData).digest(this.encoding);
    }

    private static buildStringBlockData(block: IBlock): string {
        return block.getTransactionDataAsString() +
            block.getPreviousHash() +
            block.getTimestampToISOString() +
            block.getPowToString();
    }

}