import User from "./user"

/**
 * Classe gérant les règles métier de la boutique en ligne
 */
export default class Shop {
  /**
   * Vérifie si un utilisateur peut passer une commande
   * @param user L'utilisateur à vérifier
   * @returns true si l'utilisateur peut commander, false sinon
   */
  static canOrder(user: User): boolean {
    // Vérifie que l'utilisateur est majeur
    if (user.age <= 18) {
      return false
    }

    // Vérifie que le nom et l'email sont renseignés
    if (user.name === "" || user.email === "") {
      return false
    }

    // Vérifie que le compte est vérifié
    if (!user.verified) {
      return false
    }

    return true
  }

  /**
   * Détermine si des frais supplémentaires pour l'étranger doivent être appliqués
   * @param user L'utilisateur à vérifier
   * @returns true si des frais étrangers s'appliquent, false sinon
   */
  static mustPayForeignFee(user: User): boolean {
    // Applique des frais si l'adresse n'est pas aux USA
    return user.address.country != "USA"
  }
}