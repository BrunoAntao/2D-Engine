class Scene {

    constructor(width = 800, height = 600, color = '#212121') {

        this.canvas = document.createElement('canvas');
        this.canvas.width = width;
        this.canvas.height = height;
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        this.color = color;

        this.children = [];

        this.draw();

    }

    add(child) {

        this.children.push(child);

    }

    draw() {

        this.ctx.fillStyle = this.color;

        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.children.forEach(function (child) {

            child.draw();

        }, this)

        requestAnimationFrame(()=>this.draw());

    }

}

class Poly {

    constructor (parent, x = 0, y = 0, points = [], fill = '#000000', stroke = '#ffffff') {

        this.parent = parent;
        this.parent.add(this);

        this.x = x;
        this.y = y;

        this.points = points;

        this.fill = fill;
        this.stroke = stroke;

    }

    draw() {

        this.parent.ctx.strokeStyle = this.stroke;
        this.parent.ctx.fillStyle = this.fill;

        this.parent.ctx.moveTo(this.x, this.y);
        this.parent.ctx.beginPath();

        this.points.forEach(function(point) {

            this.parent.ctx.lineTo(this.x + point.x, this.y + point.y);

        }, this)

        this.parent.ctx.closePath();
        this.parent.ctx.fill();
        this.parent.ctx.stroke();

    }

}