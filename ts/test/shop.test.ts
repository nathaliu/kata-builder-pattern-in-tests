
import { test, expect } from "@jest/globals"

import Address from '../address'
import Shop from '../shop'
import User from '../user'

const fsfAddress = new Address("51 Franklin Street", "Fifth Floor", "Boston", "02110", "USA")
const parisAddress = new Address("33 quai d'Orsay", "", "Paris", "75007", "France")

class UserBuilder {
  private name: string = "Bob";
  private email: string = "bob@domain.tld";
  private age: number = 19;
  private verified: boolean = true;
  private address: Address = fsfAddress;

  minor(): UserBuilder {
    this.age = 16;
    return this;
  }

  unverified(): UserBuilder {
    this.verified = false;
    return this;
  }

  foreigner(): UserBuilder {
    this.address = parisAddress;
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
  const user = new UserBuilder().build();

  expect(Shop.canOrder(user)).toBe(true)
  expect(Shop.mustPayForeignFee(user)).toBe(false)
})

test('minor users cannot order from the shop', () => {
  const user = new UserBuilder()
    .minor()
    .build();

  expect(Shop.canOrder(user)).toBe(false)
})

test('must be a verified user to order from the shop', () => {
  const user = new UserBuilder()
    .unverified()
    .build();

  expect(Shop.canOrder(user)).toBe(false);
})

test('foreigners must pay foreign fee', () => {
  const user = new UserBuilder()
    .foreigner()
    .build();

  expect(Shop.mustPayForeignFee(user)).toBe(true)
})

