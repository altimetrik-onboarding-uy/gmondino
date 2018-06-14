({
	discard : function(component, event, helper) {
		helper.discard(component,component.get("v.post"), component.get("v.transferButton"));
	},
    
    changeStatus :  function(component,event,helper) {
       helper.changeStatus(component, component.get("v.post"), component.get("v.transferButton"));
    },
    
    deletePost : function(component, event, helper) {
		helper.discard(component,component.get("v.post"), component.get("v.transferButton"));
	}
})