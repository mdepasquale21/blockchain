import {UuidUtil} from "../utils/uuid.util";

export class User {

    constructor(private id: string,
                private name: string) {
    }

    static create(name: string): User {
        const id = UuidUtil.getUuidV4();
        return new User(id, name);
    }

    public getId(): string {
        return this.id;
    }

}