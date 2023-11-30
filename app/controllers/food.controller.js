import { ProductService } from '../services/product.service.js'

const productContainer = document.getElementById('productContainer')

const productService = new ProductService()

function showProduct(id) {
  productService.setCurrent(productService.getById(id))
  window.location.assign('./product.html')
}

function render() {
  productContainer.innerHTML = productService.getAvailable().map(({ id, title, price, picture, reviews }) => `
    <div role="button" class="card shadow-sm product-item" data-id="${id}">
      <img src="../../../assets/images/products/${picture}" class="card-img-top object-fit-cover" style="height: 125px;" alt="...">
      <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <span class="me-2">$${price.toFixed(2)}</span>
        <span class="text-warning"><i class="bi bi-star-fill me-1"></i>${
          Math.round((reviews.reduce((acc, { score }) => acc + score, 0) / (reviews.length || 1)) * 10) / 10
        }</span>
        <span class="text-body-secondary"> (${reviews.length})</span>
      </div>
    </div>
  `).join('') || `
    <div class="alert alert-primary shadow-sm" role="alert">
      No hay comida disponible por el momento
    </div>
  `
}

function update() {
  render()
  for (const element of document.getElementsByClassName('product-item')) element.onclick = () => showProduct(element.getAttribute('data-id'))
}

update()
