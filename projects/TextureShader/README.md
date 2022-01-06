<img src="./TextureShader/images/texture.jpeg" width="200" height="50"></img>

## Descripción
Este es un ejemplo de introdución al manejo de shaders con WebGL. Todo el proyecto está basado en la serie de tutoriales [WebGL Fundamentals](https://webglfundamentals.org/webgl/lessons/webgl-fundamentals.html) y lo expuesto a continuación es una síntesis del mismo.

## Concepto básico
WebGL es una librería que facilita la ejecución de programas en la CPU. Dicha ejecución se simplifica en dos pasos principales: primero se tienen una serie de coordenadas o vértices que se quieren dibujar, luego necesitamos un programa que procese esas coordenadas y las transforme en nuevos puntos del *clip space* (sistema de coordenadas empleado por WebGL), y otro que se encarge de tomar estos puntos, procesarlos y asignar un color a cada pixel de la pantalla.

Estos programas que se ejecutan en la GPU son conocidos como shaders y, fundamentalmente, podemos distinguir dos: el Vertex Shader y el Fragment Shader.

## Vertex Shader
<details>
<summary> Mostrar el código del vertex shader </summary>

El vertex shader se encarga de tomar los 6 puntos de 2 triángulos dados en pixeles y pasar las coordenadas correspomdientes del clip space al fragment shader.

```C++
attribute vec2 a_position;
attribute vec2 a_texture_position;

uniform vec2 u_resolution;
varying vec2 v_texture_position;

void main(){
    vec2 uv = a_position / u_resolution;
    uv = (uv * 2.0 -1.0) * vec2(1, -1);
   
    gl_Position = vec4(uv, 0.0, 1.0);
    v_texture_position = a_texture_position;
}
```
</details>

## Fragment Shader
<details>
<summary> Mostrar el código del vertex shader </summary>

Es el encargado de tomar cada punto rasterizado de la geometría dada al vertex shader y aplicarle un color. En este caso dicho color será el pixel correspondiente de la textura.

```C++
precision mediump float;

varying vec2 v_texture_position;
varying vec2 v_pos;
uniform sampler2D u_texture;

void main(){
    gl_FragColor = texture2D(u_texture, v_texture_position);
}
```
</details>

## Código WebGl
<details>
    <summary> Mostrar el código principal de la API de WebGL </summary>
A continuación se muestra el código que compila, sube y aporta datos a los shaders.

```js
    const canvas = document.getElementById("mycanvas");
    const img = await loadTexturesFromSource('./images/texture.jpeg');
    const shadersSr = await loadShadersFromSource(); 
    
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
```

</details>

## Features

- Import a HTML file and watch it magically convert to Markdown
- Drag and drop images (requires your Dropbox account be linked)
- Import and save files from GitHub, Dropbox, Google Drive and One Drive
- Drag and drop markdown and HTML files into Dillinger
- Export documents as Markdown, HTML and PDF

Markdown is a lightweight markup language based on the formatting conventions
that people naturally use in email.

> The overriding design goal for Markdown's
> formatting syntax is to make it as readable
> as possible. The idea is that a
> Markdown-formatted document should be
> publishable as-is, as plain text, without
> looking like it's been marked up with tags
> or formatting instructions.

## Installation

Dillinger requires [Node.js](https://nodejs.org/) v10+ to run.

Install the dependencies and devDependencies and start the server.

```sh
cd dillinger
npm i
node app
```

For production environments...

```sh
npm install --production
NODE_ENV=production node app
```

> Note: `--capt-add=SYS-ADMIN` is required for PDF rendering.