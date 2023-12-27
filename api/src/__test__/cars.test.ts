import CarsService from '../service/carsService'
import createToken from '../utils/createToken'
import LogActivityService from '../service/logActivityService'
const request = require('supertest')
const appRoute = require('../../index')
const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, '../../public/assets/image/loginSideImage.png')
const fileBuffer = fs.readFileSync(filePath)

jest.mock('../service/carsService.ts')
jest.mock('../service/logActivityService.ts')
const token = createToken({
  id: 1,
  email: 'superadmin@gmail.com',
  role: 'superadmin'
})

const reqBody = {
  name: 'Toyota Camry',
  rentPerDay: 100000,
  type: 'Sedan',
  capacity: 5,
  description: 'Spacious and comfortable sedan.',
  year: '2022',
  available_at: '2023-11-27',
  transmission: 'Automatic',
  isWithDriver: true
}

describe('GET /api/v1/cars', () => {
  it('should return list of cars with status 201', async () => {
    const mockGetListCar = jest.fn().mockResolvedValue([{ id: 1, name: 'Car A' }, { id: 2, name: 'Car B' }])
    CarsService.prototype.getListCar = mockGetListCar

    const response = await request(appRoute).get('/api/v1/cars')

    expect(response.status).toBe(201)

    expect(response.body).toEqual({
      message: 'Success Get Cars Data',
      data: [{ id: 1, name: 'Car A' }, { id: 2, name: 'Car B' }]
    })
  })
})

describe('GET /api/v1/cars/:id', () => {
  it('should return car by id with status 201 if found', async () => {
    jest.spyOn(CarsService.prototype, 'getCarbyId').mockResolvedValue({ id: 1, name: 'Car A' })

    const response = await request(appRoute)
      .get('/api/v1/cars/1')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(201)
    expect(response.body).toEqual({
      message: 'Success Get Car Data by ID',
      data: { id: 1, name: 'Car A' }
    })
  })

  it('should return 400 with message "No Data Car Found" if car is not found', async () => {
    jest.spyOn(CarsService.prototype, 'getCarbyId').mockResolvedValue(null)

    const response = await request(appRoute)
      .get('/api/v1/cars/999')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      message: 'No Data Car Found'
    })
  })
})

describe('POST /api/v1/cars', () => {
  it('should post car successfully', async () => {
    jest.spyOn(LogActivityService.prototype, 'postLogActivity').mockResolvedValue('log Post')
    jest.spyOn(CarsService.prototype, 'postCar').mockResolvedValue({ id: 1, name: 'Toyota Camry' })

    const response = await request(appRoute)
      .post('/api/v1/cars')
      .set('Authorization', `Bearer ${token}`)
      .field('name', reqBody.name)
      .field('rentPerDay', reqBody.rentPerDay)
      .field('type', reqBody.type)
      .field('capacity', reqBody.capacity)
      .field('description', reqBody.description)
      .field('year', reqBody.year)
      .field('available_at', reqBody.available_at)
      .field('transmission', reqBody.transmission)
      .field('isWithDriver', reqBody.isWithDriver)
      .attach('image', fileBuffer, 'testGambar')

    expect(response.status).toBe(201)
    expect(response.body).toEqual({
      message: 'Success Post Car Data',
      newDataCar: { id: 1, name: 'Toyota Camry' },
      logInsert: 'log Post'
    })
  }, 10000)

  it('should send error about file car', async () => {
    jest.spyOn(LogActivityService.prototype, 'postLogActivity').mockResolvedValue('log Post')
    jest.spyOn(CarsService.prototype, 'postCar').mockResolvedValue({ id: 1, name: 'Toyota Camry' })

    const response = await request(appRoute)
      .post('/api/v1/cars')
      .set('Authorization', `Bearer ${token}`)
      .field('name', reqBody.name)
      .field('rentPerDay', reqBody.rentPerDay)
      .field('type', reqBody.type)
      .field('capacity', reqBody.capacity)
      .field('description', reqBody.description)
      .field('year', reqBody.year)
      .field('available_at', reqBody.available_at)
      .field('transmission', reqBody.transmission)
      .field('isWithDriver', reqBody.isWithDriver)

    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      message: 'Gagal Upload File! File tidak ditemukan.'
    })
  })

  it('should send error message', async () => {
    jest.spyOn(LogActivityService.prototype, 'postLogActivity').mockRejectedValue(new Error('Database Error'))
    jest.spyOn(CarsService.prototype, 'postCar').mockResolvedValue({ id: 1, name: 'Toyota Camry' })

    const response = await request(appRoute)
      .post('/api/v1/cars')
      .set('Authorization', `Bearer ${token}`)
      .field('name', reqBody.name)
      .field('rentPerDay', reqBody.rentPerDay)
      .field('type', reqBody.type)
      .field('capacity', reqBody.capacity)
      .field('description', reqBody.description)
      .field('year', reqBody.year)
      .field('available_at', reqBody.available_at)
      .field('transmission', reqBody.transmission)
      .field('isWithDriver', reqBody.isWithDriver)
      .attach('image', fileBuffer, 'testGambar')

    expect(response.status).toBe(500)
    expect(response.body).toEqual({
      msg: 'Database Error'
    })
  })
})

describe('PUT /api/v1/cars/:id', () => {
  it('should put car successfully', async () => {
    jest.spyOn(CarsService.prototype, 'getCarbyId').mockResolvedValue({ id: 1, name: 'Car A' })
    jest.spyOn(LogActivityService.prototype, 'postLogActivity').mockResolvedValue('log Update')
    jest.spyOn(CarsService.prototype, 'putCar').mockResolvedValue([{ id: 1, name: 'Toyota Camry' }])

    const response = await request(appRoute)
      .put('/api/v1/cars/1')
      .set('Authorization', `Bearer ${token}`)
      .field('name', reqBody.name)
      .field('rentPerDay', reqBody.rentPerDay)
      .field('type', reqBody.type)
      .field('capacity', reqBody.capacity)
      .field('description', reqBody.description)
      .field('year', reqBody.year)
      .field('available_at', reqBody.available_at)
      .field('transmission', reqBody.transmission)
      .field('isWithDriver', reqBody.isWithDriver)

    expect(response.status).toBe(201)
    expect(response.body.message).toBe('Success Update Car Data')
  }, 5000)

  it('should show not found error', async () => {
    jest.spyOn(CarsService.prototype, 'getCarbyId').mockResolvedValue(null)
    jest.spyOn(LogActivityService.prototype, 'postLogActivity').mockResolvedValue('log Update')
    jest.spyOn(CarsService.prototype, 'putCar').mockResolvedValue([{ id: 1, name: 'Toyota Camry' }])

    const response = await request(appRoute)
      .put('/api/v1/cars/1')
      .set('Authorization', `Bearer ${token}`)
      .field('name', reqBody.name)
      .field('rentPerDay', reqBody.rentPerDay)
      .field('type', reqBody.type)
      .field('capacity', reqBody.capacity)
      .field('description', reqBody.description)
      .field('year', reqBody.year)
      .field('available_at', reqBody.available_at)
      .field('transmission', reqBody.transmission)
      .field('isWithDriver', reqBody.isWithDriver)

    expect(response.status).toBe(404)
    expect(response.body.message).toBe('Car not found')
  })
  it('should show not found error', async () => {
    jest.spyOn(CarsService.prototype, 'getCarbyId').mockRejectedValue(new Error('Database Error'))
    jest.spyOn(LogActivityService.prototype, 'postLogActivity').mockResolvedValue('log Update')
    jest.spyOn(CarsService.prototype, 'putCar').mockResolvedValue([{ id: 1, name: 'Toyota Camry' }])

    const response = await request(appRoute)
      .put('/api/v1/cars/1')
      .set('Authorization', `Bearer ${token}`)
      .field('name', reqBody.name)
      .field('rentPerDay', reqBody.rentPerDay)
      .field('type', reqBody.type)
      .field('capacity', reqBody.capacity)
      .field('description', reqBody.description)
      .field('year', reqBody.year)
      .field('available_at', reqBody.available_at)
      .field('transmission', reqBody.transmission)
      .field('isWithDriver', reqBody.isWithDriver)

    expect(response.status).toBe(500)
    expect(response.body.msg).toBe('Database Error')
  })
})

describe('DELETE /api/v1/cars/:id', () => {
  it('should Delete car successfully', async () => {
    jest.spyOn(CarsService.prototype, 'getCarbyId').mockResolvedValue({ id: 1, name: 'Car A' })
    const response = await request(appRoute)
      .delete('/api/v1/cars/1')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Car deleted successfully')
  }, 5000)

  it('should send error car not found', async () => {
    jest.spyOn(CarsService.prototype, 'getCarbyId').mockResolvedValue(undefined)
    const response = await request(appRoute)
      .delete('/api/v1/cars/10')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(404)
    expect(response.body.message).toBe('Car not found')
  })
  it('should send error', async () => {
    jest.spyOn(CarsService.prototype, 'getCarbyId').mockRejectedValue(new Error('Database Error'))
    const response = await request(appRoute)
      .delete('/api/v1/cars/10')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(500)
    expect(response.body.message).toBe('Database Error')
  })
})
