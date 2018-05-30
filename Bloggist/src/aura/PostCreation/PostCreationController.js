({
	clickCreatePost : function(component, event, helper) {
		 var validPost = component.find('postform').reduce(function (valid, inputCmp){
            inputCmp.showHelpMessageIfInvalid();
            return valid && inputCmp.get('v.validity').valid;
        }, true);
        if(validPost) {
            helper.createPost(component, component.get("v.newPost"));
        }
	}
})