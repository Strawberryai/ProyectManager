attribute vec2 a_position;

uniform vec2 u_resolution;

varying vec2 v_pos;

void main(){
    vec2 uv = a_position / u_resolution;
    uv = (uv * 2.0 -1.0) * vec2(1, -1);
   
    gl_Position = vec4(uv, 0.0, 1.0);
    v_pos = uv;
}