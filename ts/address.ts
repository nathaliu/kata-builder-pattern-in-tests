export default class Address {
  line1: string
  line2: string
  city: string
  zipCode: string
  country: string

  constructor(line1: string, line2: string, city: string, zipCode: string, country: string) {
    if (typeof line1 !== 'string') {
      throw new Error('La ligne 1 doit être une chaîne de caractères')
    }
    if (typeof line2 !== 'string') {
      throw new Error('La ligne 2 doit être une chaîne de caractères')
    }
    if (typeof city !== 'string') {
      throw new Error('La ville doit être une chaîne de caractères')
    }
    if (typeof zipCode !== 'string') {
      throw new Error('Le code postal doit être une chaîne de caractères')
    }
    if (typeof country !== 'string') {
      throw new Error('Le pays doit être une chaîne de caractères')
    }

    if (line1.trim() === '') {
      throw new Error('La ligne 1 ne peut pas être vide')
    }
    if (city.trim() === '') {
      throw new Error('La ville ne peut pas être vide')
    }
    if (zipCode.trim() === '') {
      throw new Error('Le code postal ne peut pas être vide')
    }
    if (country.trim() === '') {
      throw new Error('Le pays ne peut pas être vide')
    }

    this.line1 = line1
    this.line2 = line2
    this.city = city 
    this.zipCode = zipCode
    this.country = country
  }
}
