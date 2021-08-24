"use strict";var KTToggle=function(elementId,options){var the=this,element=KTUtil.getById(elementId);if(element){var defaultOptions={targetToggleMode:"class"},Plugin={construct:function(options){return KTUtil.data(element).has("toggle")?the=KTUtil.data(element).get("toggle"):(Plugin.init(options),Plugin.build(),KTUtil.data(element).set("toggle",the)),the},init:function(options){the.element=element,the.events=[],the.options=KTUtil.deepExtend({},defaultOptions,options),the.target=KTUtil.getById(options.target),the.targetState=the.options.targetState,the.toggleState=the.options.toggleState,"class"==the.options.targetToggleMode?the.state=KTUtil.hasClasses(the.target,the.targetState)?"on":"off":the.state=KTUtil.hasAttr(the.target,"data-"+the.targetState)?KTUtil.attr(the.target,"data-"+the.targetState):"off"},build:function(){KTUtil.addEvent(element,"mouseup",Plugin.toggle)},toggle:function(e){return Plugin.eventTrigger("beforeToggle"),"off"==the.state?Plugin.toggleOn():Plugin.toggleOff(),Plugin.eventTrigger("afterToggle"),e.preventDefault(),the},toggleOn:function(){return Plugin.eventTrigger("beforeOn"),"class"==the.options.targetToggleMode?KTUtil.addClass(the.target,the.targetState):KTUtil.attr(the.target,"data-"+the.targetState,"on"),the.toggleState&&KTUtil.addClass(element,the.toggleState),the.state="on",Plugin.eventTrigger("afterOn"),Plugin.eventTrigger("toggle"),the},toggleOff:function(){return Plugin.eventTrigger("beforeOff"),"class"==the.options.targetToggleMode?KTUtil.removeClass(the.target,the.targetState):KTUtil.removeAttr(the.target,"data-"+the.targetState),the.toggleState&&KTUtil.removeClass(element,the.toggleState),the.state="off",Plugin.eventTrigger("afterOff"),Plugin.eventTrigger("toggle"),the},eventTrigger:function(name){for(var i=0;i<the.events.length;i++){var event=the.events[i];if(event.name==name){if(1!=event.one)return event.handler.call(this,the);if(0==event.fired)return the.events[i].fired=!0,event.handler.call(this,the)}}},addEvent:function(name,handler,one){return the.events.push({name:name,handler:handler,one:one,fired:!1}),the}};return the.setDefaults=function(options){defaultOptions=options},the.getState=function(){return the.state},the.toggle=function(){return Plugin.toggle()},the.toggleOn=function(){return Plugin.toggleOn()},the.toggleOff=function(){return Plugin.toggleOff()},the.on=function(name,handler){return Plugin.addEvent(name,handler)},the.one=function(name,handler){return Plugin.addEvent(name,handler,!0)},Plugin.construct.apply(the,[options]),the}};"undefined"!=typeof module&&void 0!==module.exports&&(module.exports=KTToggle);