import { Product } from '../models/product.model.js'
import { AuthService } from '../services/auth.service.js'
import { ProductService } from '../services/product.service.js'
import { ToastService } from '../services/toast.service.js'
import { randomItem, randomNumber } from '../utils/random-utils.js'

const addProductForm = document.getElementById('addProductForm')
const titleInput = document.getElementById('titleInput')
const descriptionInput = document.getElementById('descriptionInput')
const priceInput = document.getElementById('priceInput')
const amountInput = document.getElementById('amountInput')
const addPictureButton = document.getElementById('addPictureButton')
const pictureCard = document.getElementById('pictureCard')
const pictureImage = document.getElementById('pictureImage')
const removePictureButton = document.getElementById('removePictureButton')

const toastService = new ToastService()
const productService = new ProductService()
const authService = new AuthService()

const pictures = ['carlota.png', 'pastel.png', 'sandwich.jpg']

let picture

function setPicture() {
  const title = titleInput.value.toLowerCase()
  picture = title.includes('carlota') ? pictures[0] : title.includes('pastel') ? pictures[1] : title.includes('sandwich') ? pictures[2] : randomItem(pictures)
  pictureImage.src = `../../../assets/images/products/${picture}`
  pictureImage.onload = () => {
    addPictureButton.classList.add('d-none')
    pictureCard.classList.remove('d-none')
  }
}

function removePicture() {
  addPictureButton.classList.remove('d-none')
  pictureCard.classList.add('d-none')
  picture = undefined
}

function validate() {
  return picture && titleInput.value && descriptionInput.value && priceInput.value && amountInput.value
}

function fill() {
  if (!picture) setPicture()
  titleInput.value ||= ({
    'carlota.png': 'Carlota de limón',
    'pastel.png': 'Pastel de chocolate',
    'sandwich.jpg': 'Sandwich de jamón',
  })[picture]
  descriptionInput.value ||= ({
    'carlota.png': 'Porción individual de carlota de limón de 4 capas',
    'pastel.png': 'Rebanada de pastel de chocolate de Costco',
    'sandwich.jpg': 'Sandwich de jamón con queso panela, lechuga y jitomate. Incluye papas',
  })[picture]
  priceInput.value ||= randomItem([15, 20, 25, 30])
  amountInput.value ||= randomNumber(0, 11)
}

function addProduct() {
  productService.create(new Product(
    titleInput.value,
    descriptionInput.value,
    Number(priceInput.value),
    Number(amountInput.value),
    picture,
    authService.getSession()
  ))
  toastService.setPendingMessage('Producto registrado')
  window.location.replace('./products.html')
}

addPictureButton.onclick = setPicture
removePictureButton.onclick = removePicture

addProductForm.onsubmit = e => {
  e.preventDefault()
  if (!validate()) {
    fill()
    return
  }
  addProduct()
}