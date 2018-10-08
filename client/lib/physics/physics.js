var Physics = {};

Physics.Collision = class {

    constructor(polygon, botVec, leftVec) {

        this.polygon = polygon;
        this.botVec = botVec;
        this.leftVec = leftVec;
    }

    static circleVsCircle(c1, c2) {

        let r = c1.polygon.radius + c2.radius;

        r *= r;

        return r >  Math.pow(c1.polygon.center.x - c2.center.x, 2) +
                    Math.pow(c1.polygon.center.y - c2.center.y, 2)
    }
    
    static collisionRevolver(bodyA, bodyB) {

        let result = this.getImpulse(bodyA, bodyB);

        let vecImpulse = result.vector;

        let vecFriction = this.getFriction(bodyA, bodyB, result.impulse);

        bodyA.vel = bodyA.vel.add(vecImpulse.scale(1 / bodyA.mass.mass))
        bodyB.vel = bodyB.vel.subtract(vecImpulse.scale(1 / bodyB.mass.mass))
       
        bodyA.vel = bodyA.vel.add(vecFriction.scale(1 / bodyA.mass.mass))
        bodyB.vel = bodyB.vel.subtract(vecFriction.scale(1 / bodyB.mass.mass))
       
    }

    static positionalCorrection(bodyA, bodyB) {

        let percent = 0.2;

        let distance = bodyB.circle.center.subtract(bodyA.circle.center);
        let normal = distance.normalize();
        let penetration = bodyA.circle.radius + bodyB.circle.radius - distance.lenght();
        
        let divisor = penetration / (bodyA.mass.mass + bodyB.mass.mass) * percent;

        let correction = normal.scale(divisor);

        bodyA.circle.center = bodyA.circle.center.subtract(correction.scale(1 / bodyA.mass.mass ))
        bodyB.circle.center = bodyB.circle.center.add(correction.scale(1 / bodyB.mass.mass ))
    }

    static getImpulse(bodyA, bodyB) {

        let resolventVec = bodyA.vel.subtract(bodyB.vel);

        let restitution = Math.min(bodyA.material.restitution, bodyB.material.restitution);

        let normalVector = bodyA.circle.center.subtract(bodyB.circle.center);

        normalVector = normalVector.normalize();

        let velNormal = resolventVec.dot(normalVector);

        if(velNormal == 0) return;

        let impulse = -1*(1 + restitution) * velNormal;

        impulse /= (1 / bodyA.mass.mass + 1 / bodyB.mass.mass);

        return {vector: normalVector.scale(impulse), impulse: impulse};
    }

    static getFriction(bodyA, bodyB, resolImpulse) {

        let resolventVec = bodyA.vel.subtract(bodyB.vel);
        let normalVector = bodyA.circle.center.subtract(bodyB.circle.center);
        
        normalVector = normalVector.normalize();

        let resolventNormal = resolventVec.dot(normalVector);

        normalVector = normalVector.scale(resolventNormal);

        let tangentVector = resolventVec.subtract(normalVector);
        tangentVector = tangentVector.normalize();

        let impulse = -1*resolventVec.dot(tangentVector);
        impulse /= (1 / bodyA.mass.mass + 1 / bodyB.mass.mass);

        let staticFriction = Math.sqrt(Math.pow(bodyA.material.staticFriction, 2),
                                Math.pow(bodyB.material.staticFriction, 2));

        let frictionImpulse = new Vec2(0, 0);

        if( Math.abs(impulse) < resolImpulse * staticFriction) {
            
            frictionImpulse = tangentVector.scale(impulse) 
        }

        else {

            let dynamicFriction = Math.sqrt(Math.pow(bodyA.material.dynamicFriction, 2),
                                    Math.pow(bodyB.material.dynamicFriction, 2));

            frictionImpulse = tangentVector.scale(dynamicFriction*resolImpulse*-1);
        }

        return frictionImpulse;
    }
}

Physics.Mass = class {

    constructor(mass = 1, inertia = 0) {

        this.mass = mass;
        this.inertia = inertia;
    }
}

Physics.Material = class {

    constructor(density = 1, restitution = 0, staticFriction = 1, dynamicFriction = 0.8) {

        this.density = density;
        this.restitution = restitution;
        this.staticFriction = staticFriction;
        this.dynamicFriction = dynamicFriction;
    }
}

Physics.RigidCircle = class {

    constructor(circle, mass = new Mass(1, 0), material = new Material(1, 0)) {

        this.circle = circle;
        circle.parent.physics.bodies.push(circle);

        this.vel = circle.vel;
        this.acc = circle.acc;
        this.mass = new Physics.Mass();

        //this.collider = new Physics.Collision().circleVsCircle()

        this.material = new Physics.Material();

        this.force = this.acc.scale(this.mass.mass);
    }

    update() {

        this.move();
    
    }

    move() {

        let newPos = this.circle.center.add(this.vel);
        this.circle.center = newPos;

        let newVel = this.vel.add(this.acc);
        this.circle.vel = newVel;
    }

    applyForce(force) {

        this.force = this.force.add(force);

        this.acc = this.force.scale(1 / this.mass.mass);
    }
}

Physics.RigidPolygon = class {

    constructor(polygon, vects, options = {}) {


        Object.assign(this, {

            vel: new Vec2(0, 0), 
            acc: new Vec2(0, 0), 
            mass: new Mass(1, 0), 
            material: new Material(1, 0)

        }, options);

        this.polygon = polygon;

        this.vects = vects;
        this.normals = [];

        //this.collider = new Physics.Collision();

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

    applyForce(force) {

        this.force = this.force.add(force);

        this.acc = this.force.scale(1 / this.mass.mass);
    }
}