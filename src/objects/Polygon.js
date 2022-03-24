export default class Polygon {

    /**
     * Draw a polygon on the canvas and return it.
     * N.B. : This function don't add eventListener.
     *
     * @param listPoint : Point[]
     */
    constructor(listPoint) {
        if (listPoint.length === 0) {
            throw new Error()
        }

        const polygon = new Path2D();

        // For each point, draw a line to the next one.
        polygon.moveTo(listPoint[0].x, listPoint[0].y);
        for(let i = 1; i < listPoint.length; i++) {
            polygon.lineTo(listPoint[i].x, listPoint[i].y);
        }
        this.path2d = polygon
    }
}
