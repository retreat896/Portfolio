function appendModule(module, element) {
    if(element == null) {
        console.error("element is null - cannot append module");
    }
    if(element.indexOf("#") == 0) {
        element = element.substring(1);
        element = document.getElementById(element);
    }else if(element.indexOf(".") == 0) {
        element = element.substring(1);
        element = document.getElementsByClassName(element)[0];
    }
    //pull module from modules folder
    let moduleFile = "./modules/" + module + ".html";
    console.log(moduleFile);
    
    $.get(moduleFile, function(data){
        let parser = new DOMParser();
        data = parser.parseFromString(data, "text/html");
        element.append(data.body.firstChild);
    });
}
