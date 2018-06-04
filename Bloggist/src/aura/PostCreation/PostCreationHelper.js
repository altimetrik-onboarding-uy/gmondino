({
	createPost : function(component,post) {
        var action = component.get("c.savePost");
        var authorName = component.get("v.authorName");
        action.setParams({ "post": post, 
                          "authorName": authorName});
        action.setCallback(this, function(response){
        	var state = response.getState();
            if (state === "SUCCESS") {
                console.log("successfullResponsed");
                console.log(response.getReturnValue());
           		var createPostEvent = $A.get("e.c:createPostEvent");
            	createPostEvent.setParams({"createdPost": response.getReturnValue()})
            	createPostEvent.fire();
            	component.set("v.newPost", { 'sobjectType': 'Post__c',
               	   	  'Title__c': '',
               	   	  'Status__c': 'Draft',
               	   	  'Tag__c': '',
               	   	  'Content__c': ''})
                component.set("v.authorName", '');
            } else if (state === 'ERROR'){
                var errors = response.getError();
                for(var i=0; i<= errors.length; i++){
                    console.log(errors[i]);
                }
            }
            	
        });
       	$A.enqueueAction(action);
        console.log("equeuedFiring");
    }
})