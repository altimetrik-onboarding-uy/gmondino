({
	discard : function(component, post, source) {
		var action = component.get("c.discardPost");
        action.setParams({
            "post": post
        });
        action.setCallback(this, function(response){
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
        if(source === 'Submit for approval'){
                var actionSubmit = component.get("c.submitPost");
                actionSubmit.setParams({"post": post});
                actionSubmit.setCallback(this, function(response){
            		if (response.getState() === "SUCCESS") {
                        var changeEvent;
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
           		$A.enqueueAction(actionSubmit);
        } else if (source === 'Publish') {
            var actionPublish = component.get("c.publishPost");
            actionPublish.setParams({"post": post});
            actionPublish.setCallback(this, function(response){
            	if (response.getState() === "SUCCESS") {
                    var publishEvent;
                	publishEvent = component.getEvent("publishPostEvent");
        			publishEvent.setParam("post", post);
        			publishEvent.fire();
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
           	$A.enqueueAction(actionPublish);
        }
    }
})