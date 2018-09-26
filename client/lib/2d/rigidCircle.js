
class RigidCircle {

    constructor(circle, vel = new Vec2(0, 0), acc = new Vec2(0, 0), mass = new Mass(1, 0), material = new Material(1, 0)) {

        this.circle = circle;

        this.vel = vel;
        this.acc = acc;
        this.mass = mass;

        this.material = material;

        this.force = this.acc.scale(this.mass);
    }

    update() {


        this.move();
    
    }

    move() {

        let newPos = this.circle.center.add(this.vel);
        this.circle.center = newPos.scale(dt);

        let newVel = this.vel.add(this.acc);
        this.vel = newVel.scale(dt);
    }
}