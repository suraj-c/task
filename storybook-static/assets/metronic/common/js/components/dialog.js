"use strict";var KTDialog=function(options){var element,the=this,body=KTUtil.getBody(),defaultOptions={placement:"top center",type:"loader",width:100,state:"default",message:"Loading..."},Plugin={construct:function(options){return Plugin.init(options),the},init:function(options){the.events=[],the.options=KTUtil.deepExtend({},defaultOptions,options),the.state=!1},show:function(){return Plugin.eventTrigger("show"),element=document.createElement("DIV"),KTUtil.setHTML(element,the.options.message),KTUtil.addClass(element,"dialog dialog-shown"),KTUtil.addClass(element,"dialog-"+the.options.state),KTUtil.addClass(element,"dialog-"+the.options.type),"top center"==the.options.placement&&KTUtil.addClass(element,"dialog-top-center"),body.appendChild(element),the.state="shown",Plugin.eventTrigger("shown"),the},hide:function(){return element&&(Plugin.eventTrigger("hide"),element.remove(),the.state="hidden",Plugin.eventTrigger("hidden")),the},eventTrigger:function(name){for(var i=0;i<the.events.length;i++){var event=the.events[i];if(event.name==name){if(1!=event.one)return event.handler.call(this,the);if(0==event.fired)return the.events[i].fired=!0,event.handler.call(this,the)}}},addEvent:function(name,handler,one){return the.events.push({name:name,handler:handler,one:one,fired:!1}),the}};return the.setDefaults=function(options){defaultOptions=options},the.shown=function(){return"shown"==the.state},the.hidden=function(){return"hidden"==the.state},the.show=function(){return Plugin.show()},the.hide=function(){return Plugin.hide()},the.on=function(name,handler){return Plugin.addEvent(name,handler)},the.one=function(name,handler){return Plugin.addEvent(name,handler,!0)},Plugin.construct.apply(the,[options]),the};"undefined"!=typeof module&&void 0!==module.exports&&(module.exports=KTDialog);