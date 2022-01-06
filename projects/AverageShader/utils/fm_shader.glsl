precision mediump float;

varying vec2 v_texture_position;

uniform sampler2D u_texture;

void main(){
    gl_FragColor = vec4(texture2D(u_texture, v_texture_position, 10.0).rgb, 1.0);
}