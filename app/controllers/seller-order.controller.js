import { Notification } from '../models/notification.model.js'
import { NotificationService } from '../services/notification.service.js'
import { OrderService } from '../services/order.service.js'
import { ProductService } from '../services/product.service.js'
import { dateTimeString } from '../utils/date-format.js'
import { notyf } from '../utils/notyf.js'

const orderNumberContainer = document.getElementById('orderNumberContainer')
const statusContainer = document.getElementById('statusContainer')
const dateContainer = document.getElementById('dateContainer')
const buyerContainer = document.getElementById('buyerContainer')
const productContainer = document.getElementById('productContainer')
const totalContainer = document.getElementById('totalContainer')
const nextStepButton = document.getElementById('nextStepButton')
const nextStepContainer = document.getElementById('nextStepContainer')
const cancelOrderButton = document.getElementById('cancelOrderButton')

const orderService = new OrderService()
const productService = new ProductService()
const notificationService = new NotificationService()

const order = orderService.getCurrent()

function render() {
  statusContainer.classList.remove('text-warning', 'text-success', 'text-secondary', 'text-danger')
  cancelOrderButton.classList.add('d-none')
  nextStepButton.classList.add('d-none')
  const { orderNumber, status, createdAt, products, buyer: { name, surname, lastname } } = order
  orderNumberContainer.innerText = `${orderNumber}`.padStart(4, '0')
  statusContainer.classList.add(({
    'Pendiente': 'text-warning',
    'Por entregar': 'text-success',
    'Finalizado': 'text-secondary',
    'Cancelado': 'text-danger'
  })[status])
  statusContainer.innerText = status
  dateContainer.innerText = dateTimeString(new Date(createdAt)).toLowerCase()
  buyerContainer.innerText = [name, surname, lastname].join(' ').trim()
  productContainer.innerHTML = products.map(({ amount, product: { title, price } }) => `
    <tr>
      <td class="text-start"><span class="fw-bold">${amount}x</span> ${title}</td>
      <td class="text-end">$${(price * amount).toFixed(2)}</td>
    </tr>
  `).join('')
  totalContainer.innerText = products.reduce((acc, { amount, product: { price } }) => acc + amount * price, 0 ).toFixed(2)
  if (status !== 'Finalizado' && status !== 'Cancelado') {
    cancelOrderButton.classList.remove('d-none')
    nextStepContainer.innerText = ({
      'Pendiente': 'Listo para entregar',
      'Por entregar': 'Finalizar pedido',
    })[status]
    nextStepButton.classList.remove('d-none')
  }
}

function setStatus(status) {
  const { id, buyer, orderNumber, products } = order
  order.status = status
  if (status === 'Cancelado') for (const { amount, product: { id } } of products) {
    const product = productService.getById(id)
    product.amount += amount
    productService.update(product)
  }
  orderService.update(order)
  notificationService.create(new Notification(
    `Novedades del pedido #${`${orderNumber}`.padStart(4, '0')}`,
    ({
      'Por entregar': 'Tu pedido está listo para ser entregado. Comunícate con tu vendedor.',
      'Finalizado': 'Tu pedido ha sido entregado ¡Disfrútalo! Recuerda dejar una calificación.',
      'Cancelado': 'Tu pedido ha sido cancelado por el vendedor. Lamentamos las molestias.',
    })[status],
    'order',
    buyer,
    id
  ))
  update()
  notyf.success(`Pedido ${({
    'Por entregar': 'marcado para entregar',
    'Finalizado': 'finalizado',
    'Cancelado': 'cancelado',
  })[status]}`)
}

cancelOrderButton.onclick = () => setStatus('Cancelado')

function update() {
  render()
  nextStepButton.onclick = () => setStatus(({
    'Pendiente': 'Por entregar',
    'Por entregar': 'Finalizado',
  })[order.status])
}

update()
