class Scene {

    constructor(width = 800, height = 600, color = '#212121') {

        this.canvas = document.createElement('canvas');
        this.canvas.width = width;
        this.canvas.height = height;
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        this.color = color;

        this.i = 0;

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