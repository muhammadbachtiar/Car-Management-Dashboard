
import UserRepository from "../repositories/usersRepositories";

class UserService {
    #userRepository: UserRepository;
    
    constructor(){
        this.#userRepository = new UserRepository();
    }
    
    async login(email: string) {
        const userLogin =  this.#userRepository.login(email);
        return userLogin;
    }

    async register(email:string, password:string, name:string){
        const registeredUser = this.#userRepository.register(email, password, name);
        
        return registeredUser;
    }

    async findById(id: number) {
        const userLogin =  this.#userRepository.findById(id);
        return userLogin;
    }

    async memberToAdmin(id: number) {
        const userUpdated =  this.#userRepository.memberToAdmin(id);
        return userUpdated;
    }
  }
  
  export default UserService;