import CarsService from '../service/carsService'
import LogActivityService from '../service/logActivityService'
import cloudinaryUpload from '../utils/cloudinaryUpload'
const express = require('express')
type Request = typeof express.Request
type Response = typeof express.Response

interface CarRequestBody {
  name: string
  rentPerDay: number
  type: string
  capacity: number
  description: string
  year: string
  available_at: Date
  transmission: string
  isWithDriver: boolean
}

/// CONTROLLER PAGE VIEW
const homePage = (req: Request, res: Response): void => {
  res.status(200).render('home', {})
}

const addCarPage = (req: Request, res: Response): void => {
  res.status(200).render('addCar', {})
}

// CONTROLLER CRUD RESPONDS JSON
const getListCars = async (req: Request, res: Response): Promise<void> => {
  const getCarsData = await new CarsService().getListCar()

  res.status(201).json({
    message: 'Success Get Cars Data',
    data: getCarsData
  })
}

const getCarsById = async (req: Request, res: Response): Promise<void> => {
  const getId = req.params.id
  const filterById = await new CarsService().getCarbyId(getId as string | number)

  if (filterById === null || filterById === undefined) {
    res.status(400).json({
      message: 'No Data Car Found'
    })
    return
  }

  res.status(201).json({
    message: 'Success Get Car Data by ID',
    data: filterById
  })
}

const postCar = async (req: Request & { user?: any }, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({
        message: 'Gagal Upload File! File tidak ditemukan.'
      })
      return
    }
    const { name, rentPerDay, type, capacity, description, year, available_at, transmission, isWithDriver } = req.body as CarRequestBody
    const cloudinaryResult: any = await cloudinaryUpload(req.file)
    const imageUrl = cloudinaryResult.url
    const newPostedCar = await new CarsService().postCar(name, rentPerDay, type, imageUrl as string, capacity, description, year, available_at, transmission, isWithDriver)
    const logActivities = await new LogActivityService().postLogActivity('INSERT', req.user.id as number, newPostedCar.id as number, req.user.username as string, newPostedCar.name as string)

    res.status(201).json({
      message: 'Success Post Car Data',
      newDataCar: newPostedCar,
      logInsert: logActivities
    })
  } catch (error: any) {
    console.log(error.message)
    res.status(500).json({ msg: error.message })
  }
}

const putCar = async (req: Request & { user?: any }, res: Response): Promise<void> => {
  const carIdToUpdate = Number(req.params.id)
  try {
    const carToUpdate = await new CarsService().getCarbyId(carIdToUpdate)
    console.log(carToUpdate)
    const { name, rentPerDay, type, capacity, description, year, available_at, transmission, isWithDriver } = req.body as CarRequestBody
    if (carToUpdate === null || carToUpdate === undefined) {
      res.status(404).json({ message: 'Car not found' })
      return
    }
    const imageUrl = !req.file ? carToUpdate.image_url : (await cloudinaryUpload(req.file) as unknown as { url: string }).url
    const updatedCarData = await new CarsService().putCar(carIdToUpdate, name, rentPerDay, type, imageUrl as string, capacity, description, year, available_at, transmission, isWithDriver as boolean)
    const logActivities = await new LogActivityService().postLogActivity('UPDATE', req.user.id as number, carIdToUpdate, req.user.username as string, updatedCarData[0].name as string)
    res.status(201).json({
      message: 'Success Update Car Data',
      updatedCarData,
      logInsert: logActivities
    })
  } catch (error: any) {
    console.log(error.message)
    res.status(500).json({ msg: error.message })
  }
}

const deleteCar = async (req: Request & { user?: any }, res: Response): Promise<void> => {
  try {
    const carId = req.params.id
    const carToDelete = await new CarsService().getCarbyId(carId as string | number)
    console.log(carToDelete)

    if (!carToDelete) {
      res.status(404).json({ message: 'Car not found' })
      return
    }

    await new CarsService().deleteCar(carId as string | number)
    const logActivities = await new LogActivityService().postLogActivity('DELETE', req.user.id as number, carToDelete.id as number, req.user.username as string, carToDelete.name as string)

    res.status(200).json({
      message: 'Car deleted successfully',
      logActivitiy: logActivities
    })
  } catch (error: any) {
    console.log(error.message)
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  getListCars,
  getCarsById,
  postCar,
  putCar,
  deleteCar,
  homePage,
  addCarPage
}
