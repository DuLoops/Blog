var root = "/website/img/";
var current_filter = "filter_all";
var photoName = "";
var isPopup = false;


function popup(){
    document.getElementById("popup").classList.toggle("show");
}

function setFilter(element) {
    document.getElementById(current_filter).classList.remove("active_filterLi");
    current_filter = $(element)[0].id;
    document.getElementById(current_filter).classList.add("active_filterLi");
    if (current_filter == "filter_all") {
        root = "/website/img/";
    } else {
        root = "/website/img/" + $(element)[0].outerText + "/";
    }
    document.getElementById("mobile_gallery_filter_title").innerHTML = $(element)[0].outerText;
    loadPics();
}

//Helper for loadPics()
// Extract the title and possible links
function extractInfoFromPicture(name) {
    // If _: Only title, No link
    // If -: Title + link
    var title;
    if (name.charAt(1) == '_') {
        title = name.split('_').pop().split('.')[0];
        return decodeURI(title);
    } else {
        title = name.split('_').pop().split('.')[0];

    }
}

function loadPics() {
    document.getElementById("gallery").innerHTML = '';
    var filename;
    $.ajax({
        url : root,
        success: function (data) {
            $(data).find("a").attr("href", function (i, val) {
                if( val.match(/\.(jpe?g|png|gif|JPG)$/) ) {
                    var img = document.createElement("img");
                    photoName = val;
                    // For server
                    img.src = root + val;

                    // For VS code
                    img.src = val;
                    // If the second char is _ or -, set the title and possible link
                    // Extracting Title
                    filename = val.substring(val.lastIndexOf('/') + 1);
                    if (filename.charAt(1) == '_' || filename.charAt(1) == '-') {
                        img.dataset.title = extractInfoFromPicture(filename);
                        
                    } else {
                        img.dataset.title = " ";
                    }
                    // img.dataset.title = "*_Title Example-tooth_gap_guy";
                    img.addEventListener('click', select_photo, true);
                    // console.log(val);        
                    $("#gallery").append(img);
                } 
            }); 
        }
    });     
}

function close_image_info() {
    document.getElementById("photo_info").classList.toggle("show_info");
    isPopup = false;
}

function select_photo(element) {
    document.getElementById("photo_info_img").src = element.srcElement.src;
    document.getElementById("photo_info_title").innerHTML = element.srcElement.dataset.title;
    if (!isPopup) {
        isPopup = true;
        document.getElementById("photo_info").classList.toggle("show_info");
    }
};



loadPics();
