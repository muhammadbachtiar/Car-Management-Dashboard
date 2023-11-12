import { Request, Response } from 'express';
import cloudinary from "./../config/cloudinaryConfig";
import { CarsModel } from '../models/Cars';

interface Car {
    id: number;
    name: string;
    type: string;
    rentPerDay: number;
    timeUpdate: Date;
    image: string;
  }

///CONTROLLER PAGE VIEW
const homePage = (req : Request, res: Response)=> {
    res.status(200).render('home', {})
}

const addCarPage = (req : Request, res: Response)=> {
    res.status(200).render('addCar', {})
}


//CONTROLLER UPLOAD IMAGE
const uploadImage = (req : Request, res: Response)=> {
    if (!req.file) {
        return res.status(400).json({
          message: 'Gagal Upload File! File tidak ditemukan.',
        });
    }
    const filebase64 = req.file.buffer.toString("base64");
    const file = `data:${req.file.mimetype};base64,${filebase64}`

    cloudinary.uploader.upload(file, function(err: any, result: { url: any; }) {   
        if(!!err) {
            console.log(err)
            return res.status(400).json({
                message: "Gagal Upload File!"
            })
        }

        res.status(201).json({
            message: "Upload image berhasil",
            url: result.url,
        })
    })
}

//FUNCTION UPLOAD IMAGE
const cloudinaryUpload = async (file : any) => {
  return new Promise((resolve, reject) => {
    const filebase64 = file.buffer.toString('base64');
    const finalFile = `data:${file.mimetype};base64,${filebase64}`;
    cloudinary.uploader.upload(finalFile, (err: any, result: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};


//CONTROLLER CRUD RESPONDS JSON
const getListCars = async (req : Request, res: Response)=> {
  const getCarsData = await CarsModel.query().orderBy('id', 'asc') || {};

    const { name = "" } = req.query as { name?: string };
    const filteredCars = getCarsData.filter(({name: nameValue})=>  nameValue.toLowerCase().includes(name.toLowerCase()))

    res.status(201).json({
        message: "Success Get Cars Data",
        data:  name ?  filteredCars : getCarsData
    })
}

const getCarsById = async (req : Request, res: Response)=> {
  const getId = req.params.id;
  const filterById = await CarsModel.query().findById(getId).throwIfNotFound();

  res.status(201).json({
      message: "Success Get Car Data by ID",
      data: filterById,
  })
}

const postCar = async (req : Request, res: Response) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        message: 'Gagal Upload File! File tidak ditemukan.',
      });
    }

    const { name, rentPerDay, type } = req.body || {};
    const cloudinaryResult : any = await cloudinaryUpload(req.file);
    const imageUrl = cloudinaryResult.url;

    const newObjCarWithId = {
      name,
      rent_per_day: rentPerDay,
      type,
      image_url: imageUrl,
      time_update: new Date(),
    };


    await CarsModel.query().insert(newObjCarWithId)
    const newListCars = await CarsModel.query().orderBy('id', 'asc') || {}


    res.status(201).json({
      message: "Success Post Car Data",
      newDataCar: newObjCarWithId,
      newListCars: newListCars,
    });
  } catch (error : any) {
    res.status(500).json({ msg: error.message });
  }
}

const putCar = async (req : Request, res: Response) => {
  const carIdToUpdate = Number(req.params.id);

  try {

    const carToUpdate = await CarsModel.query().where("id", carIdToUpdate) || {};
    const { name, rentPerDay, type } = req.body || {};
    const newListCars = await CarsModel.query().orderBy('id', 'asc') || {}


    if (!carToUpdate) {
      return res.status(404).json({ message: 'Car not found' });
    }

    const imageUrl = !req.file ? carToUpdate[0].image_url : (await cloudinaryUpload(req.file) as { url: string }).url;
    
    const updateObjectCar = {
      name,
      rent_per_day: rentPerDay,
      type,
      image_url: imageUrl,
      time_update: new Date(),
    };

    await CarsModel.query().update(updateObjectCar).where("id", carIdToUpdate)

    res.status(201).json({
      message: "Success Update Car Data",
      carToUpdate: carToUpdate,
      newListCars: newListCars
    });

  } catch (error : any) {
    res.status(500).json({ msg: error.message });
  }

}

const deleteCar = async (req : Request, res: Response) => {
  try {
    const carId = req.params.id;
    const DeletedCardata = CarsModel.query().findById(carId).throwIfNotFound()
    await CarsModel.query().deleteById(carId);
    const newListCars = await CarsModel.query().orderBy('id', 'asc') || {}

    res.status(200).json({ message: 'Car deleted successfully', DeletedCardata: DeletedCardata, newListCars: newListCars });

  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}



//CONTROLLER CRUD RESPONDS VIEW
const listCar = async (req : Request, res: Response)=> {
    const getCarsData = await CarsModel.query().orderBy('id', 'asc') || {};

    const { name = "" } = req.query as { name?: string };
    const filteredCars = getCarsData.filter(({name: nameValue})=>  nameValue.toLowerCase().includes(name.toLowerCase()))

    res.status(200).render('carList', {
        cars: name ?  filteredCars : getCarsData
    })
}

const createCar = async (req : Request, res: Response)=> {
  try {

    if (!req.file) {
      return res.status(400).json({
        message: 'Gagal Upload File! File tidak ditemukan.',
      });
    }

    const { name, rentPerDay, type } = req.body || {};
    const cloudinaryResult : any = await cloudinaryUpload(req.file);
    const imageUrl = cloudinaryResult.url;

    const newObjCarWithId = {
      name,
      rent_per_day: rentPerDay,
      type,
      image_url: imageUrl,
      time_update: new Date(),
    };


    await CarsModel.query().insert(newObjCarWithId)


    res.status(201).redirect('/cars');
  } catch (error : any) {
    res.status(500).json({ msg: error.message });
  }
}

const updateCar = async (req : Request, res: Response)=> {
  const carIdToUpdate = Number(req.params.id);

  try {

    const carToUpdate = await CarsModel.query().where("id", carIdToUpdate) || {};
    const { name, rentPerDay, type } = req.body || {};


    if (!carToUpdate) {
      return res.status(404).json({ message: 'Car not found' });
    }

    const imageUrl = !req.file ? carToUpdate[0].image_url : (await cloudinaryUpload(req.file) as { url: string }).url;
    
    const updateObjectCar = {
      name,
      rent_per_day: rentPerDay,
      type,
      image_url: imageUrl,
      time_update: new Date(),
    };

    await CarsModel.query().update(updateObjectCar).where("id", carIdToUpdate)

    res.status(201).redirect('/cars');
  } catch (error : any) {
    res.status(500).json({ msg: error.message });
  }
}

const removeCar = async (req: Request, res: Response) => {
    try {
      const carId = req.params.id;
      await CarsModel.query().deleteById(carId);
      res.status(200).redirect("/cars");

    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  
  };
  

const getById = async (req : Request, res: Response) => {
    const getId = req.params.id;
    const filterById = await CarsModel.query().findById(getId).throwIfNotFound();

    res.status(200).render('editCar', {
        cars: filterById
    })
}

module.exports = {
    getListCars,
    getCarsById,
    postCar,
    putCar,
    deleteCar,
    uploadImage,
    homePage,
    listCar, 
    addCarPage,
    updateCar,
    removeCar,
    getById, 
    createCar
}