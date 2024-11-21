import { test, expect } from "@jest/globals"

import Address from '../address'
import Shop from '../shop'
import User from '../user'

const fsfAddress = new Address("51 Franklin Street", "Fifth Floor", "Boston", "02110", "USA")
const parisAddress = new Address("33 quai d'Orsay", "", "Paris", "75007", "France")

class UserBuilder {
  private name: string = "Default Name";
  private email: string = "default@email.com";
  private age: number = 25;
  private verified: boolean = true;
  private address: Address = new Address("", "", "", "", "USA");

  withName(name: string): UserBuilder {
    this.name = name;
    return this;
  }

  withEmail(email: string): UserBuilder {
    this.email = email;
    return this;
  }

  withAge(age: number): UserBuilder {
    this.age = age;
    return this;
  }

  withVerificationStatus(verified: boolean): UserBuilder {
    this.verified = verified;
    return this;
  }

  withAddress(address: Address): UserBuilder {
    this.address = address;
    return this;
  }

  build(): User {
    return new User({
      name: this.name,
      email: this.email,
      age: this.age,
      verified: this.verified,
      address: this.address
    });
  }
}

test('happy path', () => {
  const user = new UserBuilder()
    .withName("Bob")
    .withEmail("bob@domain.tld")
    .withAge(25)
    .withVerificationStatus(true)
    .withAddress(fsfAddress)
    .build();

  expect(Shop.canOrder(user)).toBe(true)
  expect(Shop.mustPayForeignFee(user)).toBe(false)
})

test('minor users cannot order from the shop', () => {
  const user = new UserBuilder()
    .withName("Bob")
    .withEmail("bob@domain.tld")
    .withAge(16)
    .withAddress(fsfAddress)
    .withVerificationStatus(true)
    .build();

  expect(Shop.canOrder(user)).toBe(false)
})

test('must be a verified user to order from the shop', () => {
  const user = new UserBuilder()
    .withAge(25)
    .withVerificationStatus(false)
    .build();

  expect(Shop.canOrder(user)).toBe(false);
})

test('foreigners must pay foreign fee', () => {
  const user = new UserBuilder()
    .withAge(25)
    .withAddress(parisAddress)
    .withVerificationStatus(true)
    .build();

  expect(Shop.mustPayForeignFee(user)).toBe(true)
})

test('sad path', () => {
  const user = new UserBuilder().build();

  expect(Shop.canOrder(user)).toBe(false)
})
