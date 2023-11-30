import { Review } from '../models/review.model.js'
import { AuthService } from '../services/auth.service.js'
import { OrderService } from '../services/order.service.js'
import { ProductService } from '../services/product.service.js'
import { dateTimeString } from '../utils/date-format.js'
import { notyf } from '../utils/notyf.js'

const orderNumberContainer = document.getElementById('orderNumberContainer')
const statusContainer = document.getElementById('statusContainer')
const dateContainer = document.getElementById('dateContainer')
const sellerContainer = document.getElementById('sellerContainer')
const productContainer = document.getElementById('productContainer')
const totalContainer = document.getElementById('totalContainer')
const scoreButtons = document.getElementsByClassName('score-button')
const cancelOrderButton = document.getElementById('cancelOrderButton')
const reviewForm = document.getElementById('reviewForm')
const commentInput = document.getElementById('commentInput')

const orderService = new OrderService()
const productService = new ProductService()
const authService = new AuthService()

let score

const order = orderService.getCurrent()

function setScore(givenScore) {
  score = givenScore
  for (let i = 0, scoreButton = scoreButtons[i]; i < scoreButtons.length; i++, scoreButton = scoreButtons[i]) {
    const filled = i < givenScore
    scoreButton.classList.add(filled ? 'bi-star-fill' : 'bi-star')
    scoreButton.classList.remove(filled ? 'bi-star' : 'bi-star-fill')
  }
}

function render() {
  const { orderNumber, status, createdAt, products, seller: { name, surname, lastname }, isReviewed } = order
  statusContainer.classList.remove('text-warning', 'text-success', 'text-secondary', 'text-danger')
  cancelOrderButton.classList.add('d-none')
  reviewForm.classList.add('d-none')
  orderNumberContainer.innerText = `${orderNumber}`.padStart(4, '0')
  statusContainer.classList.add(({
    'Pendiente': 'text-warning',
    'Por entregar': 'text-success',
    'Finalizado': 'text-secondary',
    'Cancelado': 'text-danger'
  })[status])
  statusContainer.innerText = status
  dateContainer.innerText = dateTimeString(new Date(createdAt)).toLowerCase()
  sellerContainer.innerText = [name, surname, lastname].join(' ').trim()
  productContainer.innerHTML = products.map(({ amount, product: { title, price } }) => `
    <tr>
      <td class="text-start"><span class="fw-bold">${amount}x</span> ${title}</td>
      <td class="text-end">$${(price * amount).toFixed(2)}</td>
    </tr>
  `).join('')
  totalContainer.innerText = products.reduce((acc, { amount, product: { price } }) => acc + amount * price, 0 ).toFixed(2)
  if (status !== 'Finalizado' && status !== 'Cancelado') cancelOrderButton.classList.remove('d-none')
  else if (status === 'Finalizado' && !isReviewed) reviewForm.classList.remove('d-none')
}

function cancelOrder() {
  const { id, buyer, orderNumber, products } = order
  order.status = 'Cancelado'
  for (const { amount, product: { id } } of products) {
    const product = productService.getById(id)
    product.amount += amount
    productService.update(product)
  }
  orderService.update(order)
  notificationService.create(new Notification(
    `Novedades del pedido #${`${orderNumber}`.padStart(4, '0')}`,
    'Tu pedido ha sido cancelado por el vendedor. Lamentamos las molestias.',
    'order',
    buyer,
    id
  ))
  render()
  notyf.success('Pedido cancelado')
}

function validateReview() {
  return commentInput.value && score
}

function fillReview() {
  commentInput.value ||= 'Excelente servico :)'
  if (!score) setScore(5)
}

function sendReview() {
  for (const { product: { id } } of order.products) {
    const product = productService.getById(id)
    product.reviews = [new Review(
      authService.getSession(),
      score,
      commentInput.value
    ), ...product.reviews]
    productService.update(product)
  }
  order.isReviewed = true
  orderService.update(order)
  render()
  notyf.success('Calificación enviada')
}

cancelOrderButton.onclick = cancelOrder

for (let i = 0, scoreButton = scoreButtons[i]; i < scoreButtons.length; i++, scoreButton = scoreButtons[i]) scoreButton.onclick = () => setScore(i + 1)
reviewForm.onsubmit = e => {
  e.preventDefault()
  if (!validateReview()) {
    fillReview()
    return
  }
  sendReview()
}


render()