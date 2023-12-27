import UserRepository from '../repositories/usersRepositories'

class UserService {
  readonly #userRepository: UserRepository

  constructor () {
    this.#userRepository = new UserRepository()
  }

  async login (email: string): Promise<any> {
    const userLogin = this.#userRepository.login(email)
    return await userLogin
  }

  async register (email: string, password: string, name: string): Promise<any> {
    const registeredUser = this.#userRepository.register(email, password, name)

    return await registeredUser
  }

  async findById (id: number): Promise<any> {
    const userLogin = this.#userRepository.findById(id)
    return await userLogin
  }

  async memberToAdmin (id: number): Promise<any> {
    const userUpdated = this.#userRepository.memberToAdmin(id)
    return await userUpdated
  }
}

export default UserService
