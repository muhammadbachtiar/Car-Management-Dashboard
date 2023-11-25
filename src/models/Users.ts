import { Model, ModelObject } from "objection";

export class UserModel extends Model {
    id!: number;
    username!: string;
    email!: string;
    password!: string;
    role!: string;
    is_active!: boolean;
    created_at!: Date;
    updated_at!: Date;

    static get tableName() {
        return "users";
    }
}

export type User = ModelObject<UserModel>;

