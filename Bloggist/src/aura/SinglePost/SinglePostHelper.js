({
	discard : function(component, post, source) {
		var action = component.get("c.discardPost");
        action.setParams({
            "post": post
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                var discardEvent = component.getEvent("discardPostEvent");
        		discardEvent.setParam("post", post);
                discardEvent.setParam("postStatus", source);
        		discardEvent.fire();
            }
        });
        $A.enqueueAction(action);
	}
})