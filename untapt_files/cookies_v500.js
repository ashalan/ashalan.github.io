(function(window) {
    // cookie.js file
    var cookieToday = new Date();
    var expiryDate = new Date(cookieToday.getTime() + (365 * 86400000)); // a year

    /* Cookie functions originally by Bill Dortsch */

    function setCookie (name,value,opts) {
        console.log(opts.expires === Infinity);
       value = encodeURIComponent(value);
        opts = opts || {};
        var expireString = '';
        if (opts.expires) {
            if (opts.expires === Infinity) {
                expireString = 'Fri, 31 Dec 9999 23:59:59 GMT';
            } else {
                expireString = opts.expires.toGMTString();
            }
        }
       document.cookie = name + "=" + value +
       ((opts.expires)    ? "; expires=" + expireString : "") +
       ((opts.path)       ? "; path="    + opts.path   : "") +
       ((opts.domain)  ? "; domain="  + opts.domain : "") +
       ((opts.secure)     ? "; secure"            : "");
    }

    function getCookie(Name) {
       var search = Name + "="
       if (document.cookie.length > 0) { // if there are any cookies
          var offset = document.cookie.indexOf(search)
          if (offset != -1) { // if cookie exists
             offset += search.length
             // set index of beginning of value
             var end = document.cookie.indexOf(";", offset)
             // set index of end of cookie value
             if (end == -1) end = document.cookie.length
             return unescape(document.cookie.substring(offset, end))
          }
       }
    }
    function delCookie(name,path,domain) {
       if (getCookie(name)) document.cookie = name + "=" +
          ((path)   ? ";path="   + path   : "") +
          ((domain) ? ";domain=" + domain : "") +
          ";expires=Thu, 01-Jan-70 00:00:01 GMT";
    }

    window.Cookies = {
        set: setCookie,
        get: getCookie,
        expire: delCookie
    };
})(window);
