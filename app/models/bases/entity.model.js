import { v4 } from "../../../lib/uuid/dist/esm-browser/index.js"

export class Entity {
  constructor(createdAt = new Date()) {
    this.id = v4()
    this.createdAt = createdAt
  }
}
