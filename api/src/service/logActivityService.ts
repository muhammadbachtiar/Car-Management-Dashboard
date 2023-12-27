import LogActivityRepository from '../repositories/logActivityRepositories'

class CarsService {
  readonly #LogActivityRepository: LogActivityRepository

  constructor () {
    this.#LogActivityRepository = new LogActivityRepository()
  }

  async postLogActivity (activity: string, user_id: number, car_id: number, user_name: string, car_name: string): Promise<any> {
    const postedCar = this.#LogActivityRepository.postLogActivity(activity, user_id, car_id, user_name, car_name)

    return await postedCar
  }
}

export default CarsService
