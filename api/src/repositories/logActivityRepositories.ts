import { LogActivityModel } from '../models/logActivities'

class LogActivityRepository {
  async postLogActivity (activitiy: string, user_id: number, car_id: number, user_name: string, car_name: string): Promise<any> {
    const currentDate = new Date()
    const postedActivity = await LogActivityModel.query()
      .insert({
        activitiy,
        user_id,
        car_id,
        user_name,
        car_name,
        action_time: currentDate
      })
      .returning('*')

    return postedActivity
  }
}

export default LogActivityRepository
