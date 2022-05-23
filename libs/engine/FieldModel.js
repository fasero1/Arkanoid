export default class FieldModel {
  constructor(matrix) {
    this.matrix = matrix || this.createDefaultMatrix()
  }

  createDefaultMatrix() {
    return [
      [3, 4, 5, 1, 2],
      [3, 4, 5, 1, 2],
      [3, 4, 5, 1, 2],
      [3, 4, 5, 1, 2],
      [3, 4, 5, 1, 2]
    ]
  }
}
