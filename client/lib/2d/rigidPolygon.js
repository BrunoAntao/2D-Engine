class RigidPolygon extends Polygon {

    constructor(parent, pos = new Vec2(0, 0), vel = new Vec2(0, 0), acc = new Vec2(0, 0), [...vertices], fill, stroke) {

        super(parent, pos, vertices, fill, stroke)

        this.normals = [];
        this.vel = vel;
        this.acc = acc;
        this.gravity = 0.08;

        for (let i = 0; i < this.vects.length; i++) {

            this.normals.push(Vec2.getNormal(this.vects[i], this.vects[(i + 1) % this.vects.length]));
        }
    
    }

    update() {

        if(this.acc.y == 0) {

            this.position.x += this.vel.x;
            this.position.y += this.vel.y + 0.5*Math.pow(this.gravity, 2);

            this.vel.x += this.acc.x;
            this.vel.y += this.gravity;
        }

        else {

            this.position = this.position.add(this.vel);
            this.vel = this.vel.add(this.acc);
        }

        

    }

    move() {


    }
}