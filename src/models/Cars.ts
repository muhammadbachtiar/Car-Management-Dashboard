import { Model, ModelObject } from "objection";

export class CarsModel extends Model {
  id!: number;
  name!: string;
  plate?: string; 
  manufacture?: string; 
  model?: string;
  image_url!: string; 
  rent_per_day!: number; 
  capacity!: number;
  description!: string;
  transmission!: string;
  type!: string;
  year!: string;
  options?: string[]; 
  specs?: string[]; 
  available_at!: Date; 
  isWithDriver!: Boolean; 
  time_updated!: Date;

  static get tableName() {
    return "cars";
  }
}

export type Cars = ModelObject<CarsModel>;
