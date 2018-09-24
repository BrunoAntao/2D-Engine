class RigidPolygon extends Polygon {

    constructor(parent, x, y, [...vertices], fill, stroke) {

        super(parent, x, y, vertices, fill, stroke)

        this.normals = [];

        for (let i = 0; i < this.vects.length; i++) {

            this.normals.append(vec2.getNormal(i, i + 1 % this.vects.length));
        }
    
    }


}