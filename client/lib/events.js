window.addEventListener('contextmenu', function (e) {

    e.preventDefault();

});

class KeyHandler {

    constructor() {

        this.keys = [];

        document.addEventListener("keydown", (e) => {

            this.keys[e.which || e.keyCode || 0] = true;



        })

        document.addEventListener("keyup", (e) => {

            this.keys[e.which || e.keyCode || 0] = false;

        })

    }

}