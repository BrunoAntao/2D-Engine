class Rect extends Polygon {

    constructor(parent, pos = new Vec2(0, 0), width = 32, height = 32, options = {}) {

        super(parent, pos,
            [{ x: 0, y: 0 },
            { x: width, y: 0 },
            { x: width, y: height },
            { x: 0, y: height }], options)

        this.width = width;
        this.height = height;

    }

    draw() {

        super.draw();

        //console.log(this.over);

    }

}