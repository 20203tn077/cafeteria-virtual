import { Notification } from '../models/notification.model.js'
import { AuthService } from './auth.service.js'

export class NotificationService {
  #authService = new AuthService()

  getAll() {
    const data = localStorage.getItem('notifications')
    return data ? JSON.parse(data) : []
  }

  getOwn() {
    const { id } = this.#authService.getSession()
    return this.getAll().filter(({ recipient }) => recipient.id === id)
  }

  getById(id) {
    const notification = this.getAll().find(notification => notification.id === id)
    return notification ? Object.assign(new Notification, notification) : null
  }

  setCurrent(notification) {
    if (notification) localStorage.setItem('currNotification', JSON.stringify(notification))
    else localStorage.removeItem('currNotification')
  }

  getCurrent() {
    const data = localStorage.getItem('currNotification')
    return data ? Object.assign(new Notification, JSON.parse(data)) : null
  }

  update(notification) {
    const notifications = this.getAll()
    const i = notifications.findIndex(({id}) => id === notification.id)
    if (i + 1) notifications[i] = notification
    localStorage.setItem('notifications', JSON.stringify(notifications))
  }

  create(notification) {
    localStorage.setItem('notifications', JSON.stringify([notification, ...this.getAll()]))
  }
}
