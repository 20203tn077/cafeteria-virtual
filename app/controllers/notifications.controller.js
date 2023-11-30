import { NotificationService } from '../services/notification.service.js'
import { OrderService } from '../services/order.service.js'
import { ProductService } from '../services/product.service.js'
import { relative } from '../utils/date-format.js'

const emptyAlert = document.getElementById('emptyAlert')
const newNotificationsContainer = document.getElementById('newNotificationsContainer')
const newNotificationContainer = document.getElementById('newNotificationContainer')
const notificationsDivider = document.getElementById('notificationsDivider')
const prevNotificationsContainer = document.getElementById('prevNotificationsContainer')
const prevNotificationContainer = document.getElementById('prevNotificationContainer')

const notificationService = new NotificationService()
const productService = new ProductService()
const orderService = new OrderService()

const notifications = notificationService.getOwn()
const newNotifications = notifications.filter(({ isNew }) => isNew)
const prevNotifications = notifications.filter(({ isNew }) => !isNew)

function render() {
  if (!notifications.length) {
    emptyAlert.classList.remove('d-none')
    return
  }
  if (newNotifications.length) {
    newNotificationsContainer.classList.remove('d-none')
    newNotificationContainer.innerHTML = newNotifications.map(({ id, title, description, isRead, type, target, createdAt }) => `
      <div data-id="${id}" data-type="${type}" data-target="${target}" class="notification-item card shadow-sm ${isRead ? 'text-body-secondary' : 'border-primary'}">
        <div class="card-body">
          <h6 class="card-title${isRead ? '' : 'text-primary'}">${title}</h6>
          <p class="card-title lh-sm">${description}</p>
          <p class="small${isRead ? '' : ' fw-bold text-primary'}">${relative(new Date(createdAt))}</p>
        </div>
      </div>
    `).join('')
  }
  if (newNotifications.length && prevNotifications.length) notificationsDivider.classList.remove('d-none')
  if (prevNotifications.length) {
    prevNotificationsContainer.classList.remove('d-none')
    prevNotificationContainer.innerHTML = prevNotifications.map(({ id, title, description, isRead, type, target, createdAt }) => `
      <div data-id="${id}" data-type="${type}" data-target="${target}" class="notification-item card shadow-sm ${isRead ? 'text-body-secondary' : 'border-primary'}">
        <div class="card-body">
          <h6 class="card-title${isRead ? '' : 'text-primary'}">${title}</h6>
          <p class="card-title lh-sm">${description}</p>
          <p class="small${isRead ? '' : ' fw-bold text-primary'}">${relative(new Date(createdAt))}</p>
        </div>
      </div>
    `).join('')
  }
}

function removeNew() {
  for (const notification of newNotifications) {
    notification.isNew = false
    notificationService.update(notification)
  }
}

function openNotification(id, type, target) {
  console.log(id);
  const notification = notificationService.getById(id)
  notification.isRead = true
  notificationService.update(notification)
  const service = ({
    'product': productService,
    'order': orderService,
    'chat': orderService,
  })[type]
  const item = service.getById(target)
  service.setCurrent(item)
  window.location.replace(({
    'product': './product.html',
    'order': './order.html',
    'chat': './chat.html',
  })[type])
}

render()
removeNew()

for (const notification of document.getElementsByClassName('notification-item')) notification.onclick = () => openNotification(
  notification.getAttribute('data-id'),
  notification.getAttribute('data-type'),
  notification.getAttribute('data-target')
)
