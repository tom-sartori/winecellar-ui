/**
 * Describe a geometrical point of type 'A = (x, y)'.
 * Used to draw polygon.
 */
export default class Point {
    constructor(x, y, order) {
        this.x = x
        this.y = y
        this.order = order
    }
}
