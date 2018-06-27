({
	setSaver : function(component,event,post) {
        console.log("saverSet");
        if (post.Status__c != ''){
            console.log("insideIf");
		var action = component.get("c.saveMod");
        action.setParams({ "post": post });
        action.setCallback(this,function(response) {
            var state = response.getState();
            if (state === 'ERROR'){
                var errors = response.getError();
                for(var i=0; i<= errors.length; i++){
                    console.log(errors[i]);
                }
            }
        });
        $A.enqueueAction(action);
	   }
    }
})