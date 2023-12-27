import { type Request, type Response } from 'express'
import UserService from '../../service/usersService'
import checkPassword from '../../utils/checkPassword'
import createToken from '../../utils/createToken'
import encryptPassword from '../../utils/encrtpyPassword'
const usersControllers = require('../usersControllers')

jest.mock('../../service/usersService.ts')
jest.mock('../../utils/checkPassword.ts', () => ({
  __esModule: true,
  default: jest.fn()
}))
jest.mock('../../utils/createToken.ts')
jest.mock('../../utils/encrtpyPassword.ts')

describe('usersControllers', () => {
  describe('handleLogin', () => {
    let req: Partial<Request>
    let res: Partial<Response>
    beforeEach(() => {
      jest.clearAllMocks()

      req = {
        body: {
          email: 'test@email.com',
          password: 'hashedPassword123'
        }
      }

      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      }
    })
    const mockedUser = {
      id: 1,
      email: 'test@email.com',
      password: 'hashedPassword123',
      role: 'user',
      created_at: new Date(),
      updated_at: new Date()
    }

    test('should login successfully', async () => {
      (UserService as jest.Mock).mockImplementationOnce(() => ({
        login: jest.fn().mockResolvedValue(mockedUser)
      }));
      (checkPassword as jest.Mock).mockResolvedValueOnce(true);
      (createToken as jest.Mock).mockReturnValue('mockedToken123')

      await usersControllers.login(req, res)

      expect(res.status).toHaveBeenCalledWith(201)
      expect(res.json).toHaveBeenCalledWith({
        id: mockedUser.id,
        email: mockedUser.email,
        token: 'mockedToken123',
        createdAt: mockedUser.created_at,
        updatedAt: mockedUser.updated_at
      })
    })

    test('should handle incorrect email', async () => {
      (UserService as jest.Mock).mockImplementationOnce(() => ({
        login: jest.fn().mockResolvedValue(null)
      }))

      await usersControllers.login(req, res)

      expect(res.status).toHaveBeenCalledWith(404)
      expect(res.json).toHaveBeenCalledWith({ message: 'Email tidak ditemukan' })
    })
    test('should handle incorrect password', async () => {
      (UserService as jest.Mock).mockImplementationOnce(() => ({
        login: jest.fn().mockResolvedValue(mockedUser)
      }));

      (checkPassword as jest.Mock).mockReturnValue(false)

      await usersControllers.login(req, res)

      expect(res.status).toHaveBeenCalledWith(401)
      expect(res.json).toHaveBeenCalledWith({ message: 'Password salah!' })
    })
  })
  describe('handleGetUserProfile', () => {
    test('should return user profile', async () => {
      const mockReq: Partial<Request & { user?: any }> = {
        user: {
          id: 1,
          username: 'john_doe'
        }
      }

      const mockJsonFn = jest.fn()
      const mockRes: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: mockJsonFn
      }

      await usersControllers.getUserProfile(mockReq as Request, mockRes as Response)

      expect(mockRes.status).toHaveBeenCalledWith(200)
      expect(mockJsonFn).toHaveBeenCalledWith(mockReq.user)
    })
  })
  describe('handleRegisterUser', () => {
    it('should register a user successfully', async () => {
      // Mocking request and response objects
      const mockReq: Partial<Request> = {
        body: {
          email: 'test@email.com',
          password: 'password123',
          name: 'John Doe'
        }
      }

      const mockRes: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      }

      // Mocking the UserService register method
      const mockRegisteredUserId = 123
      const mockRegisterFn = jest.fn().mockResolvedValue(mockRegisteredUserId)
      jest.spyOn(UserService.prototype, 'register').mockImplementation(mockRegisterFn);
      (encryptPassword as jest.Mock).mockResolvedValueOnce('encryptedPassword')

      await usersControllers.register(mockReq as Request, mockRes as Response)

      expect(mockRegisterFn).toHaveBeenCalledWith('test@email.com', 'encryptedPassword', 'John Doe')
      expect(mockRes.status).toHaveBeenCalledWith(201)
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Registered Success',
        id: mockRegisteredUserId
      })
    })
  })
  describe('handleMemberToAdmin', () => {
    let mockReq: Partial<Request>
    let mockRes: Partial<Response>

    beforeEach(() => {
      mockReq = {
        params: { id: '1' } // ID yang akan diuji
      }

      mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      }
    })

    test('should change user role to Admin successfully', async () => {
      const mockUser = {
        id: 1,
        role: 'member'
      }

      const findByIdMock = jest.fn().mockResolvedValue(mockUser)
      const memberToAdminMock = jest.fn().mockResolvedValue({ ...mockUser, role: 'admin' })

      jest.spyOn(UserService.prototype, 'findById').mockImplementation(findByIdMock)
      jest.spyOn(UserService.prototype, 'memberToAdmin').mockImplementation(memberToAdminMock)

      await usersControllers.memberToAdmin(mockReq as Request, mockRes as Response)

      expect(findByIdMock).toHaveBeenCalledWith(1)
      expect(memberToAdminMock).toHaveBeenCalledWith(1)

      expect(mockRes.status).toHaveBeenCalledWith(200)
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Change to Admin Success',
        userInfo: { ...mockUser, role: 'admin' }
      })
    })
    test('should send error not found', async () => {
      const findByIdMock = jest.fn().mockResolvedValue(null)

      jest.spyOn(UserService.prototype, 'findById').mockImplementation(findByIdMock)

      await usersControllers.memberToAdmin(mockReq as Request, mockRes as Response)

      expect(mockRes.status).toHaveBeenCalledWith(404)
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'User not found'
      })
    })
    test('should send message already admin', async () => {
      const mockUser = {
        id: 1,
        role: 'admin'
      }

      const findByIdMock = jest.fn().mockResolvedValue(mockUser)

      jest.spyOn(UserService.prototype, 'findById').mockImplementation(findByIdMock)

      await usersControllers.memberToAdmin(mockReq as Request, mockRes as Response)

      expect(findByIdMock).toHaveBeenCalledWith(1)

      expect(mockRes.status).toHaveBeenCalledWith(402)
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'User is already Admin',
        userInfo: mockUser
      })
    })
    test('should send message is superadmin', async () => {
      const mockUser = {
        id: 1,
        role: 'superadmin'
      }

      const findByIdMock = jest.fn().mockResolvedValue(mockUser)

      jest.spyOn(UserService.prototype, 'findById').mockImplementation(findByIdMock)

      await usersControllers.memberToAdmin(mockReq as Request, mockRes as Response)

      expect(findByIdMock).toHaveBeenCalledWith(1)

      expect(mockRes.status).toHaveBeenCalledWith(403)
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'User is Superadmin, cannot change to Admin'
      })
    })
  })
})
