import { Request, Response } from 'express';
import { v4 as uuidv4 } from "uuid";
import carListData from "./../models/dummyData";
import cloudinary from "./../config/cloudinaryConfig";

interface Car {
    id: number;
    name: string;
    type: string;
    rentPerDay: number;
    timeUpdate: Date;
    image: string;
  }

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

const getListCars = (req : Request, res: Response)=> {
    res.status(201).json({
        message: "Success Get Cars Data",
        data: carListData,
    })
}

const getCarsById = (req : Request, res: Response)=> {
    const getId = req.params.id;
    const CarsDatafilterById = carListData.filter(({id})=> id === Number(getId) )

    res.status(201).json({
        message: "Success Get Car Data by ID",
        data: CarsDatafilterById,
    })
}

const postCar = (req : Request, res: Response) => {
    const newCar : Car = {
        id: 0,
        name: "", 
        type: "", 
        rentPerDay: 0, 
        timeUpdate: new Date(),
        image: ""
    };
    if (!req.file) {
        return res.status(400).json({
          message: 'Gagal Upload File! File tidak ditemukan.',
        });
      }
    let carId = carListData.length + 1;
    const filebase64 = req.file.buffer.toString("base64");
    const file = `data:${req.file.mimetype};base64,${filebase64}`


    newCar.name = String(req.body.name);
    newCar.rentPerDay = Number(req.body.rentPerDay);
    newCar.type = String(req.body.type);
    newCar.id = carId;
    newCar.timeUpdate = new Date();

  cloudinary.uploader.upload(file, (err: { message: any; }, result: { url: string; }) => {
    if (err) {
      return res.status(500).json({ msg: err.message });
    }

    newCar.image = result.url;

    carListData.push(newCar);

    res.status(201).json({
      message: "Success Post Car Data",
      newDataCar: newCar,
      newListCars: carListData,
    });
  });
}

const putCar = (req : Request, res: Response) => {
    if (!req.file) {
        return res.status(400).json({
          message: 'Gagal Upload File! File tidak ditemukan.',
        });
      }
    const carIdToUpdate = Number(req.params.id);
    const updatedCar = req.body; 
    const filebase64 = req.file.buffer.toString("base64");
    const file = `data:${req.file.mimetype};base64,${filebase64}`
    const carToUpdate = carListData.find(car => car.id === carIdToUpdate);

    if (!carToUpdate) {
        return res.status(404).json({ message: "Car not found" });
    }

    carToUpdate.name = updatedCar.name;
    carToUpdate.rentPerDay = updatedCar.rentPerDay;
    carToUpdate.type = updatedCar.type;
    carToUpdate.timeUpdate = new Date();

  cloudinary.uploader.upload(file, (err: { message: any; }, result: { url: string; }) => {
    if (err) {
      return res.status(500).json({ msg: err.message });
    }

    carToUpdate.image = result.url;


    res.status(201).json({
      message: "Success Update Car Data",
      updatedCarId: carIdToUpdate,
      newListCars: carListData
    });
  });
}

const deleteCar = (req : Request, res: Response) => {
    const getId =  req.params.id;
    let index = carListData.findIndex(car => car.id === Number(getId));

    if (index === -1) return res.status(404).send({ message: 'Car not found' });

    let car = carListData.splice(index, 1)[0];

    res.status(200).send({ message: 'Car deleted successfully', DeletedCardata: car, newListCars: carListData });
}


const homePage = (req : Request, res: Response)=> {
    res.status(200).render('home', {})
}

const addCarPage = (req : Request, res: Response)=> {
    res.status(200).render('addCar', {})
}


const listCar = (req : Request, res: Response)=> {
    const { name = "" } = req.query as { name?: string };
    const filteredCars = carListData.filter(({name: nameValue})=>  nameValue.toLowerCase().includes(name.toLowerCase()))

    res.status(200).render('carList', {
        cars: name ?  filteredCars : carListData
    })
}

const createCar = (req : Request, res: Response)=> {
    const newId = Number(uuidv4());
    if (!req.file) {
        return res.status(400).json({
          message: 'Gagal Upload File! File tidak ditemukan.',
        });
      }
    const filebase64 = req.file.buffer.toString("base64");
    const file = `data:${req.file.mimetype};base64,${filebase64}`

    const { name, rentPerDay, type } = req.body;
    const newObjCarWithId : Car = {
        id: newId,
        name: name,
        rentPerDay: rentPerDay,
        type: type,
        timeUpdate: new Date(),
        image: ""
    }

  cloudinary.uploader.upload(file, (err: { message: any; }, result: { url: string; }) => {
    if (err) {
      return res.status(500).json({ msg: err.message });
    }

    newObjCarWithId.image = result.url;

    carListData.push(newObjCarWithId);

    res.status(201).redirect('/cars');
  });
}

const updateCar = (req : Request, res: Response)=> {
    const carIdToUpdate = Number(req.params.id);
    if (!req.file) {
        return res.status(400).json({
          message: 'Gagal Upload File! File tidak ditemukan.',
        });
      }
    const filebase64 = req.file.buffer.toString("base64");
    const file = `data:${req.file.mimetype};base64,${filebase64}`
    const carToUpdate = carListData.find(car => car.id === carIdToUpdate);

    if (!carToUpdate) {
        return res.status(404).json({ message: "Car not found" });
    }

    const { name, rentPerDay, type } = req.body;

    carToUpdate.name = name;
    carToUpdate.rentPerDay = rentPerDay;
    carToUpdate.type = type;
    carToUpdate.timeUpdate = new Date();

    cloudinary.uploader.upload(file, (err: { message: any; }, result: { url: string; }) => {
    if (err) {
        return res.status(500).json({ msg: err.message });
    }

    carToUpdate.image = result.url;

    res.status(201).redirect("/cars")
    });
}

const removeCar = (req: Request, res: Response) => {
    const getId = req.params.id;
    const index = carListData.findIndex((car) => car.id === Number(getId));
  
    if (index === -1) {
      return res.status(404).send({ message: 'Car not found' });
    }
  
    carListData.splice(index, 1);
  
    res.status(200).redirect("/cars");
  };
  

const getById = (req : Request, res: Response) => {
    const getId = req.params.id;
    const filterById = carListData.filter(({id})=> id === Number(getId) )

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