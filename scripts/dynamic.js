async function appendModule(module, element) {
    if (element == null) {
        console.error('element is null - cannot append module');
        return false;
    }
    if (element.indexOf('#') == 0) {
        element = element.substring(1);
        element = document.getElementById(element);
    } else if (element.indexOf('.') == 0) {
        element = element.substring(1);
        element = document.getElementsByClassName(element)[0];
    }
    // pull module from modules folder
    let moduleFile = './modules/' + module + '.html';
    console.log(moduleFile);

    try {
        const response = await $.ajax({
            url: moduleFile,
            method: 'GET',
        });
        const parser = new DOMParser();
        const data = parser.parseFromString(response, 'text/html');
        element.append(data.body.firstChild);
        return true;
    } catch (error) {
        console.error('Error appending module:', error);
        return false;
    }
}
function changeBreadCrumb(newBreadCrumbText) {
    let oldBreadCrumb = $('#navbar').find('.active');
    if (oldBreadCrumb.length == 0) {
        console.warn('Could not find active bread crumb');
        return;
    }
    oldBreadCrumb.removeClass('active');
    let tempBreadCrumb = $('#navbar').find(".nav-link:contains('" + newBreadCrumbText + "')");
    if (tempBreadCrumb.length == 0) {
        console.warn('Could not find bread crumb ' + newBreadCrumbText);
        return;
    }
    tempBreadCrumb.addClass('active');
    console.log('Changing BreadCrumb to ' + newBreadCrumbText);
}
