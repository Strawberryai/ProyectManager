precision mediump float;

varying vec2 v_texture_position;

uniform sampler2D u_texture;
uniform vec2 u_textureSize;
uniform float u_kernel[9];
uniform float u_kernel_weight;

void main(){
    vec2 onePixel = vec2(1.0, 1.0) / u_textureSize;

    vec4 colorSum = texture2D(u_texture, v_texture_position + onePixel * vec2(-1.0, -1.0))  * u_kernel[0] +
                    texture2D(u_texture, v_texture_position + onePixel * vec2(0.0, -1.0))   * u_kernel[1] +
                    texture2D(u_texture, v_texture_position + onePixel * vec2(1.0, -1.0))   * u_kernel[2] +
                    texture2D(u_texture, v_texture_position + onePixel * vec2(-1.0, 0.0))   * u_kernel[3] +
                    texture2D(u_texture, v_texture_position + onePixel * vec2(0.0, 0.0))    * u_kernel[4] +
                    texture2D(u_texture, v_texture_position + onePixel * vec2(1.0, 0.0))    * u_kernel[5] +
                    texture2D(u_texture, v_texture_position + onePixel * vec2(-1.0, 1.0))   * u_kernel[6] + 
                    texture2D(u_texture, v_texture_position + onePixel * vec2(0.0, 1.0))    * u_kernel[7] + 
                    texture2D(u_texture, v_texture_position + onePixel * vec2(1.0, 1.0))    * u_kernel[2];

    gl_FragColor = vec4((colorSum / u_kernel_weight).rgb, 1.0);
}