import hbs from 'express-handlebars';
import express from "express";

import {readDirRecursive, getReadme} from "./FReader.js";

const { engine } = hbs;

const app = express();
const port = 8000;

const projectsDir = new URL('../projects' ,import.meta.url).pathname;
const publicDir = new URL('./public' ,import.meta.url).pathname;
const viewsDir = new URL('./views' ,import.meta.url).pathname;

app.use(express.static(projectsDir));
app.use(express.static(publicDir));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', viewsDir);

app.get("/", (req, res) => {
    let data = [];
    let dirs = readDirRecursive(projectsDir);

    dirs.forEach( elm => {
        const dirName = Object.keys(elm);
        const htmlUrl = dirName + "/index.html";
        const readme = getReadme(projectsDir + "/" + dirName + "/README.md");
        const hasDesc = readme != "";

        data.push({proj: dirName, htmlUrl, hasDesc, desc: readme});
    })
    
    res.render('home', { list: data, tree: dirs, helpers: {
        json: function(contex){
            return JSON.stringify(contex);
        }
    }});
});

app.listen(port , () => {
    console.log("Listening on port: " + port);
});