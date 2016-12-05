// adds a viewport tag for iPad
if(navigator.userAgent.match(/iPad/i) != null){
    var meta_tag  = document.createElement("meta");
    meta_tag.name = "viewport";
    meta_tag.content = "initial-scale=0.75";
    document.getElementsByTagName('head')[0].appendChild(meta_tag);
}