"use strict";var KTCookie={getCookie:function(name){var matches=document.cookie.match(new RegExp("(?:^|; )"+name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g,"\\$1")+"=([^;]*)"));return matches?decodeURIComponent(matches[1]):void 0},setCookie:function(name,value,options){options||(options={}),(options=Object.assign({},{path:"/"},options)).expires instanceof Date&&(options.expires=options.expires.toUTCString());var updatedCookie=encodeURIComponent(name)+"="+encodeURIComponent(value);for(var optionKey in options)if(options.hasOwnProperty(optionKey)){updatedCookie+="; "+optionKey;var optionValue=options[optionKey];!0!==optionValue&&(updatedCookie+="="+optionValue)}document.cookie=updatedCookie},deleteCookie:function(name){setCookie(name,"",{"max-age":-1})}};"undefined"!=typeof module&&void 0!==module.exports&&(module.exports=KTCookie);