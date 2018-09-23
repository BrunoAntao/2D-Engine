var engine = engine || {};

engine.Core = function () {
    
    let canvas, context, width = 800, height = 450;

    canvas = document.getElementById('canvas');
    context = canvas.getContext("2d");
    canvas.height = height;
    canvas.width = width;

    let public = {

        width: width,
        height: height,
        context: context
    }

    return public;
}