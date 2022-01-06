async function loadTexturesFromSource(path){
    let image = new Image();
    image.src = path;
    return image;
}

async function loadShadersFromSource(path){
    let vx_shaderSr = await makeRequest('GET', path +'/vx_shader.glsl');
    let fm_shaderSr = await makeRequest('GET', path + '/fm_shader.glsl');
    return [vx_shaderSr, fm_shaderSr];

    function makeRequest(method, url) {
        return new Promise(function (resolve, reject) {
            let httpReq = new XMLHttpRequest();
            httpReq.open(method, url);
            
            httpReq.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    resolve(httpReq.response);
                } else {
                    reject({
                        status: this.status,
                        statusText: httpReq.statusText
                    });
                }
            };
            
            httpReq.onerror = function () {
                reject({
                    status: this.status,
                    statusText: httpReq.statusText
                });
            };
            
            httpReq.send();
        });
    }
}


function createProgram(gl, vx_shaderSR, fm_shaderSR){
    const program = gl.createProgram();
    const vx_shader = gl.createShader(gl.VERTEX_SHADER);
    const fm_shader = gl.createShader(gl.FRAGMENT_SHADER);
    
    gl.shaderSource(vx_shader, vx_shaderSR);
    gl.shaderSource(fm_shader, fm_shaderSR);
    
    gl.compileShader(vx_shader);
    gl.compileShader(fm_shader);
    
    gl.attachShader(program, vx_shader);
    gl.attachShader(program, fm_shader);
    
    gl.linkProgram(program);
    
    const success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if(success){
        gl.useProgram(program);
        return program;
    }
    
    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
}