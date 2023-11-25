import { Request, Response } from 'express';
import CarsService from '../service/carsService';
import LogActivityService from '../service/logActivityService';
const cloudinaryUpload = require("../utils/cloudinaryUpload");


///CONTROLLER PAGE VIEW
const homePage = (req : Request, res: Response)=> {
    res.status(200).render('home', {})
}

const addCarPage = (req : Request, res: Response)=> {
    res.status(200).render('addCar', {})
}


//CONTROLLER CRUD RESPONDS JSON
const getListCars = async (req : Request, res: Response)=> {
  const getCarsData = await new CarsService().getListCar()

    res.status(201).json({
        message: "Success Get Cars Data",
        data:  getCarsData
    })
}

const getCarsById = async (req : Request, res: Response)=> {
  const getId = req.params.id;
  const filterById = await new CarsService().getCarbyId(getId);
  
  if(!filterById){
    return res.status(400).json({
      meesage: "No Data Car Found"
    })
  }

  res.status(201).json({
      message: "Success Get Car Data by ID",
      data: filterById,
  })
}

const postCar = async (req : Request & { user?: any }, res: Response) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        message: 'Gagal Upload File! File tidak ditemukan.',
      });
    }

    const { name, rentPerDay, type } = req.body || {};
    const cloudinaryResult : any = await cloudinaryUpload(req.file);
    const imageUrl = cloudinaryResult.url;
   
    const newPostedCar = await new CarsService().postCar(name, rentPerDay, type, imageUrl);
    const logActivities = await new LogActivityService().postLogActivity("INSERT", req.user.id, newPostedCar.id, req.user.username, newPostedCar.name);


    res.status(201).json({
      message: "Success Post Car Data",
      newDataCar: newPostedCar,
      logInsert: logActivities,
    });
  } catch (error : any) {
    res.status(500).json({ msg: error.message });
  }
}

const putCar = async (req : Request & { user?: any }, res: Response) => {
  const carIdToUpdate = Number(req.params.id);

  try {

    const carToUpdate = await new CarsService().getCarbyId(carIdToUpdate);
    const { name, rentPerDay, type } = req.body || {};


    if (!carToUpdate) {
      return res.status(404).json({ message: 'Car not found' });
    }

    const imageUrl = !req.file ? carToUpdate.image_url : (await cloudinaryUpload(req.file) as { url: string }).url;
    

    const updatedCarData = await new CarsService().putCar(carIdToUpdate, name, rentPerDay, type, imageUrl)
    const logActivities = await new LogActivityService().postLogActivity("UPDATE", req.user.id, carIdToUpdate, req.user.username, updatedCarData[0].name);

    res.status(201).json({
      message: "Success Update Car Data",
      updatedCarData: updatedCarData,
      logInsert: logActivities,
    });

  } catch (error : any) {
    res.status(500).json({ msg: error.message });
  }

}

const deleteCar = async (req : Request & { user?: any }, res: Response) => {
  try {
    const carId = req.params.id;
    const carToDelete = await new CarsService().getCarbyId(carId);

    if (!carToDelete) {
      return res.status(404).json({ message: 'Car not found' });
    }

    await new CarsService().deleteCar(carId);
    const logActivities = await new LogActivityService().postLogActivity("DELETE", req.user.id, carToDelete.id, req.user.username, carToDelete.name);

    res.status(200).json({ message: 'Car deleted successfully',
                          logActivitiy: logActivities
  });

  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}





module.exports = {
    getListCars,
    getCarsById,
    postCar,
    putCar,
    deleteCar,
    homePage,
    addCarPage,
}