class Polygon {

    constructor(parent, pos = new Vec2(0, 0), [...vertices], options = {}) {

        Object.assign(this, {
            vel: new Vec2(0, 0), 
            acc: new Vec2(0, 0),
            fill: '#000000',
            stroke: '#ffffff',
            isRigid: false
        }, options);

        this.parent = parent;
        this.parent.add(this);

        this.position = pos;
        this.angle = 0;

        this.vertices = vertices;
        this.vects = this.vertices.map(vertex => new Vec2(vertex.x, vertex.y));

        if (this.isRigid) {

            this.parent.physics.bodies.push(this);
            this.body = new RigidPolygon(this, this.vects, this.vel, this.acc, new Mass(1, 0), new Material(1, 0))

        }

    }

    draw() {

        if (this.body) this.body.update();

        this.parent.ctx.strokeStyle = this.stroke;
        this.parent.ctx.fillStyle = this.fill;

        this.parent.ctx.moveTo(this.position.x + Math.floor(this.vertices[0].x * Math.cos(this.angle / 180 * Math.PI) + this.vertices[0].y * Math.sin(this.angle / 180 * Math.PI)), this.position.y + Math.floor(this.vertices[0].y * Math.cos(this.angle / 180 * Math.PI) - this.vertices[0].x * Math.sin(this.angle / 180 * Math.PI)));
        this.parent.ctx.beginPath();

        for (let i = 1; i < this.vertices.length; i++) {

            this.parent.ctx.lineTo(this.position.x + Math.floor(this.vertices[i].x * Math.cos(this.angle / 180 * Math.PI) + this.vertices[i].y * Math.sin(this.angle / 180 * Math.PI)), this.position.y + Math.floor(this.vertices[i].y * Math.cos(this.angle / 180 * Math.PI) - this.vertices[i].x * Math.sin(this.angle / 180 * Math.PI)));

        }

        this.parent.ctx.lineTo(this.position.x + Math.floor(this.vertices[0].x * Math.cos(this.angle / 180 * Math.PI) + this.vertices[0].y * Math.sin(this.angle / 180 * Math.PI)), this.position.y + Math.floor(this.vertices[0].y * Math.cos(this.angle / 180 * Math.PI) - this.vertices[0].x * Math.sin(this.angle / 180 * Math.PI)));

        this.parent.ctx.closePath();
        this.parent.ctx.fill();
        this.parent.ctx.stroke();

    }

}