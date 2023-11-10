const express = require("express");
const router  = express.Router();
const carController = require("./../controllers/carsControllers");
const uploadOnMemory = require("../middleware/multer");

router.post("/api/v1/carimage/picture/cloudinary", uploadOnMemory.single('picture'), carController.uploadImage);

router.get("/api/v1/cars", carController.getListCars);
router.get("/api/v1/cars/:id", carController.getCarsById);
router.post("/api/v1/cars",  uploadOnMemory.single('image'), carController.postCar);
router.put("/api/v1/cars/:id", uploadOnMemory.single('image'), carController.putCar);
router.delete("/api/v1/cars/:id", carController.deleteCar);


router.get("/", carController.homePage);

router.get("/cars", carController.listCar);
router.get("/cars/:id",carController.getById);
router.post("/cars", uploadOnMemory.single('image'),carController.createCar);
router.put("/cars/:id", uploadOnMemory.single('image'), carController.updateCar);
router.delete("/cars/:id", carController.removeCar);

router.get("/addCar", carController.addCarPage);

module.exports = router;