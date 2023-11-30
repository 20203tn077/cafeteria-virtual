import { InitService } from '../services/init.service.js'
import { notyf } from '../utils/notyf.js'

const initTrigger = document.getElementById('initTrigger')

const initService = new InitService()

function init() {
  initService.clear()
  initService.addUsers()
  initService.addProducts()
  initService.addOrders()

  notyf.success('Datos restablecidos :p')
}

initTrigger.ondblclick = init
