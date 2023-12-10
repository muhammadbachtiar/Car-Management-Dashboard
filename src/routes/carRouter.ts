const express = require("express");
const router  = express.Router();
const carController = require("./../controllers/carsControllers");
const uploadOnMemory = require("../middleware/multer");
const middlewareAuthorizeCar = require("../middleware/authorize")

//API VIEW PAGE
router.get("/", carController.homePage);
router.get("/addCar", carController.addCarPage);

//API CRUD RESPONDS JSON
router.get("/api/v1/cars", carController.getListCars);
router.get("/api/v1/cars/:id", middlewareAuthorizeCar.isAdminOrSuperAdmin ,carController.getCarsById);
router.post("/api/v1/cars",  [uploadOnMemory.single('image'), middlewareAuthorizeCar.isAdminOrSuperAdmin], carController.postCar);
router.put("/api/v1/cars/:id", [uploadOnMemory.single('image'), middlewareAuthorizeCar.isAdminOrSuperAdmin], carController.putCar);
router.delete("/api/v1/cars/:id", middlewareAuthorizeCar.isAdminOrSuperAdmin, carController.deleteCar);



module.exports = router;