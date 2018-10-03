class Vec2 {

    constructor(x, y) {

        this.x = x;
        this.y = y;
    }

    lenght() {

        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

    add(vec) {

        return new Vec2(vec.x + this.x, vec.y + this.y);
    }

    subtract(vec) {

        return new Vec2(this.x - vec.x, this.y -  vec.y);
    }

    scale(n) {

        return new Vec2(n*this.x, n*this.y);
    }

    dot(vec) {

        return this.x * vec.x + this.y * vec.y;
    }

    cross(vec) {

        return this.x * vec.y - this.y * vec.x;
    }

    rotate(point, angle) {

        let x = this.x - point.x;
        let y = this.y - point.y;

        let newXComp = x * Math.cos(angle) - y * Math.sin(angle);
        let newYComp = y * Math.cos(angle) + x * Math.sin(angle);

        newXComp += point.x;
        newYComp += point.y;

        return new Vec2(newXComp, newYComp)
    }

    normalize() {

        let norm = this.lenght();

        if(norm > 0) norm = 1/norm;

        return new Vec2(this.x * norm, this.y * norm);
    }

    distance(vec) {

        let x = this.x - vec.x;
        let y = this.y - vec.y;

        return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
    }

    static getNormal(v1, v2) {

        let normal = v1.subtract(v2);

        normal = normal.normalize(normal);

        let temp = normal[0];

        normal[0] = normal[1];
        normal[1] = -1*temp;

        return normal;
    }
}