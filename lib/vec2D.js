class Vec2D {

    constructor(x, y) {

        this.x = x;
        this.y = y;
    }

    lenght() {

        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

    add(vec) {

        return new Vec2D(vec.x + this.x, vec.y + this.y);
    }

    subtract(vec) {

        return new Vec2D(this.x - vec.x, this.y -  vec.y);
    }
}