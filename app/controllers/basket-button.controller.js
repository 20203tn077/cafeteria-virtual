import { BasketService } from '../services/basket.service.js'

const basketService = new BasketService()

const basketBadge = document.getElementById('basketBadge')
const basketCounter = document.getElementById('basketCounter')

function render() {
  const basket = basketService.get()
  if (basket) {
    const count = basket.products.reduce((acc, { amount }) => acc + amount, 0)
    basketCounter.innerText = count
    basketBadge.classList.remove('d-none')
  }
}

render()
