import { Model, ModelObject } from "objection";

export class CarsModel extends Model {
    id!: number;
    name!: string;
    type!: string;
    rent_per_day!: number;
    image_url!: string;
    time_updated!: Date;

    static get tableName() {
        return "cars";
    }
}

export type Cars = ModelObject<CarsModel>;
