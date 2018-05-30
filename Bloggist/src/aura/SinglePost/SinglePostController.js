({
	discard : function(component, event, helper) {
		helper.discard(component,component.get("v.post"), event.getSource().get("v.name"));
	}
})