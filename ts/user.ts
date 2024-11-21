import Address from "./address"

export default class User {
  name: string
  email: string
  age: number
  verified: boolean
  address: Address

  constructor({ name, email, age, verified, address }: { name: string, email: string, age: number, verified: boolean, address: Address }) {
    if (typeof name !== 'string') {
      throw new Error('Le nom doit être une chaîne de caractères')
    }
    if (typeof email !== 'string') {
      throw new Error("L'email doit être une chaîne de caractères") 
    }

    this.name = name
    this.email = email
    this.age = age
    this.verified = verified
    this.address = address
  }
}
