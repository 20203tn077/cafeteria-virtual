import { Product } from '../models/product.model.js'
import { AuthService } from './auth.service.js'
import { UserService } from './user.service.js'

export class ProductService {
  #authService = new AuthService()

  getAll() {
    const data = localStorage.getItem('products')
    return data ? JSON.parse(data) : []
  }

  getAvailable() {
    return this.getAll().filter(product => product.amount)
  }

  getOwn() {
    const { username } = this.#authService.getSession()
    return this.getAll().filter(product => product.seller.username === username)
  }

  getById(id) {
    const product = this.getAll().find(product => product.id === id)
    return product ? Object.assign(new Product, product) : null
  }

  setCurrent(product) {
    if (product) localStorage.setItem('currProduct', JSON.stringify(product))
    else localStorage.removeItem('currProduct')
  }

  getCurrent() {
    const data = localStorage.getItem('currProduct')
    return data ? Object.assign(new Product, JSON.parse(data)) : null
  }

  update(product) {
    const products = this.getAll()
    const i = products.findIndex(({id}) => id === product.id)
    if (i + 1) products[i] = product
    localStorage.setItem('products', JSON.stringify(products))
  }

  create(product) {
    localStorage.setItem('products', JSON.stringify([product, ...this.getAll()]))
  }
}
