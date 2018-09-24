class RigidPolygon extends Polygon {

    constructor(parent, x, y, vel = {x: 0, y: 0}, acc = {x: 0, y: 0}, [...vertices], fill, stroke) {

        super(parent, x, y, vertices, fill, stroke)

        this.normals = [];
        this.vel = vel;
        this.acc = acc;

        for (let i = 0; i < this.vects.length; i++) {

            this.normals.push(Vec2.getNormal(this.vects[i], this.vects[(i + 1) % this.vects.length]));
        }
    
    }

    update() {

        this.x += this.vel.x;
        this.y += this.vel.y;

        this.vel.x += this.acc.x;
        this.vel.y += this.acc.y;
    }

    move() {


    }
}