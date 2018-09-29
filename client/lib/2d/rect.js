class Rect extends Polygon {

    constructor(parent, pos = new Vec2(0, 0), width = 32, height = 32, options = {}) {

        super(parent, pos,
            [new Vec2(0, 0),
            new Vec2(width, 0),
            new Vec2(width, height),
            new Vec2(0, height)])

        Object.assign(this, {
            fill: '#000000',
            stroke: '#ffffff',
        }, options);

        this.width = width;
        this.height = height;

    }

}

