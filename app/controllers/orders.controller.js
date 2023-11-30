import { OrderService } from '../services/order.service.js'
import { dateTimeString } from '../utils/date-format.js'

const orderContainer = document.getElementById('orderContainer')

const orderService = new OrderService()

function showOrder(id) {
  orderService.setCurrent(orderService.getById(id))
  window.location.assign('./order.html')
}

function render() {
  orderContainer.innerHTML = orderService.getOwn().map(({ id, orderNumber, products, status, createdAt }) => `
    <div role="button" class="card shadow-sm order-item" data-id="${id}">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <h5>Pedido #${`${orderNumber}`.padStart(4, 0)}</h5>
          <h5>$${products.reduce((acc, { amount, product: { price } }) => acc + price * amount, 0).toFixed(2)}</h5>
        </div>
        <div class="d-flex justify-content-between align-items-center">
          <span>${dateTimeString(new Date(createdAt))}</span>
          <span class="text-${({
            'Pendiente': 'warning',
            'Por entregar': 'success',
            'Finalizado': 'secondary',
            'Cancelado': 'danger',
          })[status]} small fw-bold">${status}</span>
        </div>
      </div>
    </div>
  `).join('') || `
    <div class="alert alert-primary shadow-sm" role="alert">
      No se han realizado pedidos
    </div>
  `
}

function update() {
  render()
  for (const element of document.getElementsByClassName('order-item')) element.onclick = () => showOrder(element.getAttribute('data-id'))
}

update()
