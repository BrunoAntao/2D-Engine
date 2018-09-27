class Collision {

    constructor(polygon, botVec, leftVec) {

        this.polygon = polygon;
        this.botVec = botVec;
        this.leftVec = leftVec;
    }

    AABBcheck() {}

    circleVsCircle(collider) {

        let r = this.polygon.radius + collider.radius;

        r *= r;

        return r > Math.pow(this.polygon.center.x - collider.center.x, 2) + Math.pow(this.polygon.center.y - collider.center.y, 2)
    }
    
    static collisionRevolver(bodyA, bodyB) {

        let resolventVec = bodyA.vel.subtract(bodyB.vel);

        let restitution = Math.min(bodyA.material.restitution, bodyB.material.restitution);

        let normalVector = bodyA.circle.center.subtract(bodyB.circle.center);

        normalVector = normalVector.normalize();

        let velNormal = resolventVec.dot(normalVector);

        if(velNormal == 0) return;

        let impulse = -1*(1 + restitution) * velNormal;

        impulse /= (1 / bodyA.mass.mass + 1 / bodyB.mass.mass);

        let vecImpulse = normalVector.scale(impulse);

        bodyA.vel = bodyA.vel.add(vecImpulse.scale(1 / bodyA.mass.mass))
        bodyB.vel = bodyB.vel.subtract(vecImpulse.scale(1 / bodyB.mass.mass))
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
}