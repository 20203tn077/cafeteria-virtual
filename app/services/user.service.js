import { User } from '../models/user.model.js'

export class UserService {
  getAll() {
    const data = localStorage.getItem('users')
    return data ? JSON.parse(data) : []
  }

  getById(id) {
    const user = this.getAll().find(user => user.id === id)
    return user ? Object.assign(new User) : null
  }

  setCurrent(user) {
    localStorage.setItem('currUser', JSON.stringify(user))
  }

  getCurrent() {
    const data = localStorage.getItem('currUser')
    return data ? Object.assign(new User, JSON.parse(data)) : null
  }

  update(user) {
    const users = this.getAll()
    const i = users.findIndex(({id}) => id === user.id)
    if (i) users[i] = user
    localStorage.setItem('users', JSON.stringify(users))
  }

  create(user) {
    localStorage.setItem('users', JSON.stringify([user, ...this.getAll()]))
  }
}
