class RigidCircle {

    constructor(circle, mass = new Mass(1, 0), material = new Material(1, 0)) {

        this.circle = circle;
        circle.parent.physics.bodies.push(circle);

        this.vel = circle.vel;
        this.acc = circle.acc;
        this.mass = mass;

        this.collider = new Physics.Collision(circle, undefined, undefined);

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