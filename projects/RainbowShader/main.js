window.onload = function(){
    main();
}

async function main(){
    const canvas = document.getElementById("mycanvas");
    const shadersSr = await loadShadersFromSource('./utils'); 
    
    const gl = canvas.getContext("webgl");
    
    if(!gl) alert("Your browser does not support webgl");
    const wd = gl.canvas.width;
    const hg = gl.canvas.height;
    
    // Create the program
    const program = createProgram(gl, shadersSr[0], shadersSr[1]);
    
    // GEOMETRY --------------------
    const points = [
        0, 0, 
        wd, 0, 
        0, hg,
        wd, hg,
        wd, 0, 
        0, hg
    ];
    const pointsBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, pointsBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);
    
    const a_postionLocation = gl.getAttribLocation(program, 'a_position');
    gl.vertexAttribPointer(a_postionLocation, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_postionLocation);
    
    // Resolution uniform
    const u_resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
    gl.uniform2f(u_resolutionLocation, wd, hg);
    let i = 0;
    let x = setInterval(()=> {
        // iTime uniform
        const u_iTime = gl.getUniformLocation(program, 'u_iTime');
        gl.uniform1f(u_iTime, i);
        
        // Draw the whole thing
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        i += 0.1;
    }, 20);
    
}