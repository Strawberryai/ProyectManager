<img src="./MultipleEffects/images/lake.jpeg" width="200" height="50"></img>

## Descripción

En este ejemplo se muestra como aplicar varios efectos simultaneamente sobre
una textura. Este proceso se lleva a cabo siguiendo el siguiente esquema:

> Original Image -> [Blur]          -> Texture 1
>
> Texture 1      -> [Sharpen]       -> Texture 2
>
> Texture 2      -> [Edge Detect]   -> Texture 1
>
> Texture 1      -> [Blur]          -> Texture 2
>
> Texture 2      -> [Normal]        -> Canvas

## Vertex Shader

<details>
<summary> Mostrar el código del vertex shader </summary>

```C++
```
</details>

## Fragment Shader

<details>
<summary> Mostrar el código del fragment shader </summary>

Es el encargado de tomar cada punto rasterizado de la geometría dada al vertex shader y aplicarle un color. En este caso dicho color será el pixel correspondiente de la textura.

```C++
```
</details>

## Código WebGl

<details>
<summary> Mostrar el código de la API de WebGL </summary>

A continuación se muestra el código que compila, sube y aporta datos a los shaders.

```js
```
</details>

## Puntos a mejorar v1
