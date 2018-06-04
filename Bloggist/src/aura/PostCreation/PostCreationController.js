({
	clickCreatePost : function(component, event, helper) {
		var validPost = component.find('postform').reduce(function (valid, inputCmp){
            inputCmp.showHelpMessageIfInvalid();
            return valid && inputCmp.get('v.validity').valid;
        }, true);
        if(validPost) {
            var action = component.get("c.authorExist");
            var authorName = component.get("v.authorName");
            action.setParams({"authorName": authorName});
            console.log("parameter done");
            action.setCallback(this, function(response){
                var state = response.getState();
                if (state === "SUCCESS") {
                    console.log("callBackSuccess");
                    console.log(response.getReturnValue());
                    if (!response.getReturnValue()) {
                        if(confirm('You don\'t have an associated contact with that author name do you wish to create one?')) {
                     		console.log("beforeHelper");
                            helper.createPost(component, component.get("v.newPost"));       
                        }
                    } else {
                        helper.createPost(component, component.get("v.newPost"));       
                    }
            	}
            })
            $A.enqueueAction(action);
            console.log("actionEnqueued");
        }
	}
})