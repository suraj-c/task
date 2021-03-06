var abp=abp||{};!function(){abp.appPath=abp.appPath||"/",abp.pageLoadTime=new Date,abp.toAbsAppPath=function(path){return 0==path.indexOf("/")&&(path=path.substring(1)),abp.appPath+path},abp.multiTenancy=abp.multiTenancy||{},abp.multiTenancy.isEnabled=!1,abp.multiTenancy.sides={TENANT:1,HOST:2},abp.multiTenancy.tenantIdCookieName="Abp.TenantId",abp.multiTenancy.setTenantIdCookie=function(tenantId){tenantId?abp.utils.setCookieValue(abp.multiTenancy.tenantIdCookieName,tenantId.toString(),new Date((new Date).getTime()+15768e7),abp.appPath,abp.domain):abp.utils.deleteCookie(abp.multiTenancy.tenantIdCookieName,abp.appPath)},abp.multiTenancy.getTenantIdCookie=function(){var value=abp.utils.getCookieValue(abp.multiTenancy.tenantIdCookieName);return value?parseInt(value):null},abp.session=abp.session||{multiTenancySide:abp.multiTenancy.sides.HOST},abp.localization=abp.localization||{},abp.localization.languages=[],abp.localization.currentLanguage={},abp.localization.sources=[],abp.localization.values={},abp.localization.localize=function(key,sourceName){sourceName=sourceName||abp.localization.defaultSourceName;var source=abp.localization.values[sourceName];if(!source)return abp.log.warn("Could not find localization source: "+sourceName),key;var value=source[key];if(null==value)return key;var copiedArguments=Array.prototype.slice.call(arguments,0);return copiedArguments.splice(1,1),copiedArguments[0]=value,abp.utils.formatString.apply(this,copiedArguments)},abp.localization.getSource=function(sourceName){return function(key){var copiedArguments=Array.prototype.slice.call(arguments,0);return copiedArguments.splice(1,0,sourceName),abp.localization.localize.apply(this,copiedArguments)}},abp.localization.isCurrentCulture=function(name){return abp.localization.currentCulture&&abp.localization.currentCulture.name&&0==abp.localization.currentCulture.name.indexOf(name)},abp.localization.defaultSourceName=void 0,abp.localization.abpWeb=abp.localization.getSource("AbpWeb"),abp.auth=abp.auth||{},abp.auth.allPermissions=abp.auth.allPermissions||{},abp.auth.grantedPermissions=abp.auth.grantedPermissions||{},abp.auth.hasPermission=function(permissionName){return abp.auth.isGranted.apply(this,arguments)},abp.auth.hasAnyOfPermissions=function(){return abp.auth.isAnyGranted.apply(this,arguments)},abp.auth.hasAllOfPermissions=function(){return abp.auth.areAllGranted.apply(this,arguments)},abp.auth.isGranted=function(permissionName){return null!=abp.auth.allPermissions[permissionName]&&null!=abp.auth.grantedPermissions[permissionName]},abp.auth.isAnyGranted=function(){if(!arguments||arguments.length<=0)return!0;for(var i=0;i<arguments.length;i++)if(abp.auth.isGranted(arguments[i]))return!0;return!1},abp.auth.areAllGranted=function(){if(!arguments||arguments.length<=0)return!0;for(var i=0;i<arguments.length;i++)if(!abp.auth.isGranted(arguments[i]))return!1;return!0},abp.auth.tokenCookieName="Abp.AuthToken",abp.auth.setToken=function(authToken,expireDate){abp.utils.setCookieValue(abp.auth.tokenCookieName,authToken,expireDate,abp.appPath,abp.domain)},abp.auth.getToken=function(){return abp.utils.getCookieValue(abp.auth.tokenCookieName)},abp.auth.clearToken=function(){abp.auth.setToken()},abp.auth.refreshTokenCookieName="Abp.AuthRefreshToken",abp.auth.setRefreshToken=function(refreshToken,expireDate){abp.utils.setCookieValue(abp.auth.refreshTokenCookieName,refreshToken,expireDate,abp.appPath,abp.domain)},abp.auth.getRefreshToken=function(){return abp.utils.getCookieValue(abp.auth.refreshTokenCookieName)},abp.auth.clearRefreshToken=function(){abp.auth.setRefreshToken()},abp.features=abp.features||{},abp.features.allFeatures=abp.features.allFeatures||{},abp.features.get=function(name){return abp.features.allFeatures[name]},abp.features.getValue=function(name){var feature=abp.features.get(name);if(null!=feature)return feature.value},abp.features.isEnabled=function(name){var value=abp.features.getValue(name);return"true"==value||"True"==value},abp.setting=abp.setting||{},abp.setting.values=abp.setting.values||{},abp.setting.get=function(name){return abp.setting.values[name]},abp.setting.getBoolean=function(name){var value=abp.setting.get(name);return"true"==value||"True"==value},abp.setting.getInt=function(name){return parseInt(abp.setting.values[name])},abp.notifications=abp.notifications||{},abp.notifications.severity={INFO:0,SUCCESS:1,WARN:2,ERROR:3,FATAL:4},abp.notifications.userNotificationState={UNREAD:0,READ:1},abp.notifications.getUserNotificationStateAsString=function(userNotificationState){switch(userNotificationState){case abp.notifications.userNotificationState.READ:return"READ";case abp.notifications.userNotificationState.UNREAD:return"UNREAD";default:return abp.log.warn("Unknown user notification state value: "+userNotificationState),"?"}},abp.notifications.getUiNotifyFuncBySeverity=function(severity){switch(severity){case abp.notifications.severity.SUCCESS:return abp.notify.success;case abp.notifications.severity.WARN:return abp.notify.warn;case abp.notifications.severity.ERROR:case abp.notifications.severity.FATAL:return abp.notify.error;case abp.notifications.severity.INFO:default:return abp.notify.info}},abp.notifications.messageFormatters={},abp.notifications.messageFormatters["Abp.Notifications.MessageNotificationData"]=function(userNotification){return userNotification.notification.data.message||userNotification.notification.data.properties.Message},abp.notifications.messageFormatters["Abp.Notifications.LocalizableMessageNotificationData"]=function(userNotification){var message=userNotification.notification.data.message||userNotification.notification.data.properties.Message,localizedMessage=abp.localization.localize(message.name,message.sourceName);if(userNotification.notification.data.properties)for(var properties=Object.keys(userNotification.notification.data.properties),i=0;i<properties.length;i++)localizedMessage=localizedMessage.replace("{"+properties[i]+"}",userNotification.notification.data.properties[properties[i]]);return localizedMessage},abp.notifications.getFormattedMessageFromUserNotification=function(userNotification){var formatter=abp.notifications.messageFormatters[userNotification.notification.data.type];return formatter?abp.utils.isFunction(formatter)?formatter(userNotification):(abp.log.warn("Message formatter should be a function! It is invalid for data type: "+userNotification.notification.data.type),"?"):(abp.log.warn("No message formatter defined for given data type: "+userNotification.notification.data.type),"?")},abp.notifications.showUiNotifyForUserNotification=function(userNotification,options){var message=abp.notifications.getFormattedMessageFromUserNotification(userNotification);abp.notifications.getUiNotifyFuncBySeverity(userNotification.notification.severity)(message,void 0,options)},abp.log=abp.log||{},abp.log.levels={DEBUG:1,INFO:2,WARN:3,ERROR:4,FATAL:5},abp.log.level=abp.log.levels.DEBUG,abp.log.log=function(logObject,logLevel){window.console&&window.console.log&&(null!=logLevel&&logLevel<abp.log.level||console.log(logObject))},abp.log.debug=function(logObject){abp.log.log("DEBUG: ",abp.log.levels.DEBUG),abp.log.log(logObject,abp.log.levels.DEBUG)},abp.log.info=function(logObject){abp.log.log("INFO: ",abp.log.levels.INFO),abp.log.log(logObject,abp.log.levels.INFO)},abp.log.warn=function(logObject){abp.log.log("WARN: ",abp.log.levels.WARN),abp.log.log(logObject,abp.log.levels.WARN)},abp.log.error=function(logObject){abp.log.log("ERROR: ",abp.log.levels.ERROR),abp.log.log(logObject,abp.log.levels.ERROR)},abp.log.fatal=function(logObject){abp.log.log("FATAL: ",abp.log.levels.FATAL),abp.log.log(logObject,abp.log.levels.FATAL)},abp.notify=abp.notify||{},abp.notify.success=function(message,title,options){abp.log.warn("abp.notify.success is not implemented!")},abp.notify.info=function(message,title,options){abp.log.warn("abp.notify.info is not implemented!")},abp.notify.warn=function(message,title,options){abp.log.warn("abp.notify.warn is not implemented!")},abp.notify.error=function(message,title,options){abp.log.warn("abp.notify.error is not implemented!")},abp.message=abp.message||{};var _callbacks,toUtc,toLocal,showMessage=function(message,title,options){return alert((title||"")+" "+message),$?$.Deferred((function($dfd){$dfd.resolve()})):(abp.log.warn("abp.message can not return promise since jQuery is not defined!"),null)};abp.message.info=function(message,title,options){return abp.log.warn("abp.message.info is not implemented!"),showMessage(message,title)},abp.message.success=function(message,title,options){return abp.log.warn("abp.message.success is not implemented!"),showMessage(message,title)},abp.message.warn=function(message,title,options){return abp.log.warn("abp.message.warn is not implemented!"),showMessage(message,title)},abp.message.error=function(message,title,options){return abp.log.warn("abp.message.error is not implemented!"),showMessage(message,title)},abp.message.confirm=function(message,title,callback,options){abp.log.warn("abp.message.confirm is not implemented!");var result=confirm(message);return callback&&callback(result),$?$.Deferred((function($dfd){$dfd.resolve()})):(abp.log.warn("abp.message can not return promise since jQuery is not defined!"),null)},abp.ui=abp.ui||{},abp.ui.block=function(elm){abp.log.warn("abp.ui.block is not implemented!")},abp.ui.unblock=function(elm){abp.log.warn("abp.ui.unblock is not implemented!")},abp.ui.setBusy=function(elm,optionsOrPromise){abp.log.warn("abp.ui.setBusy is not implemented!")},abp.ui.clearBusy=function(elm){abp.log.warn("abp.ui.clearBusy is not implemented!")},abp.event=(_callbacks={},{on:function(eventName,callback){_callbacks[eventName]||(_callbacks[eventName]=[]),_callbacks[eventName].push(callback)},off:function(eventName,callback){var callbacks=_callbacks[eventName];if(callbacks){for(var index=-1,i=0;i<callbacks.length;i++)if(callbacks[i]===callback){index=i;break}index<0||_callbacks[eventName].splice(index,1)}},trigger:function(eventName){var callbacks=_callbacks[eventName];if(callbacks&&callbacks.length)for(var args=Array.prototype.slice.call(arguments,1),i=0;i<callbacks.length;i++)callbacks[i].apply(this,args)}}),abp.utils=abp.utils||{},abp.utils.createNamespace=function(root,ns){for(var parts=ns.split("."),i=0;i<parts.length;i++)void 0===root[parts[i]]&&(root[parts[i]]={}),root=root[parts[i]];return root},abp.utils.replaceAll=function(str,search,replacement){var fix=search.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");return str.replace(new RegExp(fix,"g"),replacement)},abp.utils.formatString=function(){if(arguments.length<1)return null;for(var str=arguments[0],i=1;i<arguments.length;i++){var placeHolder="{"+(i-1)+"}";str=abp.utils.replaceAll(str,placeHolder,arguments[i])}return str},abp.utils.toPascalCase=function(str){return str&&str.length?1===str.length?str.charAt(0).toUpperCase():str.charAt(0).toUpperCase()+str.substr(1):str},abp.utils.toCamelCase=function(str){return str&&str.length?1===str.length?str.charAt(0).toLowerCase():str.charAt(0).toLowerCase()+str.substr(1):str},abp.utils.truncateString=function(str,maxLength){return!str||!str.length||str.length<=maxLength?str:str.substr(0,maxLength)},abp.utils.truncateStringWithPostfix=function(str,maxLength,postfix){return postfix=postfix||"...",!str||!str.length||str.length<=maxLength?str:maxLength<=postfix.length?postfix.substr(0,maxLength):str.substr(0,maxLength-postfix.length)+postfix},abp.utils.isFunction=function(obj){return!!(obj&&obj.constructor&&obj.call&&obj.apply)},abp.utils.buildQueryString=function(parameterInfos,includeQuestionMark){void 0===includeQuestionMark&&(includeQuestionMark=!0);var qs="";function addSeperator(){qs.length?qs+="&":includeQuestionMark&&(qs+="?")}for(var i=0;i<parameterInfos.length;++i){var parameterInfo=parameterInfos[i];if(void 0!==parameterInfo.value)if(null===parameterInfo.value&&(parameterInfo.value=""),addSeperator(),parameterInfo.value.toJSON&&"function"==typeof parameterInfo.value.toJSON)qs=qs+parameterInfo.name+"="+encodeURIComponent(parameterInfo.value.toJSON());else if(Array.isArray(parameterInfo.value)&&parameterInfo.value.length)for(var j=0;j<parameterInfo.value.length;j++)j>0&&addSeperator(),qs=qs+parameterInfo.name+"["+j+"]="+encodeURIComponent(parameterInfo.value[j]);else qs=qs+parameterInfo.name+"="+encodeURIComponent(parameterInfo.value)}return qs},abp.utils.setCookieValue=function(key,value,expireDate,path,domain){var cookieValue=encodeURIComponent(key)+"=";value&&(cookieValue+=encodeURIComponent(value)),expireDate&&(cookieValue=cookieValue+"; expires="+expireDate.toUTCString()),path&&(cookieValue=cookieValue+"; path="+path),domain&&(cookieValue=cookieValue+"; domain="+domain),document.cookie=cookieValue},abp.utils.getCookieValue=function(key){for(var equalities=document.cookie.split("; "),i=0;i<equalities.length;i++)if(equalities[i]){var splitted=equalities[i].split("=");if(2==splitted.length&&decodeURIComponent(splitted[0])===key)return decodeURIComponent(splitted[1]||"")}return null},abp.utils.deleteCookie=function(key,path){var cookieValue=encodeURIComponent(key)+"=";cookieValue=cookieValue+"; expires="+new Date((new Date).getTime()-864e5).toUTCString(),path&&(cookieValue=cookieValue+"; path="+path),document.cookie=cookieValue},abp.utils.getDomain=function(url){var matches=/(https?:){0,1}\/\/((?:[\w\d-]+\.)+[\w\d]{2,})/i.exec(url);return matches&&matches[2]?matches[2]:""},abp.timing=abp.timing||{},abp.timing.utcClockProvider=(toUtc=function(date){return Date.UTC(date.getUTCFullYear(),date.getUTCMonth(),date.getUTCDate(),date.getUTCHours(),date.getUTCMinutes(),date.getUTCSeconds(),date.getUTCMilliseconds())},{now:function(){return toUtc(new Date)},normalize:function(date){return date?new Date(toUtc(date)):date},supportsMultipleTimezone:!0}),abp.timing.localClockProvider=(toLocal=function(date){return new Date(date.getFullYear(),date.getMonth(),date.getDate(),date.getHours(),date.getMinutes(),date.getSeconds(),date.getMilliseconds())},{now:function(){return toLocal(new Date)},normalize:function(date){return date?toLocal(date):date},supportsMultipleTimezone:!1}),abp.timing.unspecifiedClockProvider={now:function(){return new Date},normalize:function(date){return date},supportsMultipleTimezone:!1},abp.timing.convertToUserTimezone=function(date){var utcTime=date.getTime()+6e4*date.getTimezoneOffset(),targetTime=parseInt(utcTime)+parseInt(abp.timing.timeZoneInfo.windows.currentUtcOffsetInMilliseconds);return new Date(targetTime)},abp.clock=abp.clock||{},abp.clock.now=function(){return abp.clock.provider?abp.clock.provider.now():new Date},abp.clock.normalize=function(date){return abp.clock.provider?abp.clock.provider.normalize(date):date},abp.clock.provider=abp.timing.unspecifiedClockProvider,abp.security=abp.security||{},abp.security.antiForgery=abp.security.antiForgery||{},abp.security.antiForgery.tokenCookieName="XSRF-TOKEN",abp.security.antiForgery.tokenHeaderName="X-XSRF-TOKEN",abp.security.antiForgery.getToken=function(){return abp.utils.getCookieValue(abp.security.antiForgery.tokenCookieName)},abp.security.antiForgery.shouldSendToken=function(settings){return void 0===settings.crossDomain||null===settings.crossDomain?abp.utils.getDomain(location.href)===abp.utils.getDomain(settings.url):!settings.crossDomain}}();