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

        let impulse = -1*(1 + restitution) * velNormal;

        impulse /= (1 / bodyA.mass.mass + 1 / bodyB.mass.mass);

        let vecImpulse = normalVector.scale(impulse);

        bodyA.vel = bodyA.vel.add(vecImpulse.scale(1 / bodyA.mass.mass))
        bodyB.vel = bodyB.vel.add(vecImpulse.scale(1 / bodyB.mass.mass))
    }
}