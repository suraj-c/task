/*! For license information please see util.js.LICENSE.txt */
"use strict";function _typeof(obj){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function _typeof(obj){return typeof obj}:function _typeof(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj})(obj)}function _instanceof(left,right){return null!=right&&"undefined"!=typeof Symbol&&right[Symbol.hasInstance]?!!right[Symbol.hasInstance](left):left instanceof right}Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector),Element.prototype.closest||(Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector),Element.prototype.closest=function(s){var ancestor=this;if(!document.documentElement.contains(this))return null;do{if(ancestor.matches(s))return ancestor;ancestor=ancestor.parentElement}while(null!==ancestor);return null}),function(elem){for(var i=0;i<elem.length;i++)window[elem[i]]&&!("remove"in window[elem[i]].prototype)&&(window[elem[i]].prototype.remove=function(){this.parentNode.removeChild(this)})}(["Element","CharacterData","DocumentType"]),function(){for(var lastTime=0,vendors=["webkit","moz"],x=0;x<vendors.length&&!window.requestAnimationFrame;++x)window.requestAnimationFrame=window[vendors[x]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[vendors[x]+"CancelAnimationFrame"]||window[vendors[x]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(callback){var currTime=(new Date).getTime(),timeToCall=Math.max(0,16-(currTime-lastTime)),id=window.setTimeout((function(){callback(currTime+timeToCall)}),timeToCall);return lastTime=currTime+timeToCall,id}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(id){clearTimeout(id)})}(),[Element.prototype,Document.prototype,DocumentFragment.prototype].forEach((function(item){item.hasOwnProperty("prepend")||Object.defineProperty(item,"prepend",{configurable:!0,enumerable:!0,writable:!0,value:function prepend(){var argArr=Array.prototype.slice.call(arguments),docFrag=document.createDocumentFragment();argArr.forEach((function(argItem){var isNode=_instanceof(argItem,Node);docFrag.appendChild(isNode?argItem:document.createTextNode(String(argItem)))})),this.insertBefore(docFrag,this.firstChild)}})})),window.KTUtilElementDataStore={},window.KTUtilElementDataStoreID=0,window.KTUtilDelegatedEventHandlers={};var KTUtil=function(){var resizeHandlers=[],breakpoints={sm:544,md:768,lg:992,xl:1200},_windowResizeHandler=function _windowResizeHandler(){window.addEventListener("resize",(function(){KTUtil.throttle(undefined,(function(){!function _runResizeHandlers(){for(var i=0;i<resizeHandlers.length;i++)resizeHandlers[i].call()}()}),200)}))};return{init:function init(settings){settings&&settings.breakpoints&&(breakpoints=settings.breakpoints),_windowResizeHandler()},addResizeHandler:function addResizeHandler(callback){resizeHandlers.push(callback)},removeResizeHandler:function removeResizeHandler(callback){for(var i=0;i<resizeHandlers.length;i++)callback===resizeHandlers[i]&&delete resizeHandlers[i]},runResizeHandlers:function runResizeHandlers(){_runResizeHandlers()},resize:function resize(){if("function"==typeof Event)window.dispatchEvent(new Event("resize"));else{var evt=window.document.createEvent("UIEvents");evt.initUIEvent("resize",!0,!1,window,0),window.dispatchEvent(evt)}},getURLParam:function getURLParam(paramName){var i,val,params=window.location.search.substring(1).split("&");for(i=0;i<params.length;i++)if((val=params[i].split("="))[0]==paramName)return unescape(val[1]);return null},isMobileDevice:function isMobileDevice(){return this.getViewPort().width<this.getBreakpoint("lg")},isDesktopDevice:function isDesktopDevice(){return!KTUtil.isMobileDevice()},getViewPort:function getViewPort(){var e=window,a="inner";return"innerWidth"in window||(a="client",e=document.documentElement||document.body),{width:e[a+"Width"],height:e[a+"Height"]}},isInResponsiveRange:function isInResponsiveRange(mode){var breakpoint=this.getViewPort().width;return"general"==mode||("desktop"==mode&&breakpoint>=this.getBreakpoint("lg")+1||("tablet"==mode&&breakpoint>=this.getBreakpoint("md")+1&&breakpoint<this.getBreakpoint("lg")||("mobile"==mode&&breakpoint<=this.getBreakpoint("md")||("desktop-and-tablet"==mode&&breakpoint>=this.getBreakpoint("md")+1||("tablet-and-mobile"==mode&&breakpoint<=this.getBreakpoint("lg")||"minimal-desktop-and-below"==mode&&breakpoint<=this.getBreakpoint("xl"))))))},isBreakpointUp:function isBreakpointUp(mode){return this.getViewPort().width>=this.getBreakpoint(mode)},isBreakpointDown:function isBreakpointDown(mode){return this.getViewPort().width<this.getBreakpoint(mode)},getUniqueID:function getUniqueID(prefix){return prefix+Math.floor(Math.random()*(new Date).getTime())},getBreakpoint:function getBreakpoint(mode){return breakpoints[mode]},isset:function isset(obj,keys){var stone;if(-1!==(keys=keys||"").indexOf("["))throw new Error("Unsupported object path notation.");keys=keys.split(".");do{if(void 0===obj)return!1;if(stone=keys.shift(),!obj.hasOwnProperty(stone))return!1;obj=obj[stone]}while(keys.length);return!0},getHighestZindex:function getHighestZindex(el){for(var position,value;el&&el!==document;){if(("absolute"===(position=KTUtil.css(el,"position"))||"relative"===position||"fixed"===position)&&(value=parseInt(KTUtil.css(el,"z-index")),!isNaN(value)&&0!==value))return value;el=el.parentNode}return null},hasFixedPositionedParent:function hasFixedPositionedParent(el){for(;el&&el!==document;){if("fixed"===KTUtil.css(el,"position"))return!0;el=el.parentNode}return!1},sleep:function sleep(milliseconds){for(var start=(new Date).getTime(),i=0;i<1e7&&!((new Date).getTime()-start>milliseconds);i++);},getRandomInt:function getRandomInt(min,max){return Math.floor(Math.random()*(max-min+1))+min},isAngularVersion:function isAngularVersion(){return void 0!==window.Zone},deepExtend:function deepExtend(out){out=out||{};for(var i=1;i<arguments.length;i++){var obj=arguments[i];if(obj)for(var key in obj)obj.hasOwnProperty(key)&&("object"===_typeof(obj[key])?out[key]=KTUtil.deepExtend(out[key],obj[key]):out[key]=obj[key])}return out},extend:function extend(out){out=out||{};for(var i=1;i<arguments.length;i++)if(arguments[i])for(var key in arguments[i])arguments[i].hasOwnProperty(key)&&(out[key]=arguments[i][key]);return out},getById:function getById(el){return"string"==typeof el?document.getElementById(el):el},getByTag:function getByTag(query){return document.getElementsByTagName(query)},getByTagName:function getByTagName(query){return document.getElementsByTagName(query)},getByClass:function getByClass(query){return document.getElementsByClassName(query)},getBody:function getBody(){return document.getElementsByTagName("body")[0]},hasClasses:function hasClasses(el,classes){if(el){for(var classesArr=classes.split(" "),i=0;i<classesArr.length;i++)if(0==KTUtil.hasClass(el,KTUtil.trim(classesArr[i])))return!1;return!0}},hasClass:function hasClass(el,className){if(el)return el.classList?el.classList.contains(className):new RegExp("\\b"+className+"\\b").test(el.className)},addClass:function addClass(el,className){if(el&&void 0!==className){var classNames=className.split(" ");if(el.classList)for(var i=0;i<classNames.length;i++)classNames[i]&&classNames[i].length>0&&el.classList.add(KTUtil.trim(classNames[i]));else if(!KTUtil.hasClass(el,className))for(var x=0;x<classNames.length;x++)el.className+=" "+KTUtil.trim(classNames[x])}},removeClass:function removeClass(el,className){if(el&&void 0!==className){var classNames=className.split(" ");if(el.classList)for(var i=0;i<classNames.length;i++)el.classList.remove(KTUtil.trim(classNames[i]));else if(KTUtil.hasClass(el,className))for(var x=0;x<classNames.length;x++)el.className=el.className.replace(new RegExp("\\b"+KTUtil.trim(classNames[x])+"\\b","g"),"")}},triggerCustomEvent:function triggerCustomEvent(el,eventName,data){var event;window.CustomEvent?event=new CustomEvent(eventName,{detail:data}):(event=document.createEvent("CustomEvent")).initCustomEvent(eventName,!0,!0,data),el.dispatchEvent(event)},triggerEvent:function triggerEvent(node,eventName){var doc;if(node.ownerDocument)doc=node.ownerDocument;else{if(9!=node.nodeType)throw new Error("Invalid node passed to fireEvent: "+node.id);doc=node}if(node.dispatchEvent){var eventClass="";switch(eventName){case"click":case"mouseenter":case"mouseleave":case"mousedown":case"mouseup":eventClass="MouseEvents";break;case"focus":case"change":case"blur":case"select":eventClass="HTMLEvents";break;default:throw"fireEvent: Couldn't find an event class for event '"+eventName+"'."}var bubbles="change"!=eventName;(event=doc.createEvent(eventClass)).initEvent(eventName,bubbles,!0),event.synthetic=!0,node.dispatchEvent(event,!0)}else if(node.fireEvent){var event;(event=doc.createEventObject()).synthetic=!0,node.fireEvent("on"+eventName,event)}},index:function index(el){for(var c=el.parentNode.children,i=0;i<c.length;i++)if(c[i]==el)return i},trim:function trim(string){return string.trim()},eventTriggered:function eventTriggered(e){return!!e.currentTarget.dataset.triggered||(e.currentTarget.dataset.triggered=!0,!1)},remove:function remove(el){el&&el.parentNode&&el.parentNode.removeChild(el)},find:function find(parent,query){if(parent=KTUtil.getById(parent))return parent.querySelector(query)},findAll:function findAll(parent,query){if(parent=KTUtil.getById(parent))return parent.querySelectorAll(query)},insertAfter:function insertAfter(el,referenceNode){return referenceNode.parentNode.insertBefore(el,referenceNode.nextSibling)},parents:function parents(elem,selector){Element.prototype.matches||(Element.prototype.matches=Element.prototype.matchesSelector||Element.prototype.mozMatchesSelector||Element.prototype.msMatchesSelector||Element.prototype.oMatchesSelector||Element.prototype.webkitMatchesSelector||function(s){for(var matches=(this.document||this.ownerDocument).querySelectorAll(s),i=matches.length;--i>=0&&matches.item(i)!==this;);return i>-1});for(var parents=[];elem&&elem!==document;elem=elem.parentNode)selector?elem.matches(selector)&&parents.push(elem):parents.push(elem);return parents},children:function children(el,selector,log){if(el&&el.childNodes){for(var result=[],i=0,l=el.childNodes.length;i<l;++i)1==el.childNodes[i].nodeType&&KTUtil.matches(el.childNodes[i],selector,log)&&result.push(el.childNodes[i]);return result}},child:function child(el,selector,log){var children=KTUtil.children(el,selector,log);return children?children[0]:null},matches:function matches(el,selector,log){var p=Element.prototype,f=p.matches||p.webkitMatchesSelector||p.mozMatchesSelector||p.msMatchesSelector||function(s){return-1!==[].indexOf.call(document.querySelectorAll(s),this)};return!(!el||!el.tagName)&&f.call(el,selector)},data:function data(el){return{set:function set(name,data){el&&(void 0===el.customDataTag&&(window.KTUtilElementDataStoreID++,el.customDataTag=window.KTUtilElementDataStoreID),void 0===window.KTUtilElementDataStore[el.customDataTag]&&(window.KTUtilElementDataStore[el.customDataTag]={}),window.KTUtilElementDataStore[el.customDataTag][name]=data)},get:function get(name){if(el)return void 0===el.customDataTag?null:this.has(name)?window.KTUtilElementDataStore[el.customDataTag][name]:null},has:function has(name){return!!el&&(void 0!==el.customDataTag&&!(!window.KTUtilElementDataStore[el.customDataTag]||!window.KTUtilElementDataStore[el.customDataTag][name]))},remove:function remove(name){el&&this.has(name)&&delete window.KTUtilElementDataStore[el.customDataTag][name]}}},outerWidth:function outerWidth(el,margin){var width;return!0===margin?(width=parseFloat(el.offsetWidth),width+=parseFloat(KTUtil.css(el,"margin-left"))+parseFloat(KTUtil.css(el,"margin-right")),parseFloat(width)):width=parseFloat(el.offsetWidth)},offset:function offset(el){var rect,win;if(el)return el.getClientRects().length?(rect=el.getBoundingClientRect(),win=el.ownerDocument.defaultView,{top:rect.top+win.pageYOffset,left:rect.left+win.pageXOffset}):{top:0,left:0}},height:function height(el){return KTUtil.css(el,"height")},outerHeight:function outerHeight(el){var style,withMargic=arguments.length>1&&void 0!==arguments[1]&&arguments[1],height=el.offsetHeight;return withMargic?(style=getComputedStyle(el),height+=parseInt(style.marginTop)+parseInt(style.marginBottom)):height},visible:function visible(el){return!(0===el.offsetWidth&&0===el.offsetHeight)},attr:function attr(el,name,value){if(null!=el)return void 0===value?el.getAttribute(name):void el.setAttribute(name,value)},hasAttr:function hasAttr(el,name){if(null!=el)return!!el.getAttribute(name)},removeAttr:function removeAttr(el,name){null!=el&&el.removeAttribute(name)},animate:function animate(from,to,duration,update,easing,done){var easings={};if(easings.linear=function(t,b,c,d){return c*t/d+b},easing=easings.linear,"number"==typeof from&&"number"==typeof to&&"number"==typeof duration&&"function"==typeof update){"function"!=typeof done&&(done=function done(){});var rAF=window.requestAnimationFrame||function(callback){window.setTimeout(callback,20)},change=to-from;update(from);var start=window.performance&&window.performance.now?window.performance.now():+new Date;rAF((function loop(timestamp){var time=(timestamp||+new Date)-start;time>=0&&update(easing(time,from,change,duration)),time>=0&&time>=duration?(update(to),done()):rAF(loop)}))}},actualCss:function actualCss(el,prop,cache){var value,css="";if(!1!==_instanceof(el,HTMLElement))return el.getAttribute("kt-hidden-"+prop)&&!1!==cache?parseFloat(el.getAttribute("kt-hidden-"+prop)):(css=el.style.cssText,el.style.cssText="position: absolute; visibility: hidden; display: block;","width"==prop?value=el.offsetWidth:"height"==prop&&(value=el.offsetHeight),el.style.cssText=css,el.setAttribute("kt-hidden-"+prop,value),parseFloat(value))},actualHeight:function actualHeight(el,cache){return KTUtil.actualCss(el,"height",cache)},actualWidth:function actualWidth(el,cache){return KTUtil.actualCss(el,"width",cache)},getScroll:function getScroll(element,method){return method="scroll"+method,element==window||element==document?self["scrollTop"==method?"pageYOffset":"pageXOffset"]||browserSupportsBoxModel&&document.documentElement[method]||document.body[method]:element[method]},css:function css(el,styleProp,value){if(el)if(void 0!==value)el.style[styleProp]=value;else{var defaultView=(el.ownerDocument||document).defaultView;if(defaultView&&defaultView.getComputedStyle)return styleProp=styleProp.replace(/([A-Z])/g,"-$1").toLowerCase(),defaultView.getComputedStyle(el,null).getPropertyValue(styleProp);if(el.currentStyle)return styleProp=styleProp.replace(/\-(\w)/g,(function(str,letter){return letter.toUpperCase()})),value=el.currentStyle[styleProp],/^\d+(em|pt|%|ex)?$/i.test(value)?function(value){var oldLeft=el.style.left,oldRsLeft=el.runtimeStyle.left;return el.runtimeStyle.left=el.currentStyle.left,el.style.left=value||0,value=el.style.pixelLeft+"px",el.style.left=oldLeft,el.runtimeStyle.left=oldRsLeft,value}(value):value}},slide:function slide(el,dir,speed,callback,recalcMaxHeight){if(!(!el||"up"==dir&&!1===KTUtil.visible(el)||"down"==dir&&!0===KTUtil.visible(el))){speed=speed||600;var calcHeight=KTUtil.actualHeight(el),calcPaddingTop=!1,calcPaddingBottom=!1;KTUtil.css(el,"padding-top")&&!0!==KTUtil.data(el).has("slide-padding-top")&&KTUtil.data(el).set("slide-padding-top",KTUtil.css(el,"padding-top")),KTUtil.css(el,"padding-bottom")&&!0!==KTUtil.data(el).has("slide-padding-bottom")&&KTUtil.data(el).set("slide-padding-bottom",KTUtil.css(el,"padding-bottom")),KTUtil.data(el).has("slide-padding-top")&&(calcPaddingTop=parseInt(KTUtil.data(el).get("slide-padding-top"))),KTUtil.data(el).has("slide-padding-bottom")&&(calcPaddingBottom=parseInt(KTUtil.data(el).get("slide-padding-bottom"))),"up"==dir?(el.style.cssText="display: block; overflow: hidden;",calcPaddingTop&&KTUtil.animate(0,calcPaddingTop,speed,(function(value){el.style.paddingTop=calcPaddingTop-value+"px"}),"linear"),calcPaddingBottom&&KTUtil.animate(0,calcPaddingBottom,speed,(function(value){el.style.paddingBottom=calcPaddingBottom-value+"px"}),"linear"),KTUtil.animate(0,calcHeight,speed,(function(value){el.style.height=calcHeight-value+"px"}),"linear",(function(){el.style.height="",el.style.display="none","function"==typeof callback&&callback()}))):"down"==dir&&(el.style.cssText="display: block; overflow: hidden;",calcPaddingTop&&KTUtil.animate(0,calcPaddingTop,speed,(function(value){el.style.paddingTop=value+"px"}),"linear",(function(){el.style.paddingTop=""})),calcPaddingBottom&&KTUtil.animate(0,calcPaddingBottom,speed,(function(value){el.style.paddingBottom=value+"px"}),"linear",(function(){el.style.paddingBottom=""})),KTUtil.animate(0,calcHeight,speed,(function(value){el.style.height=value+"px"}),"linear",(function(){el.style.height="",el.style.display="",el.style.overflow="","function"==typeof callback&&callback()})))}},slideUp:function slideUp(el,speed,callback){KTUtil.slide(el,"up",speed,callback)},slideDown:function slideDown(el,speed,callback){KTUtil.slide(el,"down",speed,callback)},show:function show(el,display){void 0!==el&&(el.style.display=display||"block")},hide:function hide(el){void 0!==el&&(el.style.display="none")},addEvent:function addEvent(el,type,handler,one){null!=el&&el.addEventListener(type,handler)},removeEvent:function removeEvent(el,type,handler){null!==el&&el.removeEventListener(type,handler)},on:function on(element,selector,event,handler){if(selector){var eventId=KTUtil.getUniqueID("event");return window.KTUtilDelegatedEventHandlers[eventId]=function(e){for(var targets=element.querySelectorAll(selector),target=e.target;target&&target!==element;){for(var i=0,j=targets.length;i<j;i++)target===targets[i]&&handler.call(target,e);target=target.parentNode}},KTUtil.addEvent(element,event,window.KTUtilDelegatedEventHandlers[eventId]),eventId}},off:function off(element,event,eventId){element&&window.KTUtilDelegatedEventHandlers[eventId]&&(KTUtil.removeEvent(element,event,window.KTUtilDelegatedEventHandlers[eventId]),delete window.KTUtilDelegatedEventHandlers[eventId])},one:function onetime(el,type,callback){el.addEventListener(type,(function callee(e){return e.target&&e.target.removeEventListener&&e.target.removeEventListener(e.type,callee),el&&el.removeEventListener&&e.currentTarget.removeEventListener(e.type,callee),callback(e)}))},hash:function hash(str){var i,hash=0;if(0===str.length)return hash;for(i=0;i<str.length;i++)hash=(hash<<5)-hash+str.charCodeAt(i),hash|=0;return hash},animateClass:function animateClass(el,animationName,callback){var animation,animations={animation:"animationend",OAnimation:"oAnimationEnd",MozAnimation:"mozAnimationEnd",WebkitAnimation:"webkitAnimationEnd",msAnimation:"msAnimationEnd"};for(var t in animations)void 0!==el.style[t]&&(animation=animations[t]);KTUtil.addClass(el,"animated "+animationName),KTUtil.one(el,animation,(function(){KTUtil.removeClass(el,"animated "+animationName)})),callback&&KTUtil.one(el,animation,callback)},transitionEnd:function transitionEnd(el,callback){var transition,transitions={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"mozTransitionEnd",WebkitTransition:"webkitTransitionEnd",msTransition:"msTransitionEnd"};for(var t in transitions)void 0!==el.style[t]&&(transition=transitions[t]);KTUtil.one(el,transition,callback)},animationEnd:function animationEnd(el,callback){var animation,animations={animation:"animationend",OAnimation:"oAnimationEnd",MozAnimation:"mozAnimationEnd",WebkitAnimation:"webkitAnimationEnd",msAnimation:"msAnimationEnd"};for(var t in animations)void 0!==el.style[t]&&(animation=animations[t]);KTUtil.one(el,animation,callback)},animateDelay:function animateDelay(el,value){for(var vendors=["webkit-","moz-","ms-","o-",""],i=0;i<vendors.length;i++)KTUtil.css(el,vendors[i]+"animation-delay",value)},animateDuration:function animateDuration(el,value){for(var vendors=["webkit-","moz-","ms-","o-",""],i=0;i<vendors.length;i++)KTUtil.css(el,vendors[i]+"animation-duration",value)},scrollTo:function scrollTo(target,offset,duration){duration=duration||500;var from,to,targetPos=target?KTUtil.offset(target).top:0,scrollPos=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0;offset&&(scrollPos+=offset),from=scrollPos,to=targetPos,KTUtil.animate(from,to,duration,(function(value){document.documentElement.scrollTop=value,document.body.parentNode.scrollTop=value,document.body.scrollTop=value}))},scrollTop:function scrollTop(offset,duration){KTUtil.scrollTo(null,offset,duration)},isArray:function isArray(obj){return obj&&Array.isArray(obj)},ready:function ready(callback){(document.attachEvent?"complete"===document.readyState:"loading"!==document.readyState)?callback():document.addEventListener("DOMContentLoaded",callback)},isEmpty:function isEmpty(obj){for(var prop in obj)if(obj.hasOwnProperty(prop))return!1;return!0},numberString:function numberString(nStr){for(var x=(nStr+="").split("."),x1=x[0],x2=x.length>1?"."+x[1]:"",rgx=/(\d+)(\d{3})/;rgx.test(x1);)x1=x1.replace(rgx,"$1,$2");return x1+x2},detectIE:function detectIE(){var ua=window.navigator.userAgent,msie=ua.indexOf("MSIE ");if(msie>0)return parseInt(ua.substring(msie+5,ua.indexOf(".",msie)),10);if(ua.indexOf("Trident/")>0){var rv=ua.indexOf("rv:");return parseInt(ua.substring(rv+3,ua.indexOf(".",rv)),10)}var edge=ua.indexOf("Edge/");return edge>0&&parseInt(ua.substring(edge+5,ua.indexOf(".",edge)),10)},isRTL:function isRTL(){var html=KTUtil.getByTagName("html")[0];if(html)return"rtl"==KTUtil.attr(html,"direction")},scrollInit:function scrollInit(element,options){if(element){options=KTUtil.deepExtend({},{wheelSpeed:.5,swipeEasing:!0,wheelPropagation:!1,minScrollbarLength:40,maxScrollbarLength:300,suppressScrollX:!0},options),init(),options.handleWindowResize&&KTUtil.addResizeHandler((function(){init()}))}function init(){var ps,height,attrs=element.getAttributeNames();if(attrs.length>0&&attrs.forEach((function(attrName){if(/^data-.*/g.test(attrName)&&0==["scroll","height","mobile-height"].includes(optionName)){var optionName=attrName.replace("data-","").toLowerCase().replace(/(?:[\s-])\w/g,(function(match){return match.replace("-","").toUpperCase()}));options[optionName]=KTUtil.filterBoolean(element.getAttribute(attrName))}})),!1!==(height=_instanceof(options.height,Function)?options.height.call():options.mobileHeight?parseInt(options.mobileHeight):parseInt(options.height)))if(height=parseInt(height),(options.mobileNativeScroll||options.disableForMobile)&&KTUtil.isBreakpointDown("lg"))(ps=KTUtil.data(element).get("ps"))?(options.resetHeightOnDestroy?KTUtil.css(element,"height","auto"):(KTUtil.css(element,"overflow","auto"),height>0&&KTUtil.css(element,"height",height+"px")),ps.destroy(),ps=KTUtil.data(element).remove("ps")):height>0&&(KTUtil.css(element,"overflow","auto"),KTUtil.css(element,"height",height+"px"));else if(height>0&&KTUtil.css(element,"height",height+"px"),options.desktopNativeScroll)KTUtil.css(element,"overflow","auto");else{"true"==KTUtil.attr(element,"data-window-scroll")&&(options.windowScroll=!0),(ps=KTUtil.data(element).get("ps"))?ps.update():(KTUtil.css(element,"overflow","hidden"),KTUtil.addClass(element,"scroll"),ps=new PerfectScrollbar(element,options),KTUtil.data(element).set("ps",ps));KTUtil.attr(element,"id")}else KTUtil.scrollDestroy(element,!0)}},scrollUpdate:function scrollUpdate(element){var ps=KTUtil.data(element).get("ps");ps&&ps.update()},scrollUpdateAll:function scrollUpdateAll(parent){for(var scrollers=KTUtil.findAll(parent,".ps"),i=0,len=scrollers.length;i<len;i++)KTUtil.scrollUpdate(scrollers[i])},scrollDestroy:function scrollDestroy(element,resetAll){var ps=KTUtil.data(element).get("ps");ps&&(ps.destroy(),ps=KTUtil.data(element).remove("ps")),element&&resetAll&&(element.style.setProperty("overflow",""),element.style.setProperty("height",""))},filterBoolean:function filterBoolean(val){return!0===val||"true"===val||!1!==val&&"false"!==val&&val},setHTML:function setHTML(el,html){el.innerHTML=html},getHTML:function getHTML(el){if(el)return el.innerHTML},getDocumentHeight:function getDocumentHeight(){var body=document.body,html=document.documentElement;return Math.max(body.scrollHeight,body.offsetHeight,html.clientHeight,html.scrollHeight,html.offsetHeight)},getScrollTop:function getScrollTop(){return(document.scrollingElement||document.documentElement).scrollTop},colorDarken:function colorDarken(color,amount){var subtractLight=function subtractLight(color,amount){var cc=parseInt(color,16)-amount,c=cc<0?0:cc;return c=c.toString(16).length>1?c.toString(16):"0".concat(c.toString(16))};return color=color.indexOf("#")>=0?color.substring(1,color.length):color,amount=parseInt(255*amount/100),"#".concat(subtractLight(color.substring(0,2),amount)).concat(subtractLight(color.substring(2,4),amount)).concat(subtractLight(color.substring(4,6),amount))},colorLighten:function colorLighten(color,amount){var addLight=function addLight(color,amount){var cc=parseInt(color,16)+amount,c=cc>255?255:cc;return c=c.toString(16).length>1?c.toString(16):"0".concat(c.toString(16))};return color=color.indexOf("#")>=0?color.substring(1,color.length):color,amount=parseInt(255*amount/100),"#".concat(addLight(color.substring(0,2),amount)).concat(addLight(color.substring(2,4),amount)).concat(addLight(color.substring(4,6),amount))},throttle:function throttle(timer,func,delay){timer||(timer=setTimeout((function(){func(),timer=void 0}),delay))},debounce:function debounce(timer,func,delay){clearTimeout(timer),timer=setTimeout(func,delay)},btnWait:function btnWait(el,cls,message){var disable=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];if(el&&(disable&&KTUtil.attr(el,"disabled",!0),cls&&(KTUtil.addClass(el,cls),KTUtil.attr(el,"wait-class",cls)),message)){var caption=KTUtil.find(el,".btn-caption");caption?(KTUtil.data(caption).set("caption",KTUtil.getHTML(caption)),KTUtil.setHTML(caption,message)):(KTUtil.data(el).set("caption",KTUtil.getHTML(el)),KTUtil.setHTML(el,message))}},btnRelease:function btnRelease(el){if(el){KTUtil.removeAttr(el,"disabled"),KTUtil.hasAttr(el,"wait-class")&&KTUtil.removeClass(el,KTUtil.attr(el,"wait-class"));var caption=KTUtil.find(el,".btn-caption");caption&&KTUtil.data(caption).has("caption")?KTUtil.setHTML(caption,KTUtil.data(caption).get("caption")):KTUtil.data(el).has("caption")&&KTUtil.setHTML(el,KTUtil.data(el).get("caption"))}},isOffscreen:function isOffscreen(el,direction){var offset=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,windowWidth=KTUtil.getViewPort().width,windowHeight=KTUtil.getViewPort().height,top=KTUtil.offset(el).top,height=KTUtil.outerHeight(el)+offset,left=KTUtil.offset(el).left,width=KTUtil.outerWidth(el)+offset;if("bottom"==direction){if(windowHeight<top+height)return!0;if(windowHeight>top+1.5*height)return!0}if("top"==direction){if(top<0)return!0;if(top>height)return!0}return"left"==direction&&left<0||"right"==direction&&windowWidth<left+width}}}();"undefined"!=typeof module&&void 0!==module.exports&&(module.exports=KTUtil),KTUtil.ready((function(){"undefined"!=typeof KTAppSettings?KTUtil.init(KTAppSettings):KTUtil.init()})),window.onload=function(){var result=KTUtil.getByTagName("body");result&&result[0]&&KTUtil.removeClass(result[0],"page-loading")};