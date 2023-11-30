import { Order } from '../models/order.model.js'
import { AuthService } from './auth.service.js'

export class OrderService {
  #authService = new AuthService()

  getAll() {
    const data = localStorage.getItem('orders')
    return data ? JSON.parse(data) : []
  }

  getOwn() {
    const { username, role } = this.#authService.getSession()
    return this.getAll().filter(order => (role === 'Vendedor' ? order.seller.username : order.buyer.username) === username)
  }

  getById(id) {
    const order = this.getAll().find(order => order.id === id)
    return order ? Object.assign(new Order, order) : null
  }

  setCurrent(order) {
    if (order) localStorage.setItem('currOrder', JSON.stringify(order))
    else localStorage.removeItem('currOrder')
  }

  getCurrent() {
    const data = localStorage.getItem('currOrder')
    return data ? Object.assign(new Order, JSON.parse(data)) : null
  }

  update(order) {
    const orders = this.getAll()
    const i = orders.findIndex(({id}) => id === order.id)
    if (i + 1) orders[i] = order
    localStorage.setItem('orders', JSON.stringify(orders))
  }

  create(order) {
    localStorage.setItem('orders', JSON.stringify([order, ...this.getAll()]))
  }
}
