class Circle {

    constructor(parent, radius, pos = new Vec2(0, 0), vel =  new Vec2(0, 0), acc = new Vec2(0, 0), fill = '#000000', stroke = '#ffffff', isRigid = false) {

        this.parent = parent;
        this.parent.add(this);

        this.body;

        this.radius = radius;
        this.center = pos;

        if(isRigid) {

            this.body = new RigidCircle(this, vel, acc, new Mass(1, 0), new Material(1, 0));
        }

        this.fill = fill;
        this.stroke = stroke;
    }

    draw() {

        this.parent.ctx.strokeStyle = this.stroke;
        this.parent.ctx.fillStyle = this.fill;

        this.parent.ctx.beginPath();
        this.parent.ctx.arc(this.center.x, this.center.y, this.radius, 0, 2*Math.PI);
        this.parent.ctx.closePath();

        this.parent.ctx.fill();
        this.parent.ctx.stroke();
    }

    update() {

        if(this.body) this.body.update();
    }
}

