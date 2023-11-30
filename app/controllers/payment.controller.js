import { Notification } from '../models/notification.model.js'
import { AuthService } from '../services/auth.service.js'
import { BasketService } from '../services/basket.service.js'
import { NotificationService } from '../services/notification.service.js'
import { ProductService } from '../services/product.service.js'
import { ToastService } from '../services/toast.service.js'
import { randomNumber } from '../utils/random-utils.js'

const numberContainers = document.getElementsByClassName('numberContainer')
const nameContainers = document.getElementsByClassName('nameContainer')
const monthContainers = document.getElementsByClassName('monthContainer')
const yearContainers = document.getElementsByClassName('yearContainer')
const finishOrderButton = document.getElementById('finishOrderButton')

const authService = new AuthService()
const basketService = new BasketService()
const productService = new ProductService()
const notificationService = new NotificationService()
const toastService = new ToastService()

function render() {
  const { name, surname, lastname } = authService.getSession()

  for (const numberContainer of numberContainers) numberContainer.innerText = `${randomNumber(1, 10000)}`.padStart(4, '0')
  for (const nameContainer of nameContainers) nameContainer.innerText = [name, surname, lastname].join(' ').trim()
  for (const monthContainer of monthContainers) monthContainer.innerText = `${randomNumber(1, 13)}`.padStart(2, '0')
  for (const yearContainer of yearContainers) yearContainer.innerText = `${new Date().getFullYear() + randomNumber(1, 6)}`.substring(2)
}

function finishOrder() {
  const basket = basketService.get()
  const { orderNumber, seller, id } = basket
  let total = 0
  for (const { amount: orderAmount, product: {id} } of basket.products) {
    total += orderAmount
    const { amount, seller, title } = productService.getById(id)
    if (!amount) notificationService.create(new Notification(
      'Producto agotado',
      `Has vendido todas las unidades de "${title}".`,
      'product',
      seller,
      id
    ))
  }
  basketService.finish()
  notificationService.create(new Notification(
    'Nuevo pedido recibido',
    `Pedido #${orderNumber} con ${total} producto${(total - 1) ? 's' : ''}. Atiéndelo en cuanto puedas.`,
    'order',
    seller,
    id
  ))
  toastService.setPendingMessage('Pedido realizado')
  window.location.replace('./orders.html')
}

finishOrderButton.onclick = finishOrder

render()
