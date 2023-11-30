import { Entity } from './bases/entity.model.js'

export class Order extends Entity {
  products = []

  constructor(orderNumber, buyer, seller, products = [], status = 'Pendiente', messages = [], isReviewed = false, createdAt) {
    super(createdAt)
    this.orderNumber = orderNumber
    this.buyer = buyer
    this.seller = seller
    for (const product of products) this.addProduct(product)
    this.status = status
    this.messages = messages
    this.isReviewed = isReviewed
  }

  addProduct(product, amount = 1) {
    const current = this.products.find(({ product: { id } }) => id === product.id)
    if (current) current.amount += amount
    else this.products.push({ amount, product })
  }

  removeProduct(product, removeAll = false) {
    const i = this.products.findIndex(({ product: { id } }) => id === product.id)
    if (!(i + 1)) return
    const current = this.products[i]
    current.amount--
    if (!current.amount || removeAll) this.products.splice(i, 1)
  }
}
