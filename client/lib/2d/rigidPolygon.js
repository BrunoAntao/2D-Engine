const gravity = new Vec2(0, -9.8);

const frames = 60;

const dt = 1/frames;

class RigidPolygon {

    constructor(polygon, vel = new Vec2(0, 0), acc = new Vec2(0, 0), vects) {

        this.polygon = polygon;

        this.vects = vects;
        this.normals = [];

        this.vel = vel;
        this.acc = acc;

        for (let i = 0; i < this.vects.length; i++) {

            this.normals.push(Vec2.getNormal(this.vects[i], this.vects[(i + 1) % this.vects.length]));
        }
    
    }

    update() {

        this.polygon.position = this.polygon.position.add(this.vel);
        this.vel = this.vel.add(this.acc);
    
    }

    move() {


    }
}