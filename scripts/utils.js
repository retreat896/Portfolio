$(document).ready(function () {
    appendModule("navbar", "#header").then(function () {
       onPageLoad();
    });
 });

async function appendModule(module, element) {
    return new Promise((resolve, reject) => {
        if (element == null) {
            reject("element is null - cannot append module");
        }
        if (element.indexOf("#") == 0) {
            element = element.substring(1);
            element = document.getElementById(element);
        } else if (element.indexOf(".") == 0) {
            element = element.substring(1);
            element = document.getElementsByClassName(element)[0];
        }
        //pull module from modules folder
        let moduleFile = "./modules/" + module + ".html";
        console.log(moduleFile);

        $.get(moduleFile, function (data) {
            let parser = new DOMParser();
            data = parser.parseFromString(data, "text/html");
            element.append(data.body.firstChild);
            resolve(true);
        }).fail(function () {
            reject(false);
        });
    })
}
async function onPageLoad() {
    return new Promise((resolve, reject) => {
        try {
            $(".pageLoadShow").each(function () { 
                $(this).removeClass("pageLoadShow");
            });
            setTimeout(function () {
                $(".pageLoadHide").animate({
                    opacity: 0
                });
            }, 500);
            resolve(true);
        } catch (error) {
            console.log(error);
            reject(false);
        }
    })
}

function changePage(url) {
    // Check if the URL starts with "https://github"
    if (url.indexOf("https://github") === 0) {
        console.log("github");

        // Hide current loader animation
        $("#loadNewPageAnimation").removeClass("loader").parent().css("opacity", "1").css('transition', 'opacity 0s ease-in-out');

        // Show the new animation smoothly
        $("#loadNewPageAnimation").addClass("changePageGithub");
        
        // Redirect after animation completes
        setTimeout(function () {
            window.location.href = url;
        }, 1000);

        return;
    }

    // handle local testing with localhost
    if(window.location.origin.indexOf("localhost") > -1 || window.location.origin.indexOf("127.0.0.1") > -1){
        url= url.replace("https://", "http://");
        if((url!="http://localhost:3000/" || url!="http://127.0.0.1:3000/")&&(url != "http://localhost/" && url != "http://127.0.0.1:3000/")){
            url = url + ".html"
        }
    }

    console.log("Transfering User to " + url);
    $("#loadNewPageAnimation").removeClass("loader").parent().css("opacity", "1").css('transition', 'opacity .25s ease-in-out');

    // Show the new animation smoothly
    setTimeout(function () {
        $("#loadNewPageAnimation").addClass("changePageDefault");
    },100);
    
    // Redirect after animation completes
    setTimeout(function () {
        window.location.href = url;
    }, 1200);
}




