var abp=abp||{};!function(){var showMessage=function(type,message,title,options){title||(title=message,message=void 0),(options=options||{}).title=title,options.icon=type,options.confirmButtonText=options.confirmButtonText||abp.localization.localize("Ok","ANZ104AngularDemo"),options.isHtml?options.html=message:options.text=message;const{isHtml:isHtml,...optionsSafe}=options;return Swal.fire(optionsSafe)};abp.message.info=function(message,title,options){return showMessage("info",message,title,options)},abp.message.success=function(message,title,options){return showMessage("success",message,title,options)},abp.message.warn=function(message,title,options){return showMessage("warning",message,title,options)},abp.message.error=function(message,title,options){return showMessage("error",message,title,options)},abp.message.confirm=function(message,title,callback,options){(options=options||{}).title=title||abp.localization.localize("AreYouSure","ANZ104AngularDemo"),options.icon="warning",options.confirmButtonText=options.confirmButtonText||abp.localization.localize("Yes","ANZ104AngularDemo"),options.cancelButtonText=options.cancelButtonText||abp.localization.localize("Cancel","ANZ104AngularDemo"),options.showCancelButton=!0,options.isHtml?options.html=message:options.text=message;const{isHtml:isHtml,...optionsSafe}=options;return Swal.fire(optionsSafe).then((function(result){callback&&callback(result.value)}))}}();