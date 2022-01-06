window.onload = function(){

    Tree.forEach(dir => {
        const dirName = Object.keys(dir)[0];
        let nodes = document.getElementById(dirName).childNodes;
        let treeParent;
        let found = false; let i = 0;
        
        while(!found){
            treeParent = nodes[i];
            if(treeParent.id == "tree") found = true;
            i++;
        }

        let luNode = document.createElement("ul");
        treeParent.appendChild(luNode);
        treeParent = luNode

        generateDirTree(dir, treeParent, true);
    });
}

function generateDirTree(tree, parent, isDir){
    if(isDir){
        const nodeName = Object.keys(tree)[0];

        const thisNode = addElement(nodeName, parent, isDir);
        const dirContent = Object.values(tree)[0];
        dirContent.forEach(elm => {
            generateDirTree(elm, thisNode, typeof elm == 'object');
        })
    }else{
        addElement(tree, parent, isDir);
    }
}

function addElement(string, parent, isDir){
    const content = document.createTextNode(string);
    let contentNode = document.createElement("li");
    

    if(isDir){
        const newNode = document.createElement("ul");
        const iconNode = document.createElement("i");
        iconNode.setAttribute('class', "fas fa-folder");
        
        contentNode.appendChild(iconNode); 
        contentNode.appendChild(content); 
        contentNode.appendChild(newNode);

        parent.appendChild(contentNode);
        return newNode;

    }else{
        const iconNode = document.createElement("i");
        iconNode.setAttribute('class', "fas fa-file");
        iconNode.setAttribute('style', "color:#838392;");
        
        contentNode.appendChild(iconNode); 
        contentNode.appendChild(content);  
    }

    parent.appendChild(contentNode);
    return contentNode;
}



function updateDesc(obj){
    let arrow = obj.parentElement.childNodes[0].nextSibling.getElementsByTagName("i")[0];
    let isCollapsed = obj.getAttribute('data-collapsed') === 'true';
    if(isCollapsed) {
        arrow.style.transform = "rotate(180deg)"
        expandSection(obj)
        obj.setAttribute('data-collapsed', 'false')
    } else {
        arrow.style.transform = "rotate(0deg)"
        collapseSection(obj)
    }
}


// This is the important part!

function collapseSection(element) {
    var sectionHeight = element.scrollHeight;
    
    // temporarily disable all css transitions
    var elementTransition = element.style.transition;
    element.style.transition = '';
    
    // on the next frame (as soon as the previous style change has taken effect),
    // explicitly set the element's height to its current pixel height, so we 
    // aren't transitioning out of 'auto'
    requestAnimationFrame(function() {
        element.style.height = sectionHeight + 'px';
        element.style.transition = elementTransition;
        
        // on the next frame (as soon as the previous style change has taken effect),
        // have the element transition to height: 0
        requestAnimationFrame(function() {
            element.style.height = 0 + 'px';
            
        });
    });
    
    // mark the section as "currently collapsed"
    element.setAttribute('data-collapsed', 'true');
    let i = 0;
    let x = setInterval(function(){
        i++;
        if( i == 6){
            clearInterval(x);
            element.style.padding = 0;
        };
    }, 50);
}

function expandSection(element) {
    element.style.padding = "1em";
    element.style.paddingTop = "1em";
    element.style.paddingBottom = "1em";
    element.style.paddingLeft = "1.5em";

    // get the height of the element's inner content, regardless of its actual size
    var sectionHeight = element.scrollHeight;
    
    // have the element transition to the height of its inner content
    element.style.height = sectionHeight + 'px';
    
    // when the next css transition finishes (which should be the one we just triggered)
    element.addEventListener('transitionend', function(e) {
        // remove this event listener so it only gets triggered once
        element.removeEventListener('transitionend', arguments.callee);
        
        // remove "height" from the element's inline styles, so it can return to its initial value
        element.style.height = null;
    });
    
    // mark the section as "currently not collapsed"
    element.setAttribute('data-collapsed', 'false');
}

function buttonRedir(obj, url){
    ripple(obj);

    let i = 0;
    let x = setInterval(function(){
        i++;
        if( i == 5){
            clearInterval(x);
            window.open(url, '_blank');
        };
    }, 50);
}

function ripple(obj){
    const e = window.event;
    const elems = obj.childNodes;
    let found = false;
    let i = elems.length -1;

    while(i >= 0 && !found){
        let elemId = elems[i].id;
        if(elemId == "a-button") found = true;
        else i--;
    }
    const button = elems[i].childNodes[0].nextSibling;

    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = diameter + "px";
    circle.style.left = e.pageX - (button.offsetLeft + radius) + "px";
    circle.style.top = e.pageY - (button.offsetTop + radius) + "px";
    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];

    if (ripple) {
    ripple.remove();
    }
    button.appendChild(circle);
}
