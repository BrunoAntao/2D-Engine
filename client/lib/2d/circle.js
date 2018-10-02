class Circle {

    constructor(parent, pos = new Vec2(0, 0), options = {}) {

        Object.assign(this, {
            radius: 32,
            vel: new Vec2(0, 0),
            acc: new Vec2(0, 0),
            fill: '#000000',
            stroke: '#ffffff'
        }, options);

        this.parent = parent;
        this.parent.add(this);

        this.center = pos;

    }

    draw() {

        if (this.body) this.body.update();

        this.parent.ctx.strokeStyle = this.stroke;
        this.parent.ctx.fillStyle = this.fill;

        this.parent.ctx.beginPath();
        this.parent.ctx.moveTo(this.center.x, this.center.y);
        this.parent.ctx.lineTo(this.center.x, this.center.y);
        
        this.parent.ctx.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI);
        this.parent.ctx.closePath();

        this.parent.ctx.fill();
        this.parent.ctx.stroke();
    }

}

