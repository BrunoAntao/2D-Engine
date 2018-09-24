class RigidPolygon extends Polygon {

    constructor(parent, [...vertices], fill, stroke) {

        super(parent, vertices, fill, stroke)

        this.normals = [];

        for (let i = 0; i < this.vects.length, i++) {

            this.normals.append(Vec2D.getNormal(i, i + 1 % this.vects.length));
        }
    
    }


}