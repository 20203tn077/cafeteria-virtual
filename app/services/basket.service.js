import { Order } from '../models/order.model.js'
import { OrderService } from './order.service.js'

export class BasketService {
  #orderService = new OrderService()

  get() {
    const data = localStorage.getItem('basket')
    return data ? Object.assign(new Order, JSON.parse(data)) : null
  }

  set(basket) {
    if (basket) localStorage.setItem('basket', JSON.stringify(basket))
    else localStorage.removeItem('basket')
  }

  finish() {
    const order = this.get()
    order.createdAt = new Date()
    this.#orderService.create(order)
    localStorage.removeItem('basket')
  }
}
