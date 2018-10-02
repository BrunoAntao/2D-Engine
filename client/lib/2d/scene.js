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

        new MouseDetectionHandler(this, this.events.mouse);

        this.physics = {

            bodies: []

        }

        this.draw();

    }

    add(child) {

        this.children.push(child);

    }

    draw() {

        for (let i = 0; i < this.physics.bodies.length; i++) {

            for (let j = i + 1; j < this.physics.bodies.length; j++) {

                let childCollide = this.physics.bodies[i];
                let childTestCollide = this.physics.bodies[j];

                if (childCollide.body.collider.circleVsCircle(childTestCollide)) {

                    Collision.collisionRevolver(childCollide.body, childTestCollide.body);
                    Collision.positionalCorrection(childCollide.body, childTestCollide.body);

                }
            }
        }

        this.ctx.fillStyle = this.color;

        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.children.forEach(function (child) {

            child.draw();

        }, this)

        requestAnimationFrame(() => { this.draw(); });

    }

}
