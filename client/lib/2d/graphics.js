var Graphics = {};

Graphics.DrawLine = function (ctx, pos1, pos2, stroke = '#ffffff') {

    ctx.strokeStyle = stroke;
    ctx.moveTo(pos1.x, pos1.y);
    ctx.lineTo(pos2.x, pos2.y);

}

Graphics.DrawPoly = function (ctx, pos, vectors, stroke = '#ffffff', fill = '#000000') {

    ctx.strokeStyle = stroke;
    ctx.fillStyle = fill;

    ctx.moveTo(pos.x + vectors[0].x, pos.y + vectors[0].y);
    ctx.beginPath();

    for (let i = 1; i < vectors.length; i++) {

        ctx.lineTo(pos.x + vectors[i].x, pos.y + vectors[i].y);

    }

    ctx.lineTo(pos.x + vectors[0].x, pos.y + vectors[0].y);

    ctx.closePath();
    ctx.fill();
    ctx.stroke();

}

Graphics.DrawCircle = function (ctx, pos, radius, stroke = '#ffffff', fill = '#000000') {

    ctx.strokeStyle = stroke;
    ctx.fillStyle = fill;

    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    ctx.lineTo(pos.x, pos.y);

    ctx.arc(pos.x, pos.y, radius, 0, 2 * Math.PI);
    ctx.closePath();

    ctx.fill();
    ctx.stroke();

}

// #region Graphics.Polygon
Graphics.Polygon = class {

    constructor(parent, pos = new Vec2(0, 0), vectors, options = {}) {

        Object.assign(this, {
            fill: '#000000',
            stroke: '#ffffff'
        }, options);

        this.parent = parent;
        this.parent.add(this);

        this.pos = pos;
        this.vectors = vectors;
        this.angle = 0;

    }

    draw() {

        Graphics.DrawPoly(this.parent.ctx, this.pos, this.vectors, this.stroke, this.fill);

    }

}
// #endregion

// #region Graphics.Circle
Graphics.Circle = class {

    constructor(parent, pos = new Vec2(0, 0), options = {}) {

        Object.assign(this, {
            radius: 32,
            fill: '#000000',
            stroke: '#ffffff'
        }, options);

        this.parent = parent;
        this.parent.add(this);

        this.pos = pos;

    }

    draw() {

        Graphics.DrawCircle(this.parent.ctx, this.pos, this.radius, this.stroke, this.fill);

    }

}
// #endregion

// #region Graphics.Rect
Graphics.Rect = class extends Graphics.Polygon {

    constructor(parent, pos = new Vec2(0, 0), options = {}) {

        let op = Object.assign({
            width: 32,
            height: 32
        }, options);

        super(parent, pos,
            [new Vec2(0, 0),
            new Vec2(op.width, 0),
            new Vec2(op.width, op.height),
            new Vec2(0, op.height),],
            op)

        this.prototype = Object.create(Graphics.Rect.prototype);
        this.prototype.draw = function () {

            console.log('s')

        }

    }

}

// #endregion