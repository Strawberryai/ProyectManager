import MarkdownIt from "markdown-it";
import fs from "fs";

const md = new MarkdownIt({ html: true });

export function readDirRecursive(path){
    let content = fs.readdirSync(path, {withFileTypes: true});
    let data = [];
    
    content.forEach(dirent =>{
        let name = dirent.name;
        if(dirent.isDirectory()){
            let pair = new Object();
            pair[name] = readDirRecursive(path + "/" + name);
            data.push(pair);
        }else{
            if(name != ".DS_Store") data.push(name);
        }
    });

    return data;
}

export function getReadme(path){
    let readme;
    let hasDesc = false;
    try {
        readme = fs.readFileSync(path, { withFileTypes: true }).toString();
        hasDesc = true;
    } catch (err) {}

    if(hasDesc) return md.render(readme);
    return "";
}