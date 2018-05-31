({
	discard : function(component, post, source) {
		var action = component.get("c.discardPost");
        action.setParams({
            "post": post
        });
        action.setCallback(this, function(response){
         //   var state = response.getState();
            if (response.getState() === "SUCCESS") {
                var discardEvent = component.getEvent("discardPostEvent");
        		discardEvent.setParam("post", post);
                discardEvent.setParam("postStatus", source);
        		discardEvent.fire();
            } else if (response.getState() === "ERROR") {
                var errors = response.getError();
	                if (errors) {
	                    if (errors[0] && errors[0].message) {
	                        console.log("Error message: " + errors[0].message);
	                    }
	                } else {
                        console.log("Unknown error");
	                }
            } else {
                console.log("something is happening");
            }
        });
        $A.enqueueAction(action);
	},
    
    changeStatus : function(component, post, source) {
       	var action = component.get("c.changePostStatus");
        var changeEvent;
        action.setParams({
            "post": post
        });
        switch(source) {
            case 'Approve':
                break;
            case 'Publish':
                break;
            case 'Submit for approval':
                action.setCallback(this, function(response){
            		if (response.getState() === "SUCCESS") {
                		changeEvent = component.getEvent("submitPostEvent");
        				changeEvent.setParam("post", post);
        				changeEvent.fire();
        	    } else if (response.getState() === "ERROR") {
            	    var errors = response.getError();
	            	    if (errors) {
	                	    if (errors[0] && errors[0].message) {
	                    	    console.log("Error message: " + errors[0].message);
	                    	}
	                	} else {
                       		console.log("Unknown error");
	                	}
            	} else {
                	console.log("something is happening");
            	}
        	});
                break;
        }
        $A.enqueueAction(action);
    }
})