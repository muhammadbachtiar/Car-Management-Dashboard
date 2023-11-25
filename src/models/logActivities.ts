import { Model, ModelObject } from "objection";
import { UserModel } from "../models/Users";

export class LogActivityModel extends Model {
  id!: number;
  activitiy!: string;
  user_id!: number;
  car_id!: number;
  user_name!: string;
  car_name!: string;
  action_time!: Date;

  static get tableName() {
    return "logActivity";
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: "logActivity.user_id",
          to: "users.id",
        },
      }
    };
  }
}

export type LogActivity = ModelObject<LogActivityModel>;
