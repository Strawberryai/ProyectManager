window.onload = function(){
    main();
}

function main(){
    const canvas = document.getElementById('mycanvas');
    const img = loadTexturesFromSource('./images/blueTree.jpeg');
    const shadersSr = loadShadersFromSource('./utils');

    const gl = canvas.getContext('webgl2');
    if(!gl) alert("Your browser does not support webgl");

    const program = createProgram(gl, shadersSr[0], shadersSr[1]);
    
}