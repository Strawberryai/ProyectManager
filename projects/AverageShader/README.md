<img src="./AverageShader/images/square.jpg" width="200" height="50"></img>

## Descripción
En este ejemplo se consigue calcular el color medio de una imagen haciendo uso de la GPU en lugar de la CPU. Esto se consigue haciendo uso de la funcion:

> `gl.generateMipmap(texture)`

Y una serie de shader para mostrar la textura con el minimo LOD value.

## Vertex Shader

<details>
<summary> Mostrar el código del vertex shader </summary>

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
<summary> Mostrar el código del fragment shader </summary>

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
<summary> Mostrar el código de la API de WebGL </summary>

A continuación se muestra el código que compila, sube y aporta datos a los shaders.

```js
    const texture = gl.createTexture();
    
    // specify that our texture is 2-dimensional
    gl.bindTexture(gl.TEXTURE_2D, texture);
    
    // get average color
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_MIN_LOD, 0.0);
    gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_MAX_LOD, 10.0);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, img);
    gl.generateMipmap(gl.TEXTURE_2D);
    
    console.log(gl.getTexParameter(gl.TEXTURE_2D, gl.TEXTURE_MAX_LOD)); // Tiene que devolve 10.0
    
    // bind this texture to texture #0
    gl.activeTexture(gl.TEXTURE0);
```
</details>

## Puntos a mejorar v1

- Profundizar acerca de los parámetros de WebGL.
- Conversion de una imagen *non-power-of-two* a una cuyas dimensiones sí lo sean.
- Mostrar tanto la imagen como su color medio en el mismo canvas.
