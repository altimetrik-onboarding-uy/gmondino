({
	createPost : function(component,post) {
		var action = component.get("c.savePost");
        action.setParams({
            "post": post
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                var createPostEvent = $A.get("e.c:createPostEvent");
                createPostEvent.setParams({
	            "createdPost": response.getReturnValue() })
                createPostEvent.fire();
                component.set("v.newPost", { 'sobjectType': 'Post__c',
                        'Title__c': '',
                        'Status__c': 'Draft',
                        'Tag__c': '',
                        'Content__c': ''})
            }
        });
        $A.enqueueAction(action);
	}
})