import { CarsModel } from "../models/Cars";

class CarsRepository {
    async getListCar(): Promise<any> {
        const carsData = await CarsModel.query().orderBy('id', 'asc') || {}
    
        return carsData;
      }

    async getCarbyId(id: number | string): Promise<any> {
        try {
            const carData = await CarsModel.query().findById(id).throwIfNotFound();
            return carData;
        } catch (error) {
            return null; 
        }

      }

      async postCar ( name: string, rentPerDay: number, type: string, imageUrl: string): Promise<any> {
        const currentDate = new Date();
        const postedCar = await CarsModel.query()
        .insert({
            name,
            type,
            rent_per_day: rentPerDay,
            image_url: imageUrl,
            time_updated: currentDate,
        })
        .returning("*");
    
        return postedCar;
        }

        async putCar ( id: number | string, name: string, rentPerDay: number, type: string, imageUrl: string): Promise<any> {
            const currentDate = new Date();
            const updateCar = await CarsModel.query().patch({ name, type, rent_per_day: rentPerDay, image_url: imageUrl, time_updated: currentDate }).where('id', id).returning("*");
        
            return updateCar;
        }

        async deleteCar ( id: number | string): Promise<any> {
            return await CarsModel.query().deleteById(id);;
        }
}

export default CarsRepository;