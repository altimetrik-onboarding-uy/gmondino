({
	clickCreatePost : function(component, event, helper) {
        var postObj = component.get("v.newPost");
        postObj.Author__c = null;
        
        if(component.get("v.selectedLookUpRecord").Id != undefined) {
            postObj.Author__c = component.get("v.selectedLookUpRecord").Id;
            helper.createPost(component, component.get("v.newPost"));
        } else {
            alert("Author is required");
        }
	}
})