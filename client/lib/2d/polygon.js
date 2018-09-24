class Polygon {

    constructor(parent, [...vertices], fill = '#000000', stroke = '#ffffff') {

        this.parent = parent;
        this.parent.add(this);

        this.vertices = vertices;

        this.anchor = { x: MathLib.getMin(vertices, 'x'), y: MathLib.getMax(vertices, 'y') }

        this.angle = 0;

        this.fill = fill;
        this.stroke = stroke;

    }

    draw() {

        this.parent.ctx.strokeStyle = this.stroke;
        this.parent.ctx.fillStyle = this.fill;

        this.parent.ctx.moveTo(this.x + Math.floor(this.vertices[0].x * Math.cos(this.angle / 180 * Math.PI) + this.vertices[0].y * Math.sin(this.angle / 180 * Math.PI)), this.y + Math.floor(this.vertices[0].y * Math.cos(this.angle / 180 * Math.PI) - this.vertices[0].x * Math.sin(this.angle / 180 * Math.PI)));
        this.parent.ctx.beginPath();

        for (let i = 1; i < this.vertices.length; i++) {

            this.parent.ctx.lineTo(this.x + Math.floor(this.vertices[i].x * Math.cos(this.angle / 180 * Math.PI) + this.vertices[i].y * Math.sin(this.angle / 180 * Math.PI)), this.y + Math.floor(this.vertices[i].y * Math.cos(this.angle / 180 * Math.PI) - this.vertices[i].x * Math.sin(this.angle / 180 * Math.PI)));

        }

        this.parent.ctx.lineTo(this.x + Math.floor(this.vertices[0].x * Math.cos(this.angle / 180 * Math.PI) + this.vertices[0].y * Math.sin(this.angle / 180 * Math.PI)), this.y + Math.floor(this.vertices[0].y * Math.cos(this.angle / 180 * Math.PI) - this.vertices[0].x * Math.sin(this.angle / 180 * Math.PI)));

        this.parent.ctx.closePath();
        this.parent.ctx.fill();
        this.parent.ctx.stroke();

    }
}