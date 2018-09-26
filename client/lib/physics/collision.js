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
}