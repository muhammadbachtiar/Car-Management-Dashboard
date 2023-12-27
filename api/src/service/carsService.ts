import CarsRepository from '../repositories/carsRepositories'

class CarsService {
  readonly #carsRepository: CarsRepository

  constructor () {
    this.#carsRepository = new CarsRepository()
  }

  async getListCar (): Promise<any> {
    const carsData = this.#carsRepository.getListCar()
    return await carsData
  }

  async getCarbyId (id: number | string): Promise<any> {
    const carData = this.#carsRepository.getCarbyId(id)

    return await carData
  }

  async postCar (name: string, rentPerDay: number, type: string, imageUrl: string, capacity: number, description: string, year: string, available_at: Date, transmission: string, isWithDriver: boolean): Promise<any> {
    const postedCar = this.#carsRepository.postCar(name, rentPerDay, type, imageUrl, capacity, description, year, available_at, transmission, isWithDriver)

    return await postedCar
  }

  async putCar (id: number | string, name: string, rentPerDay: number, type: string, imageUrl: string, capacity: number, description: string, year: string, available_at: Date, transmission: string, isWithDriver: boolean): Promise<any> {
    const updateCar = this.#carsRepository.putCar(id, name, rentPerDay, type, imageUrl, capacity, description, year, available_at, transmission, isWithDriver)
    return await updateCar
  }

  async deleteCar (id: number | string): Promise<any> {
    return await this.#carsRepository.deleteCar(id)
  }
}

export default CarsService
