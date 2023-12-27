import { Model, type ModelObject } from 'objection'

export class CarsModel extends Model {
  id!: number
  name!: string
  plate?: string
  manufacture?: string
  model?: string
  image_url!: string
  rent_per_day!: number
  capacity!: number
  description!: string
  transmission!: string
  type!: string
  year!: string
  options?: string[]
  specs?: string[]
  available_at!: Date
  isWithDriver!: boolean
  time_updated!: Date

  static readonly tableName = 'cars'
}

export type Cars = ModelObject<CarsModel>
