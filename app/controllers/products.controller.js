import { ProductService } from '../services/product.service.js'

const productContainer = document.getElementById('productContainer')

const productService = new ProductService()

function showProduct(id) {
  productService.setCurrent(productService.getById(id))
  window.location.assign('./product.html')
}

function render() {
  productContainer.innerHTML = productService
    .getOwn()
    .map(
      ({ id, title, price, picture, reviews, amount }) => `
      <div class="card shadow-sm product-item" role="button" data-id="${id}" style="max-width: 540px;">
        <div class="row g-0">
          <div class="col-3">
            <img src="../../../assets/images/products/${picture}" class="rounded-start object-fit-cover h-100 w-100" >
          </div>
          <div class="col-9">
            <div class="card-body">
              <h5>${title}</h5>
              <span class="me-2">$${price.toFixed(2)}</span>
              <span class="text-warning"><i class="bi bi-star-fill me-1"></i>${
                Math.round((reviews.reduce((acc, { score }) => acc + score, 0) / (reviews.length || 1)) * 10) / 10
              }</span>
              <span class="text-body-secondary"> (${reviews.length})</span>
              <h6 class="small text-${amount ? 'success' : 'danger'}">${amount ? `${amount} disponibles` : 'Agotado'}</h6>
            </div>
          </div>
        </div>
      </div>
      `
    )
    .join('') || `
    <div class="alert alert-primary shadow-sm" role="alert">
      No se han registrado productos
    </div>
    `
}

function update() {
  render()
  for (const element of document.getElementsByClassName('product-item')) element.onclick = () => showProduct(element.getAttribute('data-id'))
}

update()
