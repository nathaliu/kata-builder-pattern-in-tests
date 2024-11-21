// Import des dépendances nécessaires
import { test, expect } from "@jest/globals"

import Address from '../address'
import Shop from '../shop'
import User from '../user'

// Définition des adresses de test
const fsfAddress = new Address("51 Franklin Street", "Fifth Floor", "Boston", "02110", "USA")
const parisAddress = new Address("33 quai d'Orsay", "", "Paris", "75007", "France")

/**
 * Classe Builder pour faciliter la création d'instances User dans les tests
 * Utilise le pattern Builder pour une construction fluide des objets User
 */
class UserBuilder {
  private name: string = "Bob";
  private email: string = "bob@domain.tld";
  private age: number = 18;
  private verified: boolean = true;
  private address: Address = new Address("", "", "", "", "USA");

  // Méthodes de configuration des propriétés
  withName(name: string): UserBuilder {
    this.name = name;
    return this;
  }!

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

  // Création de l'instance User finale
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

// Test du cas nominal avec un utilisateur valide des USA
test('happy path', () => {
  const user = new UserBuilder().build();

  expect(Shop.canOrder(user)).toBe(true)
  expect(Shop.mustPayForeignFee(user)).toBe(false)
})

// Test de la restriction d'âge
test('minor users cannot order from the shop', () => {
  const user = new UserBuilder()
    .withAge(16)
    .build();

  expect(Shop.canOrder(user)).toBe(false)
})

// Test de la vérification du compte utilisateur
test('must be a verified user to order from the shop', () => {
  const user = new UserBuilder()
    .withVerificationStatus(false)
    .build();

  expect(Shop.canOrder(user)).toBe(false);
})

// Test des frais supplémentaires pour les commandes internationales
test('foreigners must pay foreign fee', () => {
  const user = new UserBuilder()
    .withAddress(parisAddress)
    .build();

  expect(Shop.mustPayForeignFee(user)).toBe(true)
})

// Test du cas d'erreur avec des champs obligatoires manquants
test('sad path', () => {
  const user = new UserBuilder()
    .withAge(16)
    .withVerificationStatus(false)
    .withAddress(parisAddress)
    .build();

  expect(Shop.canOrder(user)).toBe(false)
})
