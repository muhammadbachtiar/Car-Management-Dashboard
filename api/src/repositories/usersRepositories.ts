import { UserModel } from '../models/Users'

class UserRepository {
  async login (email: string): Promise<any> {
    const userLogin = await UserModel.query()
      .findOne({
        email
      })

    return userLogin
  }

  async register (email: string, password: string, name: string): Promise<any> {
    const currentDate = new Date()
    const registeredUser = await UserModel.query()
      .insert({
        username: name,
        email,
        password,
        role: 'member',
        is_active: true,
        created_at: currentDate,
        updated_at: currentDate
      })
      .returning('*')

    return registeredUser
  }

  async findById (id: number | string): Promise<any> {
    const user = await UserModel.query()
      .findOne({
        id
      }).returning('*')

    return user
  }

  async memberToAdmin (id: number | string): Promise<any> {
    const updatedUser = await UserModel.query().patch({ role: 'admin' }).where('id', id).returning('*')

    return updatedUser
  }
}

export default UserRepository
