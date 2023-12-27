import jwt from 'jsonwebtoken'

interface UserPayload {
  id: number
  email: string
  role: string
}

function createToken (payLoad: UserPayload): string {
  const token = jwt.sign(payLoad, process.env.SIGNATURE_KEY ?? 'Rahasia')
  return token
}

export default createToken
