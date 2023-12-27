const bcrypt = require('bcrypt')

async function encryptPassword (password: string): Promise<string> {
  return await new Promise((resolve, reject) => {
    try {
      const hashedPassword = bcrypt.hashSync(password, 10)
      resolve(hashedPassword as string)
    } catch (error) {
      reject(error)
    }
  })
}

export default encryptPassword
