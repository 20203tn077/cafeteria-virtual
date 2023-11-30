import { Entity } from './bases/entity.model.js'

export class Notification extends Entity {
  constructor(title, description, type, recipient, target, isNew = true, isRead = false, createdAt) {
    super(createdAt)
    this.title = title
    this.description = description
    this.recipient = recipient
    this.type = type
    this.target = target
    this.isNew = isNew
    this.isRead = isRead
  }
}
