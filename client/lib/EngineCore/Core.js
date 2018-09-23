class Engine {

    constructor(width = 800, height = 800) {

        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext("2d");
        this.height = height;
        this.width = width;

        this.canvas.width = width;
        this.canvas.height = height;
    }

}