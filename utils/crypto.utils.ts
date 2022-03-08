import {createHash} from 'crypto';

export class CryptoUtils {
    private static readonly algorithm = "sha256";
    private static readonly encoding = "hex";

    static createSha256HashFrom(blockDataAsString: string) {
        return createHash(this.algorithm).update(blockDataAsString).digest(this.encoding);
    }

}