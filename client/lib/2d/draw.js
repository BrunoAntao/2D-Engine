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

        requestAnimationFrame(() => { 
        

            for(let i = 0; i < this.children.length; i++) {

                for(let j = i + 1; j < this.children.length; j++) {

                    let childCollide = this.children[i];
                    let childTestCollide = this.children[j];

                    if(childCollide.body && childTestCollide.body) {

                        if(childCollide.body.collider.circleVsCircle(childTestCollide)) console.log("collision");
                        
                    }
                }
            }

            this.children.forEach(child => {
                
                child.update();

            }, this);

            this.draw();
        
        });

    }

}
