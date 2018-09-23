var engine = engine || {};

engine = {

    core : function () {
    
        let canvas, context, width = 800, height = 450;
    
        canvas = document.getElementById('canvas');
        context = canvas.getContext("2d");
        canvas.height = height;
        canvas.width = width;
    
        return {
    
            width: width,
            height: height,
            context: context
        };
    }
}