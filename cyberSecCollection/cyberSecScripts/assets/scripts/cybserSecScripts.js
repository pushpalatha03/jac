import { Scripts } from "../data/dataScripts.js";

var help = document.getElementById("help");
help.addEventListener("click", function() {
 
 if (!document.getElementById("popup")) {
     
 var popup = document.createElement("div");
 popup.id = "popup";
 popup.classList.add("absolute", "top-0", "left-0", "w-screen", "h-screen", "bg-black/80","backdrop-blur-md", "flex", "justify-center", "items-center");
 popup.innerHTML = `
 <div class="bg-[#0f0f0f] rounded-lg p-4 w-1/3 h-1/3 flex flex-col gap-2">
 <h1 class="text-white text-2xl font-bold text-center">Help</h1>    
 <p class="text-white text-sm text-justify">
   This is a collection of cybersecurity scripts that can be used for various purposes. It includes scripts for web application penetration testing, network scanning, and more.<br>
    Simply copy and paste the script into the terminal (preferably Kali) of the linux distribution you are using with required dependencies installed and run it.
 </p>
 <button id="popupClose" class="mt-1 self-center w-32 rounded-md p-2 hover:cursor-pointer text-white border border-white hover:shadow-[0_0_6px_-1px_rgba(255,255,255,0.75)] bg-[#3f3f3f]">close</button>
 </div>
 `;
 document.body.appendChild(popup);
 var close = document.getElementById("popupClose");
 close.addEventListener("click", function() {
     document.body.removeChild(popup);
 });
 } else {
     document.body.removeChild(popup);
 }
});

var list = document.getElementById("list");
var openList = "";

const htmlEncode = (str) =>  (str.replace(/[\u00A0-\u9999<>\&]/g, function(i) {
    return '&#'+i.charCodeAt(0)+';';
 }));

const HandleDropDown = (script,id)=>{

    if (openList !== "" && openList !== id){
        HandleDropDown(null,openList);
    }

    var ele = document.querySelector(`#list-${id}`);
    var icon = ele.querySelector(`#icon-${id}`);
    var headDiv = ele.querySelector(`#head-${id}`);
    if(script && icon.innerHTML.includes("fa-plus")){
        icon.innerHTML = `<i class="fa-solid fa-minus"></i>`;
        var detailsDiv = document.createElement("div");
        detailsDiv.setAttribute("id",`details-${id}`);
        detailsDiv.classList.add("flex", "flex-col", "gap-2");
        var codeSection = document.createElement("div");
        var codeHeaderDiv = document.createElement("div");
        codeHeaderDiv.classList.add("flex", "justify-between");
        var header = document.createElement("h2");
        header.classList.add("ml-1", "text-white", "text-md", "font-bold");
        header.innerText = "Script";
        var copyIcon = document.createElement("i");
        copyIcon.classList.add("fa-solid", "fa-copy", "mr-4", "text-sm", "cursor-pointer", "text-white", "hover:text-cyan-200");
        copyIcon.addEventListener("click",(e)=>{e.preventDefault();navigator.clipboard.writeText(script.script);e.target.classList.remove("fa-solid");e.target.classList.remove("fa-copy");e.target.classList.remove("text-white");e.target.classList.add("text-cyan-200");e.target.innerText = "Copied!";});
        var codeBody = document.createElement("div");
        codeBody.classList.add("bg-[#0f0f0f]", "p-2", "rounded-md", "shadow-[0_0_2px_0px_rgba(255,255,255,0.2)]");
        codeBody.innerHTML = `<pre class="text-gray-400 text-sm">${htmlEncode(script.script)}</pre>`;
        codeHeaderDiv.appendChild(header);
        codeHeaderDiv.appendChild(copyIcon);
        codeSection.appendChild(codeHeaderDiv);
        codeSection.appendChild(codeBody);
        var descSection = document.createElement("div");
        descSection.innerHTML = `<h2 class="text-white text-md font-bold">Description</h2><p class="text-gray-200 text-sm">${htmlEncode(script.description)}</p>`;
        var usageSection = document.createElement("div");
        usageSection.innerHTML = `<h2 class="text-white text-md font-bold">Usage</h2><p class="text-gray-200 text-sm">${htmlEncode(script.usage)}</p>`;
        if(script.dependencies.length > 0)
            {
                var dependenciesSection = document.createElement("div");
                dependenciesSection.innerHTML = `<h2 class="text-white text-md font-bold">Dependencies</h2>`;
                dependenciesSection.innerHTML += script.dependencies.map(dependency=>`<a class="text-gray-200 text-sm underline underline-offset-2 hover:text-cyan-200 cursor-pointer" target="_blank" href="${dependency.url}">${dependency.name}</a>`).join(", ");
            }
        var tagsSection = document.createElement("div");
        tagsSection.innerHTML = `<h2 class="text-white text-md font-bold">Tags</h2><p class="text-gray-200 text-sm">${htmlEncode(script.tags.join(", "))}</p>`;   
        headDiv.classList.remove("hover:text-2xl", "hover:text-cyan-200");
        headDiv.classList.add("text-2xl","text-cyan-200");
        detailsDiv.appendChild(codeSection);
        detailsDiv.appendChild(descSection);
        detailsDiv.appendChild(usageSection);
        if(script.dependencies.length > 0)
        {
            detailsDiv.appendChild(dependenciesSection);
        }
        detailsDiv.appendChild(tagsSection);
        ele.appendChild(detailsDiv);
        openList = id;
    }else{
        icon.innerHTML = `<i class="fa-solid fa-plus"></i>`;
        var detailsDiv = document.querySelector(`#details-${id}`);
        if(detailsDiv){
            ele.removeChild(detailsDiv);
            headDiv.classList.remove("text-2xl","text-cyan-200");
            headDiv.classList.add("hover:text-2xl", "hover:text-cyan-200");
            openList = "";
        }

    }
    
    
};

const renderListItems = (script, id)=>{
    // list item rendering  
    var listItem = document.createElement("div");
    listItem.setAttribute("id",`list-${id}`);
    listItem.classList.add("flex", "flex-col", "gap-2", "bg-[#1e1e1e]","p-2","m-1",  "rounded-md", "shadow-[0_0_4px_1px_rgba(255,255,255,0.4)]");
    var headDiv = document.createElement("div");
    headDiv.setAttribute("id",`head-${id}`);
    headDiv.classList.add("flex", "cursor-pointer","align-middle","text-xl","justify-between", "text-white","duration-75","ease-out","hover:ease-in","hover:text-2xl","w-100","hover:text-cyan-200", "h-100");
    headDiv.addEventListener("click", ()=>HandleDropDown(script,id));
    var listHeader = document.createElement("h2");
    listHeader.classList.add("font-bold", "underline","p-1", "decoration-1", "underline-offset-2");
    listHeader.innerText = script.name;
    var dropDiv = document.createElement("div");
    dropDiv.setAttribute("id",`icon-${id}`);
    dropDiv.classList.add("p-1", "mr-4");
    dropDiv.innerHTML = `<i class="fa-solid fa-plus "></i>`;
    headDiv.appendChild(listHeader);
    headDiv.appendChild(dropDiv);
    listItem.appendChild(headDiv);
    return listItem;
}

window.onload = function() {
    Scripts.forEach((script,idx) => {
        const listItem = renderListItems(script,idx);
        list.appendChild(listItem);
    });
}


const search = (searchText)=>{
    var res = new Set();
    searchText = searchText.split(" ");
    Scripts.forEach(script => {
       if(searchText.some(word=> (word.trim() === "")?false:script.tags.some(c=> c.toLowerCase().startsWith(word.trim().toLowerCase())))){
           res.add(script);
       }
       if(searchText.some(word=> (word.trim() === "")?false:script.name.trim().toLowerCase().startsWith(word.trim().toLowerCase()))){
           res.add(script);
       }
    });
    return Array.from(res);
}

const searchFromData = async (searchText)=>{
    const res= search(searchText);
    //render components
    if (res === null || res === undefined || res.length === 0)
    {
        list.innerHTML = "";
        list.classList.remove("overflow-y-auto");
        list.classList.add("overflow-hidden");
        var noDataFoundDiv = document.createElement("div");
        noDataFoundDiv.classList.add("flex", "flex-col", "justify-center", "items-center", "h-full", "w-full");
        noDataFoundDiv.innerHTML = `<h1 class="text-white text-3xl font-bold">Ahh! Don't have it yet! I'll try to add it asap😉</h1>`;
        list.appendChild(noDataFoundDiv);
    }
    else{
        list.classList.remove("overflow-hidden");
        list.classList.add("overflow-y-auto");
        list.innerHTML = "";
        res.forEach((script,idx) => {
            const listItem = renderListItems(script,idx);
            list.appendChild(listItem);
        });
    }
   

}



var searchBox = document.getElementById("search");

searchBox.addEventListener("input", (event)=> {
    var searchText = event.target.value;
    if (searchText.trim() === "")
    {  
        list.innerHTML = "";
        list.classList.add("overflow-y-auto");
        list.classList.remove("overflow-hidden");
        Scripts.forEach((script,idx) => {
            const listItem = renderListItems(script,idx);
            list.appendChild(listItem);
        });
        return;
    }
    else{
        searchFromData(event.target.value);
    }
});

// copyright 2024 by Aguru Darshan