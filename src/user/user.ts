import {UuidUtil} from "../utils/uuid.util";

export interface IUser {
    id: string;
    name: string;
}

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