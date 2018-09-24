class Polygon {

    constructor(parent, [...vertices], fill = '#000000', stroke = '#ffffff') {

        this.parent = parent;
        this.parent.add(this);

        this.vertices = vertices

        this.vects = vertices.map( vertex => new Vec2D(vertex.x, vertex.y))

        this.anchor = {x: MathLib.getMin(vertices, 'x'), y: MathLib.getMin(vertices, 'y')}

        this.fill = fill;
        this.stroke = stroke;

    }

    draw() {

        this.parent.ctx.strokeStyle = this.stroke;
        this.parent.ctx.fillStyle = this.fill;

        this.parent.ctx.moveTo(this.vertices[0].x, this.vertices[0].y);
        this.parent.ctx.beginPath();

        for (let i = 1; i < this.vertices.length; i++) {
           
            this.parent.ctx.lineTo(this.vertices[0].x + this.vertices[i].x, this.vertices[0].y + this.vertices[i].y);
        }

        this.parent.ctx.closePath();
        this.parent.ctx.fill();
        this.parent.ctx.stroke();
    }
}