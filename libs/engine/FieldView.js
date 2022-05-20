import { Container } from 'pixi.js'

export default class FieldView extends Container {
  constructor(model) {
    super()
    this.model = model
  }
}
