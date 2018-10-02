window.addEventListener('contextmenu', function (e) {

    e.preventDefault();

});

function inbounds(p, x, y) {
    let i, j = 0;
    let c = false;
    for (i = 0, j = p.length - 1; i < p.length; j = i++) {
        if (((p[i].y > y) != (p[j].y > y)) &&
            (x < (p[j].x - p[i].x) * (y - p[i].y) / (p[j].y - p[i].y) + p[i].x))
            c = !c;
    }
    return c;
}

class KeyHandler {

    constructor() {

        this.keys = [];

        window.addEventListener("keydown", (e) => {

            this.keys[e.which || e.keyCode || 0] = true;



        })

        window.addEventListener("keyup", (e) => {

            this.keys[e.which || e.keyCode || 0] = false;

        })

    }

}

class MouseHandler {

    constructor() {

        this.mouse = {

            x: 0,
            y: 0,

            over: null,

            left: false,
            middle: false,
            right: false

        }

        window.addEventListener('mousemove', (e) => {

            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;

        })

        window.addEventListener('mousedown', (e) => {

            switch (e.button) {

                case 0: this.mouse.left = true; break;
                case 1: this.mouse.middle = true; break;
                case 2: this.mouse.right = true; break;

            }

        })

        window.addEventListener('mouseup', (e) => {

            switch (e.button) {

                case 0: this.mouse.left = false; break;
                case 1: this.mouse.middle = false; break;
                case 2: this.mouse.right = false; break;

            }

        })

    }

}

class MouseDetectionHandler {

    constructor(scene, mouse) {

        this.scene = scene;
        this.mouse = mouse;

        window.addEventListener('mousemove', (e) => {

            this.scene.children.forEach(function (child) {

                child.over = inbounds(child.vects, mouse.x, mouse.y);

            }, this)
        })

        window.addEventListener('mousedown', (e) => {

            switch (e.button) {

                case 0: this.mouse.left = true; break;
                case 1: this.mouse.middle = true; break;
                case 2: this.mouse.right = true; break;

            }

        })

        window.addEventListener('mouseup', (e) => {

            switch (e.button) {

                case 0: this.mouse.left = false; break;
                case 1: this.mouse.middle = false; break;
                case 2: this.mouse.right = false; break;

            }

        })

    }

}