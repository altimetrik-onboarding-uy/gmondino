({
	doInit : function(component, event, helper) {
        //Maybe this sequence could be in helper
		var action1 = component.get("c.getAppPosts");
        action1.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.appPost", response.getReturnValue());
            }
            else {
                console.log("Failed with state: " + state);
            }
        });
        $A.enqueueAction(action1);
        
        var action2 = component.get("c.getSubPosts");
        action2.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.subPost", response.getReturnValue());
            }
            else {
                console.log("Failed with state: " + state);
            }
        });
        $A.enqueueAction(action2);
        
        var action3 = component.get("c.getDraftPosts");
        action3.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.draftPost", response.getReturnValue());
            }
            else {
                console.log("Failed with state: " + state);
            }
        });
        $A.enqueueAction(action3);
	},
    
    handleCreation : function(component, event, helper){
        var drafts = component.get("v.draftPost");
        drafts.push(event.getParam("createdPost"));
        component.set("v.draftPost",drafts);
    },
    
    handleDiscard : function(component, event, helper){
        var postStatus = event.getParam("postStatus");
        var list;
        var post = event.getParam("post");
        switch(postStatus) {
            case 'Approve':
                list = component.get("v.subPost");
                list.splice(list.indexOf(post),1);
                component.set("v.subPost",list);
                break;
            case 'Publish':
                list = component.get("v.appPost");
                list.splice(list.indexOf(post),1);
                component.set("v.appPost",list);
                break;
            case 'Submit for approval':
                list = component.get("v.draftPost");
                list.splice(list.indexOf(post),1);
                component.set("v.draftPost",list);
                break;
        }
    },
    
    handleSubmit : function(component, event, helper){
        var post = event.getParam("post");
        var list = component.get("v.draftPost");
        list.splice(list.indexOf(post),1);
        component.set("v.draftPost",list);
        list = component.get("v.subPost");
        list.push(post);
        component.set("v.subPost",list);
    }
})