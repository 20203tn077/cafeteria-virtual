import { AuthService } from '../services/auth.service.js'
import { NotificationService } from '../services/notification.service.js'

const notificationBadge = document.getElementById('notificationBadge')
const notificationCounter = document.getElementById('notificationCounter')

const notificationService = new NotificationService()
const authService = new AuthService()

function render() {
  const count = notificationService.getOwn(authService.getSession()).filter(({ isNew }) => isNew).length
  if (count) {
    notificationCounter.innerText = count
    notificationBadge.classList.remove('d-none')
  }
}

render()
