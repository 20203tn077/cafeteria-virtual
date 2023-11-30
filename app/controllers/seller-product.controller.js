import { ProductService } from '../services/product.service.js'
import { dateTimeString } from '../utils/date-format.js'
import { notyf } from '../utils/notyf.js'
import { stars } from '../utils/stars-format.js'

const titleContainer = document.getElementById('titleContainer')
const priceContainer = document.getElementById('priceContainer')
const descriptionContainer = document.getElementById('descriptionContainer')
const amountInput = document.getElementById('amountInput')
const picturePlaceholder = document.getElementById('picturePlaceholder')
const reviewsPlaceholder = document.getElementById('reviewsPlaceholder')
const decreaseButton = document.getElementById('decreaseButton')
const increaseButton = document.getElementById('increaseButton')
const updateAmountButton = document.getElementById('updateAmountButton')

const productService = new ProductService()

const product = productService.getCurrent()

function render() {
  const {
    picture,
    title,
    price,
    description,
    amount,
    reviews,
  } = product

  picturePlaceholder.outerHTML = `<img class="card-img-top" src="../../../assets/images/products/${picture}" alt="">`
  titleContainer.innerText = title
  priceContainer.innerText = price.toFixed(2)
  descriptionContainer.innerText = description
  amountInput.value = amount
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
  amountInput.value++
}

function decreaseAmount() {
  if (Number(amountInput.value)) amountInput.value--
}

function updateAmount() {
  product.amount = Number(amountInput.value)
  productService.update(product)
  notyf.success('Cantidad actualizada')
}

decreaseButton.onclick = decreaseAmount
increaseButton.onclick = increaseAmount
updateAmountButton.onclick = updateAmount

render()
