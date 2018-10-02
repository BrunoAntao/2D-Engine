const gravity = new Vec2(0, -9.8);

const frames = 1;

const dt = 1/frames;

class RigidPolygon {

    constructor(polygon, vects, vel = new Vec2(0, 0), acc = new Vec2(0, 0), mass = new Mass(1, 0), material = new Material(1, 0)) {

        this.polygon = polygon;

        this.vects = vects;
        this.normals = [];

        this.vel = vel;
        this.acc = acc;
        this.mass = mass;

        //this.collider = new Collision();

        this.material = material;
        this.force = this.acc.scale(this.mass);

        for (let i = 0; i < this.vects.length; i++) {

            this.normals.push(Vec2.getNormal(this.vects[i], this.vects[(i + 1) % this.vects.length]));
        }
    
    }

    update() {


        this.move();
    
    }

    move() {

        let newPos = this.polygon.position.add(this.vel);
        this.polygon.position = newPos.scale(dt);

        let newVel = this.vel.add(this.acc);
        this.vel = newVel.scale(dt);
    }
}