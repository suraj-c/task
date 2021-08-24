"use strict";var KTMenu=function(elementId,options){var the=this,init=!1,element=KTUtil.getById(elementId),body=KTUtil.getBody();if(element){var defaultOptions={scroll:{rememberPosition:!1},accordion:{slideSpeed:200,autoScroll:!1,autoScrollSpeed:1200,expandAll:!0},dropdown:{timeout:500}},Plugin={construct:function(options){return KTUtil.data(element).has("menu")?the=KTUtil.data(element).get("menu"):(Plugin.init(options),Plugin.reset(),Plugin.build(),KTUtil.data(element).set("menu",the)),the},init:function(options){the.events=[],the.eventHandlers={},the.options=KTUtil.deepExtend({},defaultOptions,options),the.pauseDropdownHoverTime=0,the.uid=KTUtil.getUniqueID()},update:function(options){the.options=KTUtil.deepExtend({},defaultOptions,options),the.pauseDropdownHoverTime=0,Plugin.reset(),the.eventHandlers={},Plugin.build(),KTUtil.data(element).set("menu",the)},reload:function(){Plugin.reset(),Plugin.build(),Plugin.resetSubmenuProps()},build:function(){the.eventHandlers.event_1=KTUtil.on(element,".menu-toggle","click",Plugin.handleSubmenuAccordion),("dropdown"===Plugin.getSubmenuMode()||Plugin.isConditionalSubmenuDropdown())&&(the.eventHandlers.event_2=KTUtil.on(element,'[data-menu-toggle="hover"]',"mouseover",Plugin.handleSubmenuDrodownHoverEnter),the.eventHandlers.event_3=KTUtil.on(element,'[data-menu-toggle="hover"]',"mouseout",Plugin.handleSubmenuDrodownHoverExit),the.eventHandlers.event_4=KTUtil.on(element,'[data-menu-toggle="click"] > .menu-toggle, [data-menu-toggle="click"] > .menu-link .menu-toggle',"click",Plugin.handleSubmenuDropdownClick),the.eventHandlers.event_5=KTUtil.on(element,'[data-menu-toggle="tab"] > .menu-toggle, [data-menu-toggle="tab"] > .menu-link .menu-toggle',"click",Plugin.handleSubmenuDropdownTabClick)),the.eventHandlers.event_6=KTUtil.on(element,".menu-item > .menu-link:not(.menu-toggle):not(.menu-link-toggle-skip)","click",Plugin.handleLinkClick),the.options.scroll&&the.options.scroll.height&&Plugin.scrollInit()},reset:function(){KTUtil.off(element,"click",the.eventHandlers.event_1),KTUtil.off(element,"mouseover",the.eventHandlers.event_2),KTUtil.off(element,"mouseout",the.eventHandlers.event_3),KTUtil.off(element,"click",the.eventHandlers.event_4),KTUtil.off(element,"click",the.eventHandlers.event_5),KTUtil.off(element,"click",the.eventHandlers.event_6)},scrollInit:function(){the.options.scroll&&the.options.scroll.height?(KTUtil.scrollDestroy(element,!0),KTUtil.scrollInit(element,{mobileNativeScroll:!0,windowScroll:!1,resetHeightOnDestroy:!0,handleWindowResize:!0,height:the.options.scroll.height,rememberPosition:the.options.scroll.rememberPosition})):KTUtil.scrollDestroy(element,!0)},scrollUpdate:function(){the.options.scroll&&the.options.scroll.height&&KTUtil.scrollUpdate(element)},scrollTop:function(){the.options.scroll&&the.options.scroll.height&&KTUtil.scrollTop(element)},getSubmenuMode:function(el){return KTUtil.isBreakpointUp("lg")?el&&KTUtil.hasAttr(el,"data-menu-toggle")&&"hover"==KTUtil.attr(el,"data-menu-toggle")?"dropdown":KTUtil.isset(the.options.submenu,"desktop.state.body")?KTUtil.hasClasses(body,the.options.submenu.desktop.state.body)?the.options.submenu.desktop.state.mode:the.options.submenu.desktop.default:KTUtil.isset(the.options.submenu,"desktop")?the.options.submenu.desktop:void 0:KTUtil.isBreakpointUp("md")&&KTUtil.isBreakpointDown("lg")&&KTUtil.isset(the.options.submenu,"tablet")?the.options.submenu.tablet:!(!KTUtil.isBreakpointDown("md")||!KTUtil.isset(the.options.submenu,"mobile"))&&the.options.submenu.mobile},isConditionalSubmenuDropdown:function(){return!(!KTUtil.isBreakpointUp("lg")||!KTUtil.isset(the.options.submenu,"desktop.state.body"))},resetSubmenuProps:function(e){var submenus=KTUtil.findAll(element,".menu-submenu");if(submenus)for(var i=0,len=submenus.length;i<len;i++){var submenu=submenus[0];KTUtil.css(submenu,"display",""),KTUtil.css(submenu,"overflow",""),submenu.hasAttribute("data-hor-direction")&&(KTUtil.removeClass(submenu,"menu-submenu-left"),KTUtil.removeClass(submenu,"menu-submenu-right"),KTUtil.addClass(submenu,submenu.getAttribute("data-hor-direction")))}},handleSubmenuDrodownHoverEnter:function(e){if("accordion"!==Plugin.getSubmenuMode(this)&&!1!==the.resumeDropdownHover()){"1"==this.getAttribute("data-hover")&&(this.removeAttribute("data-hover"),clearTimeout(this.getAttribute("data-timeout")),this.removeAttribute("data-timeout")),Plugin.showSubmenuDropdown(this)}},handleSubmenuDrodownHoverExit:function(e){if(!1!==the.resumeDropdownHover()&&"accordion"!==Plugin.getSubmenuMode(this)){var item=this,time=the.options.dropdown.timeout,timeout=setTimeout((function(){"1"==item.getAttribute("data-hover")&&Plugin.hideSubmenuDropdown(item,!0)}),time);item.setAttribute("data-hover","1"),item.setAttribute("data-timeout",timeout)}},handleSubmenuDropdownClick:function(e){if("accordion"!==Plugin.getSubmenuMode(this)){var item=this.closest(".menu-item");!1!==Plugin.eventTrigger("submenuToggle",this,e)&&"accordion"!=item.getAttribute("data-menu-submenu-mode")&&(!1===KTUtil.hasClass(item,"menu-item-hover")?(KTUtil.addClass(item,"menu-item-open-dropdown"),Plugin.showSubmenuDropdown(item)):(KTUtil.removeClass(item,"menu-item-open-dropdown"),Plugin.hideSubmenuDropdown(item,!0)),e.preventDefault())}},handleSubmenuDropdownTabClick:function(e){if("accordion"!==Plugin.getSubmenuMode(this)){var item=this.closest(".menu-item");!1!==Plugin.eventTrigger("submenuToggle",this,e)&&"accordion"!=item.getAttribute("data-menu-submenu-mode")&&(0==KTUtil.hasClass(item,"menu-item-hover")&&(KTUtil.addClass(item,"menu-item-open-dropdown"),Plugin.showSubmenuDropdown(item)),e.preventDefault())}},handleLinkClick:function(e){var submenu=this.closest(".menu-item.menu-item-submenu");!1!==Plugin.eventTrigger("linkClick",this,e)&&submenu&&"dropdown"===Plugin.getSubmenuMode(submenu)&&Plugin.hideSubmenuDropdowns()},handleSubmenuDropdownClose:function(e,el){if("accordion"!==Plugin.getSubmenuMode(el)){var shown=element.querySelectorAll(".menu-item.menu-item-submenu.menu-item-hover:not(.menu-item-tabs)");if(shown.length>0&&!1===KTUtil.hasClass(el,"menu-toggle")&&0===el.querySelectorAll(".menu-toggle").length)for(var i=0,len=shown.length;i<len;i++)Plugin.hideSubmenuDropdown(shown[0],!0)}},handleSubmenuAccordion:function(e,el){var query,item=el||this;if(!1!==Plugin.eventTrigger("submenuToggle",this,e))if("dropdown"===Plugin.getSubmenuMode(el)&&(query=item.closest(".menu-item"))&&"accordion"!=query.getAttribute("data-menu-submenu-mode"))e.preventDefault();else{var li=item.closest(".menu-item"),submenu=KTUtil.child(li,".menu-submenu, .menu-inner");if(!KTUtil.hasClass(item.closest(".menu-item"),"menu-item-open-always")&&li&&submenu){e.preventDefault();var speed=the.options.accordion.slideSpeed;if(!1===KTUtil.hasClass(li,"menu-item-open")){if(!1===the.options.accordion.expandAll){var subnav=item.closest(".menu-nav, .menu-subnav"),closables=KTUtil.children(subnav,".menu-item.menu-item-open.menu-item-submenu:not(.menu-item-here):not(.menu-item-open-always)");if(subnav&&closables)for(var i=0,len=closables.length;i<len;i++){var el_=closables[0],submenu_=KTUtil.child(el_,".menu-submenu");submenu_&&KTUtil.slideUp(submenu_,speed,(function(){Plugin.scrollUpdate(),KTUtil.removeClass(el_,"menu-item-open")}))}}KTUtil.slideDown(submenu,speed,(function(){Plugin.scrollToItem(item),Plugin.scrollUpdate(),Plugin.eventTrigger("submenuToggle",submenu,e)})),KTUtil.addClass(li,"menu-item-open")}else KTUtil.slideUp(submenu,speed,(function(){Plugin.scrollToItem(item),Plugin.eventTrigger("submenuToggle",submenu,e)})),KTUtil.removeClass(li,"menu-item-open")}}},scrollToItem:function(item){KTUtil.isBreakpointUp("lg")&&the.options.accordion.autoScroll&&"1"!==element.getAttribute("data-menu-scroll")&&KTUtil.scrollTo(item,the.options.accordion.autoScrollSpeed)},hideSubmenuDropdown:function(item,classAlso){classAlso&&(KTUtil.removeClass(item,"menu-item-hover"),KTUtil.removeClass(item,"menu-item-active-tab")),item.removeAttribute("data-hover"),item.getAttribute("data-menu-toggle-class")&&KTUtil.removeClass(body,item.getAttribute("data-menu-toggle-class"));var timeout=item.getAttribute("data-timeout");item.removeAttribute("data-timeout"),clearTimeout(timeout)},hideSubmenuDropdowns:function(){var items;if(items=element.querySelectorAll('.menu-item-submenu.menu-item-hover:not(.menu-item-tabs):not([data-menu-toggle="tab"])'))for(var j=0,cnt=items.length;j<cnt;j++)Plugin.hideSubmenuDropdown(items[j],!0)},showSubmenuDropdown:function(item){var list=element.querySelectorAll(".menu-item-submenu.menu-item-hover, .menu-item-submenu.menu-item-active-tab");if(list)for(var i=0,len=list.length;i<len;i++){var el=list[i];item!==el&&!1===el.contains(item)&&!1===item.contains(el)&&Plugin.hideSubmenuDropdown(el,!0)}KTUtil.addClass(item,"menu-item-hover");var submenu=KTUtil.find(item,".menu-submenu");submenu&&!1===submenu.hasAttribute("data-hor-direction")&&(KTUtil.hasClass(submenu,"menu-submenu-left")?submenu.setAttribute("data-hor-direction","menu-submenu-left"):KTUtil.hasClass(submenu,"menu-submenu-right")&&submenu.setAttribute("data-hor-direction","menu-submenu-right")),submenu&&!0===KTUtil.isOffscreen(submenu,"left",15)?(KTUtil.removeClass(submenu,"menu-submenu-left"),KTUtil.addClass(submenu,"menu-submenu-right")):submenu&&!0===KTUtil.isOffscreen(submenu,"right",15)&&(KTUtil.removeClass(submenu,"menu-submenu-right"),KTUtil.addClass(submenu,"menu-submenu-left")),item.getAttribute("data-menu-toggle-class")&&KTUtil.addClass(body,item.getAttribute("data-menu-toggle-class"))},createSubmenuDropdownClickDropoff:function(el){var query,zIndex=(query=KTUtil.child(el,".menu-submenu")?KTUtil.css(query,"z-index"):0)-1,dropoff=document.createElement('<div class="menu-dropoff" style="background: transparent; position: fixed; top: 0; bottom: 0; left: 0; right: 0; z-index: '+zIndex+'"></div>');body.appendChild(dropoff),KTUtil.addEvent(dropoff,"click",(function(e){e.stopPropagation(),e.preventDefault(),KTUtil.remove(this),Plugin.hideSubmenuDropdown(el,!0)}))},pauseDropdownHover:function(time){var date=new Date;the.pauseDropdownHoverTime=date.getTime()+time},resumeDropdownHover:function(){return(new Date).getTime()>the.pauseDropdownHoverTime},resetActiveItem:function(item){for(var list,parents,i=0,len=(list=element.querySelectorAll(".menu-item-active")).length;i<len;i++){var el=list[0];KTUtil.removeClass(el,"menu-item-active"),KTUtil.hide(KTUtil.child(el,".menu-submenu"));for(var i_=0,len_=(parents=KTUtil.parents(el,".menu-item-submenu")||[]).length;i_<len_;i_++){var el_=parents[i];KTUtil.removeClass(el_,"menu-item-open"),KTUtil.hide(KTUtil.child(el_,".menu-submenu"))}}if(!1===the.options.accordion.expandAll&&(list=element.querySelectorAll(".menu-item-open")))for(i=0,len=list.length;i<len;i++)KTUtil.removeClass(parents[0],"menu-item-open")},setActiveItem:function(item){Plugin.resetActiveItem();for(var parents=KTUtil.parents(item,".menu-item-submenu")||[],i=0,len=parents.length;i<len;i++)KTUtil.addClass(parents[i],"menu-item-open");KTUtil.addClass(item,"menu-item-active")},getBreadcrumbs:function(item){var query,breadcrumbs=[],link=KTUtil.child(item,".menu-link");breadcrumbs.push({text:query=KTUtil.child(link,".menu-text")?query.innerHTML:"",title:link.getAttribute("title"),href:link.getAttribute("href")});for(var parents=KTUtil.parents(item,".menu-item-submenu"),i=0,len=parents.length;i<len;i++){var submenuLink=KTUtil.child(parents[i],".menu-link");breadcrumbs.push({text:query=KTUtil.child(submenuLink,".menu-text")?query.innerHTML:"",title:submenuLink.getAttribute("title"),href:submenuLink.getAttribute("href")})}return breadcrumbs.reverse()},getPageTitle:function(item){var query;return KTUtil.child(item,".menu-text")?query.innerHTML:""},eventTrigger:function(name,target,e){for(var i=0;i<the.events.length;i++){var event=the.events[i];if(event.name==name){if(1!=event.one)return event.handler.call(this,target,e);if(0==event.fired)return the.events[i].fired=!0,event.handler.call(this,target,e)}}},addEvent:function(name,handler,one){the.events.push({name:name,handler:handler,one:one,fired:!1})},removeEvent:function(name){the.events[name]&&delete the.events[name]}};return the.setDefaults=function(options){defaultOptions=options},the.scrollUpdate=function(){return Plugin.scrollUpdate()},the.scrollReInit=function(){return Plugin.scrollInit()},the.scrollTop=function(){return Plugin.scrollTop()},the.setActiveItem=function(item){return Plugin.setActiveItem(item)},the.reload=function(){return Plugin.reload()},the.update=function(options){return Plugin.update(options)},the.getBreadcrumbs=function(item){return Plugin.getBreadcrumbs(item)},the.getPageTitle=function(item){return Plugin.getPageTitle(item)},the.getSubmenuMode=function(el){return Plugin.getSubmenuMode(el)},the.hideDropdown=function(item){Plugin.hideSubmenuDropdown(item,!0)},the.hideDropdowns=function(){Plugin.hideSubmenuDropdowns()},the.pauseDropdownHover=function(time){Plugin.pauseDropdownHover(time)},the.resumeDropdownHover=function(){return Plugin.resumeDropdownHover()},the.on=function(name,handler){return Plugin.addEvent(name,handler)},the.off=function(name){return Plugin.removeEvent(name)},the.one=function(name,handler){return Plugin.addEvent(name,handler,!0)},Plugin.construct.apply(the,[options]),KTUtil.addResizeHandler((function(){init&&the.reload()})),init=!0,the}};"undefined"!=typeof module&&void 0!==module.exports&&(module.exports=KTMenu),document.addEventListener("click",(function(e){var query;if(query=KTUtil.getByTagName("body")[0].querySelectorAll('.menu-nav .menu-item.menu-item-submenu.menu-item-hover:not(.menu-item-tabs)[data-menu-toggle="click"]'))for(var i=0,len=query.length;i<len;i++){var element=query[i].closest(".menu-nav").parentNode;if(element){var the=KTUtil.data(element).get("menu");if(!the)break;if(!the||"dropdown"!==the.getSubmenuMode())break;e.target!==element&&!1===element.contains(e.target)&&the.hideDropdowns()}}}));