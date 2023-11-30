import { BasketService } from '../services/basket.service.js'
import { ProductService } from '../services/product.service.js'

const emptyBasketAlert = document.getElementById('emptyBasketAlert')
const productsTable = document.getElementById('productsTable')
const productContainer = document.getElementById('productContainer')
const totalContainer = document.getElementById('totalContainer')
const payButton = document.getElementById('payButton')

const basketService = new BasketService()
const productService = new ProductService()

let basket = basketService.get()

function removeProduct(id, amount) {
  const product = productService.getById(id)
  basket.removeProduct(product, true)
  product.amount += amount
  productService.update(product)
  if (!basket.products.length) basket = null
  basketService.set(basket)
  update()
}

function render() {
  if (basket) {
    productContainer.innerHTML = basket.products.map(({ amount, product: { price, title, id } }) => `
      <tr>
        <td class="text-start"><span class="fw-bold">${amount}x</span> ${title}</td>
        <td>$${(price * amount).toFixed(2)}</td>
        <td><button class="btn btn-sm btn-danger remove-button" data-id="${id}" data-amount="${amount}"><i class="bi bi-x-lg"></i></button></td>
      </tr>
    `).join('')
    totalContainer.innerText = basket.products.reduce((acc, { amount, product: { price } }) => acc + amount * price, 0).toFixed(2)
    emptyBasketAlert.classList.add('d-none')
    productsTable.classList.remove('d-none')
    payButton.classList.remove('d-none')
  } else {
    productsTable.classList.add('d-none')
    payButton.classList.add('d-none')
    emptyBasketAlert.classList.remove('d-none')
  }
}

function update() {
  render()
  for (const button of document.getElementsByClassName('remove-button')) button.onclick = () => removeProduct(
    button.getAttribute('data-id'),
    button.getAttribute('data-amount')
  )
}

update()