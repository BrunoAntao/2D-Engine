class Material {

    constructor(density = 1, restitution = 0, staticFriction = 1, dynamicFriction = 0.8) {

        this.density = density;
        this.restitution = restitution;
        this.staticFriction = staticFriction;
        this.dynamicFriction = dynamicFriction;
    }
}