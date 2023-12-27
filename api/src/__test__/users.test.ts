import UserService from '../service/usersService'
import checkPassword from '../utils/checkPassword'
import createToken from '../utils/createToken'

jest.mock('../service/usersService.ts')
jest.mock('../utils/checkPassword.ts')

const request = require('supertest')
const appRoute = require('../../index')
const token = createToken({
  id: 1,
  email: 'superadmin@gmail.com',
  role: 'superadmin'
})
const mockUserLogin = {
  id: 1,
  email: 'superadmin@gmail.com',
  token,
  role: 'superadmin',
  created_at: '',
  updated_at: ''
}

describe('POST /api/v1/login', () => {
  it('should return user login with status 201', async () => {
    const mockGetUserLogin = jest.fn().mockResolvedValue({ mockUserLogin })
    UserService.prototype.login = mockGetUserLogin;
    (checkPassword as jest.Mock).mockResolvedValueOnce(true)

    const response = await request(appRoute)
      .post('/api/v1/login')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send({ email: 'superadmin@gmail.com', password: 'superadmin123321' })

    expect(response.status).toBe(201)
  })

  it('should return email not found with status 404', async () => {
    const mockGetUserLogin = jest.fn().mockResolvedValue(null)
    UserService.prototype.login = mockGetUserLogin

    const response = await request(appRoute)
      .post('/api/v1/login')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send({ email: 'superadmin@gmail.com', password: 'superadmin123321' })

    expect(response.status).toBe(404)
    expect(response.body).toEqual({ message: 'Email tidak ditemukan' })
  })

  it('should return wrong password with status 401', async () => {
    const mockGetUserLogin = jest.fn().mockResolvedValue({ mockUserLogin })
    UserService.prototype.login = mockGetUserLogin;
    (checkPassword as jest.Mock).mockResolvedValueOnce(false)

    const response = await request(appRoute)
      .post('/api/v1/login')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send({ email: 'superadmin@gmail.com', password: 'superadmin123321' })

    expect(response.status).toBe(401)

    expect(response.body).toEqual({ message: 'Password salah!' })
  })
})

describe('POST /api/v1/register', () => {
  it('should return register succsess with status 201', async () => {
    const mockGetUserLogin = jest.fn().mockResolvedValue({ mockUserLogin })
    UserService.prototype.register = mockGetUserLogin;
    (checkPassword as jest.Mock).mockResolvedValueOnce(true)

    const response = await request(appRoute)
      .post('/api/v1/register')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send({ email: 'superadmin@gmail.com', password: 'superadmin123321', name: 'superadmin' })

    expect(response.status).toBe(201)
    expect(response.body).toEqual({
      message: 'Registered Success',
      id: { mockUserLogin }

    })
  })
})

describe('GET /api/v1/userProfile', () => {
  it('should return data user  with status 200', async () => {
    const mockGetUserLogin = jest.fn().mockResolvedValue({ mockUserLogin })
    UserService.prototype.findById = mockGetUserLogin

    const response = await request(appRoute)
      .get('/api/v1/userProfile')
      .set('Authorization', `Bearer ${token}`,
        'Content-Type', 'application/x-www-form-urlencoded')

    expect(response.status).toBe(200)
    expect(response.body).toEqual({ mockUserLogin })
  })
})

describe('POST /api/v1/changeToAdmin/:id', () => {
  it('should change user to admin with status 200', async () => {
    const mockGetUserLogin = jest.fn().mockResolvedValueOnce(mockUserLogin)
    const mockGetUserToUpdate = jest.fn().mockResolvedValueOnce({
      id: 2,
      email: 'anggota@gmail.com',
      role: 'member'
    })
    UserService.prototype.findById = mockGetUserLogin;
    (UserService.prototype.findById as jest.MockedFunction<typeof UserService.prototype.findById>).mockImplementationOnce(mockGetUserToUpdate)
    jest.spyOn(UserService.prototype, 'memberToAdmin').mockResolvedValue({
      id: 2,
      email: 'anggota@gmail.com',
      role: 'admin'
    })

    const response = await request(appRoute)
      .post('/api/v1/changeToAdmin/2')
      .set('Authorization', `Bearer ${token}`,
        'Content-Type', 'application/x-www-form-urlencoded')

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      message: 'Change to Admin Success',
      userInfo: {
        id: 2,
        email: 'anggota@gmail.com',
        role: 'admin'
      }
    })
  })

  it('should send error user not found with status 404', async () => {
    const mockGetUserLogin = jest.fn().mockResolvedValueOnce(mockUserLogin)
    const mockGetUserToUpdate = jest.fn().mockResolvedValueOnce(null)
    UserService.prototype.findById = mockGetUserLogin;
    (UserService.prototype.findById as jest.MockedFunction<typeof UserService.prototype.findById>).mockImplementationOnce(mockGetUserToUpdate)

    const response = await request(appRoute)
      .post('/api/v1/changeToAdmin/2')
      .set('Authorization', `Bearer ${token}`,
        'Content-Type', 'application/x-www-form-urlencoded')

    expect(response.status).toBe(404)
    expect(response.body).toEqual({ message: 'User not found' })
  })

  it('should send error user already admin with status 402', async () => {
    const mockGetUserLogin = jest.fn().mockResolvedValueOnce(mockUserLogin)
    const mockGetUserToUpdate = jest.fn().mockResolvedValueOnce({
      id: 2,
      email: 'anggota@gmail.com',
      role: 'admin'
    })
    UserService.prototype.findById = mockGetUserLogin;
    (UserService.prototype.findById as jest.MockedFunction<typeof UserService.prototype.findById>).mockImplementationOnce(mockGetUserToUpdate)

    const response = await request(appRoute)
      .post('/api/v1/changeToAdmin/2')
      .set('Authorization', `Bearer ${token}`,
        'Content-Type', 'application/x-www-form-urlencoded')

    expect(response.status).toBe(402)
    expect(response.body).toEqual({
      message: 'User is already Admin',
      userInfo: {
        id: 2,
        email: 'anggota@gmail.com',
        role: 'admin'
      }
    })
  })

  it('should send error user already superadmin with status 403', async () => {
    const mockGetUserLogin = jest.fn().mockResolvedValueOnce(mockUserLogin)
    const mockGetUserToUpdate = jest.fn().mockResolvedValueOnce({
      id: 2,
      email: 'anggota@gmail.com',
      role: 'superadmin'
    })
    UserService.prototype.findById = mockGetUserLogin;
    (UserService.prototype.findById as jest.MockedFunction<typeof UserService.prototype.findById>).mockImplementationOnce(mockGetUserToUpdate)

    const response = await request(appRoute)
      .post('/api/v1/changeToAdmin/2')
      .set('Authorization', `Bearer ${token}`,
        'Content-Type', 'application/x-www-form-urlencoded')

    expect(response.status).toBe(403)
    expect(response.body).toEqual({ message: 'User is Superadmin, cannot change to Admin' })
  })
  it('should send error with status 500', async () => {
    const mockGetUserLogin = jest.fn().mockResolvedValueOnce(mockUserLogin)
    const mockGetUserToUpdate = jest.fn().mockRejectedValue(new Error('Database Error'))
    UserService.prototype.findById = mockGetUserLogin;
    (UserService.prototype.findById as jest.MockedFunction<typeof UserService.prototype.findById>).mockImplementationOnce(mockGetUserToUpdate)

    const response = await request(appRoute)
      .post('/api/v1/changeToAdmin/2')
      .set('Authorization', `Bearer ${token}`,
        'Content-Type', 'application/x-www-form-urlencoded')

    expect(response.status).toBe(500)
    expect(response.body).toEqual({ message: 'Internal Server Error' })
  })
})
