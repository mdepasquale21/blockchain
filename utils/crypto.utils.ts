import {createHash} from 'crypto';
import {IBlock} from "../blockchain/block.interface";

export class CryptoUtils {
    private static readonly algorithm = "sha256";
    private static readonly encoding = "hex";

    static createSha256HashFrom(blockDataAsString: string) {
        return createHash(this.algorithm).update(blockDataAsString).digest(this.encoding);
    }

    static recalculateSha256HashFor(block: IBlock) {
        return CryptoUtils.createSha256HashFrom(block.getBlockDataAsString());
    }

}