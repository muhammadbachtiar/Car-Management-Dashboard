import { type Request, type Response } from 'express'
import CarsService from '../../service/carsService'
import LogActivityService from '../../service/logActivityService'
import cloudinaryUpload from '../../utils/cloudinaryUpload'
const carsController = require('../carsControllers')

jest.mock('../../service/carsService.ts')
jest.mock('../../service/logActivityService.ts')
jest.mock('../../utils/cloudinaryUpload.ts', () => ({
  __esModule: true,
  default: jest.fn()
}))

describe('CarsController', () => {
  describe('handleGetListCars', () => {
    test('should return status 201 with data car list', async () => {
      const mockCarData = [
        { id: 1, name: 'Car1' },
        { id: 2, name: 'Car2' }
      ];
      (CarsService as jest.Mock).mockImplementationOnce(() => ({
        getListCar: jest.fn().mockResolvedValue(mockCarData)
      }))
      const mockJson = jest.fn()
      const mockStatus = jest.fn().mockReturnValue({ json: mockJson })

      const req: Partial<Request> = {}
      const res = { status: mockStatus, json: mockJson } as unknown as Response

      await carsController.getListCars(req, res)

      expect(mockStatus).toHaveBeenCalledWith(201)
      console.log('Received response:', mockJson.mock.calls[0][0])
      expect(res.json).toHaveBeenCalledWith({
        message: 'Success Get Cars Data',
        data: mockCarData
      })
    })
  })

  describe('handlegetCarsById', () => {
    test('should return status 201 with car data by ID', async () => {
      // Mock implementation for CarsService
      const mockCarData = { id: 1, name: 'Car1' };
      (CarsService as jest.Mock).mockImplementationOnce(() => ({
        getCarbyId: jest.fn().mockResolvedValue(mockCarData)
      }))

      const req: Partial<Request> = { params: { id: '1' } }
      const mockJson = jest.fn()
      const mockStatus = jest.fn().mockReturnValue({ json: mockJson })
      const res = { status: mockStatus, json: mockJson } as unknown as Response

      await carsController.getCarsById(req as Request, res)

      expect(mockStatus).toHaveBeenCalledWith(201)
      expect(mockJson).toHaveBeenCalledWith({
        message: 'Success Get Car Data by ID',
        data: mockCarData
      })
    })

    test('should return status 400 when no car data found by ID', async () => {
      (CarsService as jest.Mock).mockImplementationOnce(() => ({
        getCarbyId: jest.fn().mockResolvedValue(null)
      }))

      const req: Partial<Request> = { params: { id: '1' } }
      const mockJson = jest.fn()
      const mockStatus = jest.fn().mockReturnValue({ json: mockJson })
      const res = { status: mockStatus, json: mockJson } as unknown as Response

      await carsController.getCarsById(req as Request, res)

      expect(mockStatus).toHaveBeenCalledWith(400)
      expect(mockJson).toHaveBeenCalledWith({
        message: 'No Data Car Found'
      })
    })
  })

  describe('handlePostCar', () => {
    const mockedFile: any = {
      fieldname: 'image',
      originalname: 'qr-code.png',
      encoding: '7bit',
      mimetype: 'image/png',
      buffer: Buffer.from('mocked-image-data'),
      size: 8027
    }

    const mockedCarData = {
      name: 'Car Name',
      rentPerDay: 100000,
      type: 'Sedan',
      capacity: 4,
      description: 'Sample description',
      year: '2023',
      available_at: new Date(),
      transmission: 'Manual',
      isWithDriver: true
    }

    const req: Partial<Request & { user?: any }> = {
      file: mockedFile,
      body: mockedCarData,
      user: { id: 1, username: 'user1' }
    }

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    beforeEach(() => {
      jest.clearAllMocks()
    })

    test('should post car successfully', async () => {
      (cloudinaryUpload as jest.Mock).mockResolvedValueOnce({ url: 'https://example.com/mock-image.png' });

      (CarsService as jest.Mock).mockImplementationOnce(() => ({
        postCar: jest.fn().mockResolvedValue(mockedCarData)
      }));

      (LogActivityService as jest.Mock).mockImplementationOnce(() => ({
        postLogActivity: jest.fn().mockResolvedValue('Log inserted')
      }))
      await carsController.postCar(req as Request, res as Response)
      expect(res.status).toHaveBeenCalledWith(201)
      expect(res.json).toHaveBeenCalledWith({
        message: 'Success Post Car Data',
        newDataCar: mockedCarData,
        logInsert: 'Log inserted'
      })
    })
    test('should handle error during car posting', async () => {
      (cloudinaryUpload as jest.Mock).mockResolvedValueOnce({ url: 'https://example.com/mock-image.png' });
      (CarsService as jest.Mock).mockImplementationOnce(() => ({
        postCar: jest.fn().mockRejectedValue(new Error('Database error'))
      }))

      await carsController.postCar(req as Request, res as Response)
      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalledWith({ msg: 'Database error' })
    })
    test('should return 400 when file is not provided', async () => {
      delete req.file
      await carsController.postCar(req as Request, res as Response)
      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({
        message: 'Gagal Upload File! File tidak ditemukan.'
      })
    })
  })
  describe('handlePutCar', () => {
    let req: Partial<Request & { user?: any }>
    let res: Partial<Response>
    const mockedFile: any = {
      fieldname: 'image',
      originalname: 'qr-code.png',
      encoding: '7bit',
      mimetype: 'image/png',
      buffer: Buffer.from('mocked-image-data'),
      size: 8027
    }
    const mockCarData: any = {
      id: 1,
      name: 'UpdatedCarName',
      rentPerDay: 100000,
      type: 'Sedan',
      capacity: 4,
      description: 'Sample description',
      year: '2023',
      available_at: new Date(),
      transmission: 'Manual',
      isWithDriver: true
    }

    beforeEach(() => {
      jest.clearAllMocks()

      req = {
        params: { id: '1' },
        body: mockCarData,
        user: { id: 1, username: 'user1' },
        file: mockedFile
      }

      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      }
    })
    test('should send error message car not found', async () => {
      (CarsService as jest.Mock).mockImplementationOnce(() => ({
        getCarbyId: jest.fn().mockResolvedValue(null)
      }))

      await carsController.putCar(req as Request, res as Response)

      expect(res.status).toHaveBeenCalledWith(404)
      expect(res.json).toHaveBeenCalledWith({
        message: 'Car not found'
      })
    })
    test('should update car successfully', async () => {
      (cloudinaryUpload as jest.Mock).mockResolvedValueOnce({ url: 'https://example.com/mock-image.png' });

      (CarsService as jest.Mock).mockImplementationOnce(() => ({
        getCarbyId: jest.fn().mockResolvedValue({ id: 1, name: 'CarName' })
      }));

      (CarsService as jest.Mock).mockImplementationOnce(() => ({
        putCar: jest.fn().mockResolvedValue([mockCarData])
      }));

      (LogActivityService as jest.Mock).mockImplementationOnce(() => ({
        postLogActivity: jest.fn().mockResolvedValue('Log Updated')
      }))

      await carsController.putCar(req as Request, res as Response)

      expect(res.status).toHaveBeenCalledWith(201)
      expect(res.json).toHaveBeenCalledWith({
        message: 'Success Update Car Data',
        updatedCarData: [mockCarData],
        logInsert: 'Log Updated'
      })
    })
    test('should handle error during car posting', async () => {
      (cloudinaryUpload as jest.Mock).mockResolvedValueOnce({ url: 'https://example.com/mock-image.png' });
      (CarsService as jest.Mock).mockImplementationOnce(() => ({
        getCarbyId: jest.fn().mockResolvedValue({ id: 1, name: 'CarName' })
      }));
      (CarsService as jest.Mock).mockImplementationOnce(() => ({
        putCar: jest.fn().mockRejectedValue(new Error('Database error'))
      }))

      await carsController.putCar(req as Request, res as Response)
      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalledWith({ msg: 'Database error' })
    })
    describe('handleDeleteCar', () => {
      let req: any
      let res: any

      beforeEach(() => {
        jest.clearAllMocks()

        req = {
          params: { id: '1' },
          user: { id: 1, username: 'user1' }
        }

        res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn()
        }
      })

      test('should delete car successfully', async () => {
        const mockedCar = { id: 1, name: 'TestCar' };

        (CarsService as jest.Mock).mockImplementationOnce(() => ({
          getCarbyId: jest.fn().mockResolvedValue(mockedCar),
          deleteCar: jest.fn().mockResolvedValue(undefined)
        }));

        (LogActivityService as jest.Mock).mockImplementationOnce(() => ({
          postLogActivity: jest.fn().mockResolvedValue('Log Deleted')
        }))

        await carsController.deleteCar(req, res)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({
          message: 'Car deleted successfully',
          logActivitiy: 'Log Deleted'
        })
      })

      test('should handle car not found', async () => {
        (CarsService as jest.Mock).mockImplementationOnce(() => ({
          getCarbyId: jest.fn().mockResolvedValue(null)
        }))

        await carsController.deleteCar(req, res)

        expect(res.status).toHaveBeenCalledWith(404)
        expect(res.json).toHaveBeenCalledWith({
          message: 'Car not found'
        })
      })
    })
  })
})
