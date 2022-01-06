precision mediump float;

varying vec2 v_pos;
uniform float u_iTime;

void main(){
    vec3 col = 0.5 + 0.5*cos(u_iTime + v_pos.xyx + vec3(0,2,4));
    
    gl_FragColor = vec4(col, 1.0);
}