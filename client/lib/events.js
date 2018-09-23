window.addEventListener('contextmenu', function (e) {

    e.preventDefault();

});

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
            y:0,

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