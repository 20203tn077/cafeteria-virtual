import { Entity } from './bases/entity.model.js'

export class Product extends Entity {
  constructor(title, description, price, amount, picture, seller, reviews = []) {
    super()
    this.title = title
    this.description = description
    this.price = price
    this.amount = amount
    this.picture = picture
    this.seller = seller
    this.reviews = reviews
  }
}
