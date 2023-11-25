import CarsRepository from "../repositories/carsRepositories";

class CarsService {
    #carsRepository: CarsRepository;

    constructor(){
        this.#carsRepository = new CarsRepository();
    }

    async getListCar() {
        const carsData = this.#carsRepository.getListCar();
        return carsData;
      }

    async getCarbyId(id: number | string) {
        const carData = this.#carsRepository.getCarbyId(id);
    
        return carData;
      }

      async postCar ( name: string, rentPerDay: number, type: string, imageUrl: string): Promise<any> {
        const postedCar = this.#carsRepository.postCar(name, rentPerDay, type, imageUrl);
    
        return postedCar;
        }

        async putCar ( id: number | string, name: string, rentPerDay: number, type: string, imageUrl: string): Promise<any> {
            const updateCar = this.#carsRepository.putCar(id, name, rentPerDay,type,imageUrl)
            return updateCar;
        }

        async deleteCar ( id: number | string): Promise<any> {
            return this.#carsRepository.deleteCar(id);
        }
}

export default CarsService