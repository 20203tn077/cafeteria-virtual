import { Order } from '../models/order.model.js'
import { randomDate, randomItem, randomItems, randomNumber } from '../utils/random-utils.js'
import { getConversation } from './conversations.js'
import { products } from './products.js'
import { startDate } from './start-date.js'
import { users } from './users.js'

const statuses = ['Finalizado', 'Finalizado', 'Finalizado', 'Finalizado', 'Finalizado', 'Cancelado']
const orderAmount = 50

export const orders = Array.from(Array(orderAmount))
  .map(
    () => {
      const date = randomDate(startDate)
      return new Order(
        randomNumber(1000, 10000),
        randomItem(users, u => u.role === 'Comprador'),
        randomItem(users, u => u.role === 'Vendedor'),
        randomItems(randomNumber(2, 7), products),
        randomItem(statuses),
        getConversation(date),
        randomItem([true, false]),
        date
      )
    }
  )
  .sort((a, b) => a.createdAt - b.createdAt)
