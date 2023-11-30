import { User } from '../models/user.model.js'
import { UserService } from './user.service.js'

export class AuthService {
  #userService = new UserService()

  getSession() {
    const data = localStorage.getItem('session')
    return data ? Object.assign(new User, JSON.parse(data)) : null
  }

  login(username, password) {
    const user = this.#userService.getAll().find(user => user.username.toLowerCase() === username.toLowerCase() && user.password === password)
    if (user) localStorage.setItem('session', JSON.stringify(user))
    return !!user
  }
}
