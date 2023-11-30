import { Message } from '../models/message.model.js'
import { Notification } from '../models/notification.model.js'
import { AuthService } from '../services/auth.service.js'
import { NotificationService } from '../services/notification.service.js'
import { OrderService } from '../services/order.service.js'
import { timeString } from '../utils/date-format.js'

const orderContainer = document.getElementById('orderContainer')
const nameContainer = document.getElementById('nameContainer')
const orderNumberContainer = document.getElementById('orderNumberContainer')
const statusContainer = document.getElementById('statusContainer')
const countContainer = document.getElementById('countContainer')
const messageContainer = document.getElementById('messageContainer')
const endAlert = document.getElementById('endAlert')
const chatControls = document.getElementById('chatControls')
const chatForm = document.getElementById('chatForm')
const chatInput = document.getElementById('chatInput')

const orderService = new OrderService()
const authService = new AuthService()
const notificationService = new NotificationService()

const order = orderService.getCurrent()
const { role: authRole, name: authName } = authService.getSession()

function submitOnEnter(e) {
  if (e.which === 13 && !e.shiftKey) {
      if (!e.repeat) {
          const newEvent = new Event("submit", { cancelable: true })
          e.target.form.dispatchEvent(newEvent)
      }
      e.preventDefault()
  }
}

function updateHeight() {
  this.style.height = 0
  this.style.height = `${this.scrollHeight}px`
}

function render() {
  const { orderNumber, status, products, messages, seller: { name, surname, lastname } } = order
  nameContainer.innerText = `${name.split(' ')[0]} ${surname}`
  orderNumberContainer.innerText = `${orderNumber}`.padStart(4, '0')
  statusContainer.classList.add(({
    'Pendiente': 'text-warning',
    'Por entregar': 'text-success',
    'Finalizado': 'text-secondary',
    'Cancelado': 'text-danger',
  })[status])
  statusContainer.innerText = status
  const total = products.reduce((acc, { amount }) => acc + amount, 0)
  countContainer.innerText = `${total} producto${(total - 1) ? 's' : ''}`
  messageContainer.innerHTML = messages.map(({ role, content, createdAt }) => `
    <div class="card m${role === authRole ? 's' : 'e'}-auto border-0 bg-${role === authRole ? 'primary' : 'secondary'}-subtle" style="border-radius: ${role === authRole ? '0.5rem 0rem' : '0rem 0.5rem'} 0.5rem 0.5rem; max-width: 90%;">
      <div class="card-body vstack">
        <p>${content.replace(/(?:\r\n|\r|\n)/g, '<br>')}</p>
        <small class="ms-auto text-body-secondary"><small>${timeString(new Date(createdAt))}</small></small>
      </div>
    </div>
  `).join('')
  if (status === 'Finalizado' || status === 'Cancelado') endAlert.classList.remove('d-none')
  else chatControls.classList.remove('d-none')
}

function sendMessage() {
  if (!chatInput.value) return
  const { messages, orderNumber, seller, buyer, id } = order
  if (!messages.length || messages[messages.length - 1].role !== authRole)
  notificationService.create(new Notification(
    `Nuevos mensajes en el pedido #${orderNumber}`,
    `${authName}: ${chatInput.value.substring(0, 51).trim()}...`,
    'chat',
    authRole === 'Vendedor' ? buyer : seller,
    id
  ))
  messages.push(new Message(authRole, chatInput.value))
  chatInput.value = ''
  orderService.update(order)
  orderService.setCurrent(order)
  render()
}

chatInput.oninput = updateHeight
chatInput.onkeydown = submitOnEnter
orderContainer.onclick = () => window.location.assign('./order.html')
chatForm.onsubmit = e => {
  e.preventDefault()
  sendMessage()
}

render()