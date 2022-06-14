import Container from '../../libs/Container'
import FieldView from '../components/engine/FieldView'
import Score from '../components/Score'

export default class Scene extends Container {
  constructor() {
    super()

    this.field = null
    this.score = null

    this.createChildren()
  }

  createChildren() {
    this.field = this.addChild(new FieldView())
    this.scale.set(1.5)

    this.score = this.addChild(new Score())
    this.score.position.set(375, 0)
  }
}
