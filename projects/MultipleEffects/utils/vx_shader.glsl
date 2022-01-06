attribute vec2 a_position;
attribute vec2 a_texture_position;
uniform vec2 u_resolution;

varying vec2 v_texture_position;

void main(){
    vec2 uv = a_position / u_resolution;
    uv = (uv * 2.0 -1.0) * vec2(1.0, -1.0);
   
    gl_Position = vec4(uv, 0.0, 1.0);
    v_texture_position = a_texture_position * vec2(1.0, -1.0) + vec2(0.0, 1.0);
}
