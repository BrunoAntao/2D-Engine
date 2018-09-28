class Polygon {

    constructor(parent, pos = new Vec2(0, 0), [...vertices], vel = new Vec2(0, 0), acc = new Vec2(0, 0), fill = '#000000', stroke = '#ffffff', isRigid = false) {

        this.parent = parent;
        this.parent.add(this);

        this.body;

        this.position = pos;
        this.angle = 0;

        this.vertices = vertices;
        this.vects = this.vertices.map(vertex => new Vec2(vertex.x, vertex.y));

        if (isRigid) {

            this.parent.physics.bodies.push(this);
            this.body = new RigidPolygon(this, vel, acc, this.vects, new Mass(1, 0), new Material(1, 0))

        }

        this.fill = fill;
        this.stroke = stroke;
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