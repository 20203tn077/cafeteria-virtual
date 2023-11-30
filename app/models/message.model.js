import { Entity } from './bases/entity.model.js'

export class Message extends Entity {
  constructor(role, content, createdAt) {
    super(createdAt)
    this.role = role
    this.content = content
  }
}
