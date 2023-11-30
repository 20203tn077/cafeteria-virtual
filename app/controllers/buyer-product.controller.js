import { Order } from '../models/order.model.js'
import { AuthService } from '../services/auth.service.js'
import { BasketService } from '../services/basket.service.js'
import { ProductService } from '../services/product.service.js'
import { ToastService } from '../services/toast.service.js'
import { dateTimeString } from '../utils/date-format.js'
import { notyf } from '../utils/notyf.js'
import { randomNumber } from '../utils/random-utils.js'
import { stars } from '../utils/stars-format.js'

const titleContainer = document.getElementById('titleContainer')
const priceContainer = document.getElementById('priceContainer')
const descriptionContainer = document.getElementById('descriptionContainer')
const sellerContainer = document.getElementById('sellerContainer')
const scheduleContainer = document.getElementById('scheduleContainer')
const locationsContainer = document.getElementById('locationsContainer')
const amountInput = document.getElementById('amountInput')
const decreaseButton = document.getElementById('decreaseButton')
const increaseButton = document.getElementById('increaseButton')
const addToBasketButton = document.getElementById('addToBasketButton')
const picturePlaceholder = document.getElementById('picturePlaceholder')
const reviewsPlaceholder = document.getElementById('reviewsPlaceholder')

const productService = new ProductService()
const basketService = new BasketService()
const authService = new AuthService()
const toastService = new ToastService()

const product = productService.getCurrent()

function render() {
  const {
    picture,
    title,
    price,
    description,
    seller: { name, surname, lastname, schedule, locations },
    amount,
    reviews,
  } = product

  picturePlaceholder.outerHTML = `<img class="card-img-top" src="../../../assets/images/products/${picture}" alt="">`
  titleContainer.innerText = title
  priceContainer.innerText = price.toFixed(2)
  descriptionContainer.innerText = description
  sellerContainer.innerText = [name, surname, lastname].join(' ').trim()
  scheduleContainer.innerText = schedule
  locationsContainer.innerText = locations
  amountInput.max = amount
  reviewsPlaceholder.outerHTML = reviews.map(({ author: { name, surname }, score, comment, createdAt }) => `
    <div class="card shadow-sm">
      <div class="card-body">
        <div class="card-title d-flex justify-content-between align-items-center">
          <div class="lh-1">
            <h6>${name} ${surname.charAt(0)}.</h6>
            <small class="text-body-secondary">${dateTimeString(new Date(createdAt))}</small>
          </div>
          <div class="text-warning">${stars(score)}</div>
        </div>
        <p>${comment}</p>
      </div>
    </div>
  `).join('') || `
    <div class="alert alert-primary shadow-sm" role="alert">
      No se han realizado valoraciones
    </div
  `
}

function increaseAmount() {
  if (Number(amountInput.value) < product.amount) amountInput.value++
}

function decreaseAmount() {
  if (Number(amountInput.value) - 1) amountInput.value--
}

function addToBasket() {
  const basket = basketService.get() ?? new Order(
    randomNumber(0, 10000),
    authService.getSession(),
    product.seller
  )
  const amount = Number(amountInput.value)
  basket.addProduct(product, amount)
  basketService.set(basket)
  product.amount -= amount
  productService.update(product)
  amountInput.value = 1
  if (product.amount) notyf.success('Producto agregado al pedido')
  else {
    toastService.setPendingMessage('Producto agregado al pedido')
    window.location.replace('./food.html')
  }
}

decreaseButton.onclick = decreaseAmount
increaseButton.onclick = increaseAmount

addToBasketButton.onclick = addToBasket

render()
