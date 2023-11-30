import { Entity } from './bases/entity.model.js'

export class User extends Entity {
  constructor(name, surname, lastname, email, username, role, password, schedule, locations) {
    super()
    this.name = name
    this.surname = surname
    this.lastname = lastname
    this.email = email
    this.username = username
    this.role = role
    this.password = password
    this.schedule = schedule
    this.locations = locations
  }
}
