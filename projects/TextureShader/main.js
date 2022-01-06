window.onload = function(){
    main();
}


async function main(){
    const canvas = document.getElementById("mycanvas");
    const img = await loadTexturesFromSource('./images/texture.jpeg');
    const shadersSr = await loadShadersFromSource('./utils'); 
    
    const gl = canvas.getContext("webgl2");
    
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
    
    // TEXTURE  --------------------
    // Texture image
    // create a new texture
	const texture = gl.createTexture();

	// specify that our texture is 2-dimensional
	gl.bindTexture(gl.TEXTURE_2D, texture);

	// upload the 2D image (img) and specify that it contains RGBA data
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, img);

	// tell WebGL how to choose pixels when drawing our non-square image
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

	// bind this texture to texture #0
	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, texture);

	// use the texture for the uniform in our program called "u_texture",
	gl.uniform1i(gl.getUniformLocation(program, 'u_texture'), 0);
    
    // Texture points
    const texPoints = [
        0, 1,
        1, 1,
        0, 0,
        1, 0,
        1, 1,
        0, 0,
    ];
    const texBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texPoints), gl.STATIC_DRAW);
    
    const a_texposLocation = gl.getAttribLocation(program, 'a_texture_position');
    gl.vertexAttribPointer(a_texposLocation, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_texposLocation);
    
    
    // Resolution uniform
    const u_resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
    gl.uniform2f(u_resolutionLocation, wd, hg);

    const u_textureSizeLocation = gl.getUniformLocation(program, 'u_textureSize');
    gl.uniform2f(u_textureSizeLocation, img.width, img.height);

    let kernel = [
        0, 1, 0,
        1, 1, 1,
        0, 1, 0
    ];

    const u_kernelLocation = gl.getUniformLocation(program, 'u_kernel[0]');
    gl.uniform1fv(u_kernelLocation, kernel);

    const u_kernel_weightLocation = gl.getUniformLocation(program, 'u_kernel_weight');
    gl.uniform1f(u_kernel_weightLocation, getKernelWeight(kernel));

    gl.drawArrays(gl.TRIANGLES, 0, 6);
    
}
