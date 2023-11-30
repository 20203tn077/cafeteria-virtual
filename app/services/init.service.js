import { orders } from '../config/orders.js'
import { products } from '../config/products.js'
import { users } from '../config/users.js'
import { OrderService } from './order.service.js'
import { ProductService } from './product.service.js'
import { UserService } from './user.service.js'

export class InitService {
  #userService = new UserService()
  #productService = new ProductService()
  #orderService = new OrderService()

  clear() {
    localStorage.clear()
  }

  addUsers() {
    for (const user of users) this.#userService.create(user)
  }

  addProducts() {
    for (const product of products) this.#productService.create(product)
  }

  addOrders() {
    for (const order of orders) this.#orderService.create(order)
  }
}
