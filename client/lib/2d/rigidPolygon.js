class RigidPolygon extends Polygon {

    constructor(parent, pos = new Vec2(0, 0), vel = new Vec2(0, 0), acc = new Vec2(0, 0), [...vertices], fill, stroke) {

        super(parent, pos, vertices, fill, stroke)

        this.normals = [];
        this.vel = vel;
        this.acc = acc;

        for (let i = 0; i < this.vects.length; i++) {

            this.normals.push(Vec2.getNormal(this.vects[i], this.vects[(i + 1) % this.vects.length]));
        }
    
    }

    update() {

        this.position = this.position.add(this.vel);
        this.vel = this.vel.add(this.acc);

    }

    move() {


    }
}