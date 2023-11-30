import { Entity } from './bases/entity.model.js'

export class Review extends Entity {
  constructor(author, score, comment, createdAt) {
    super(createdAt)
    this.author = author
    this.score = score
    this.comment = comment
  }
}
