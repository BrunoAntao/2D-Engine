class Scene {

    constructor(width = 800, height = 600, color = '#212121') {

        this.canvas = document.createElement('canvas');
        this.canvas.width = width;
        this.canvas.height = height;
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        this.color = color;

        this.children = [];

        this.events = {
            
            mouse: new MouseHandler().mouse,
            keys: new KeyHandler().keys

        }

        this.draw();

    }

    add(child) {

        this.children.push(child);

    }

    draw() {

        if(this.events.mouse.left) {

            console.log('Pressed: MouseLeft');
            console.log('coords: ' + this.events.mouse.x + ' | ' + this.events.mouse.y);

        }

        if(this.events.mouse.middle) {

            console.log('Pressed: MouseMiddle');

        }

        if(this.events.mouse.right) {

            console.log('Pressed: MouseRight');

        }

        if(this.events.keys[87]) {

            console.log('Pressed: W');

        }

        if(this.events.keys[83]) {

            console.log('Pressed: S');

        }

        if(this.events.keys[65]) {

            console.log('Pressed: A');

        }

        if(this.events.keys[68]) {

            console.log('Pressed: D');

        }

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

        this.angle = 0;

        this.points = points;

        this.fill = fill;
        this.stroke = stroke;

    }

    draw() {

        this.parent.ctx.strokeStyle = this.stroke;
        this.parent.ctx.fillStyle = this.fill;

        this.parent.ctx.moveTo(this.x + Math.floor(this.points[0].x * Math.cos(this.angle/180 * Math.PI) + this.points[0].y * Math.sin(this.angle/180 * Math.PI)), this.y + Math.floor(this.points[0].y * Math.cos(this.angle/180 * Math.PI) - this.points[0].x * Math.sin(this.angle/180 * Math.PI)));
        this.parent.ctx.beginPath();

        for(let i = 1; i < this.points.length; i++) {

            this.parent.ctx.lineTo(this.x + Math.floor(this.points[i].x * Math.cos(this.angle/180 * Math.PI) + this.points[i].y * Math.sin(this.angle/180 * Math.PI)), this.y + Math.floor(this.points[i].y * Math.cos(this.angle/180 * Math.PI) - this.points[i].x * Math.sin(this.angle/180 * Math.PI)));

        }

        this.parent.ctx.lineTo(this.x + Math.floor(this.points[0].x * Math.cos(this.angle/180 * Math.PI) + this.points[0].y * Math.sin(this.angle/180 * Math.PI)), this.y + Math.floor(this.points[0].y * Math.cos(this.angle/180 * Math.PI) - this.points[0].x * Math.sin(this.angle/180 * Math.PI)));

        this.parent.ctx.closePath();
        this.parent.ctx.fill();
        this.parent.ctx.stroke();

    }

}