import UserService from '../service/usersService'
import checkPassword from '../utils/checkPassword'
import createToken from '../utils/createToken'
import encryptPassword from '../utils/encrtpyPassword'
const express = require('express')
type Request = typeof express.Request
type Response = typeof express.Response

const loginPage = (req: Request, res: Response): void => {
  res.status(200).render('loginPage', {})
}

const login = async (req: Request, res: Response): Promise<void> => {
  const email: string = req.body.email.toLowerCase()
  const password: string = req.body.password

  const userLogin = await new UserService().login(email)

  if (!userLogin) {
    res.status(404).json({ message: 'Email tidak ditemukan' })
    return
  }
  const isPasswordCorrect = await checkPassword(
    userLogin.password as string,
    password
  )

  if (!isPasswordCorrect) {
    res.status(401).json({ message: 'Password salah!' })
    return
  }

  const token = createToken({
    id: userLogin.id,
    email: userLogin.email,
    role: userLogin.role
  })

  res.status(201).json({
    id: userLogin.id,
    email: userLogin.email,
    token,
    createdAt: userLogin.created_at,
    updatedAt: userLogin.updated_at
  })
}

const register = async (req: Request, res: Response): Promise<void> => {
  const email: string = req.body.email.toLowerCase()
  const password: string = await encryptPassword(req.body.password as string)
  const name: string = req.body.name

  const registeredUser = await new UserService().register(email, password, name)
  res.status(201).json({
    message: 'Registered Success',
    id: registeredUser

  })
}

const getUserProfile = async (req: Request & { user?: any }, res: Response): Promise<void> => {
  res.status(200).json(req.user)
}

const memberToAdmin = async (req: Request & { user?: any }, res: Response): Promise<void> => {
  try {
    const idUserToUpdate = Number(req.params.id)
    console.log(idUserToUpdate)
    const userToUpdate = await new UserService().findById(idUserToUpdate)
    console.log(userToUpdate)

    if (!userToUpdate) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    const roleUserToUpdate = userToUpdate.role

    if (roleUserToUpdate === 'admin') {
      res.status(402).json({ message: 'User is already Admin', userInfo: userToUpdate })
      return
    }

    if (roleUserToUpdate === 'superadmin') {
      res.status(403).json({ message: 'User is Superadmin, cannot change to Admin' })
      return
    }

    const updatedUser = await new UserService().memberToAdmin(idUserToUpdate)
    res.status(200).json({
      message: 'Change to Admin Success',
      userInfo: updatedUser
    })
  } catch (error) {
    console.error('Error updating user role:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

module.exports = {
  loginPage,
  getUserProfile,
  login,
  register,
  memberToAdmin
}
