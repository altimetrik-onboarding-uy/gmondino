({
	doInit : function(component, event, helper) {
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
        
        var action4 = component.get("c.getPublishedPosts");
        action4.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.publishedPost", response.getReturnValue());
            }
            else {
                console.log("Failed with state: " + state);
            }
        });
        $A.enqueueAction(action4);
	},
    
    handleCreation : function(component, event, helper){
        var drafts = component.get("v.draftPost");
        drafts.push(event.getParam("createdPost"));
        component.set("v.draftPost",drafts);
    },
    
    handleDiscard : function(component, event, helper){
        helper.updateList(component,event.getParam("postStatus"),event.getParam("post"));
    },
    
    handleSubmit : function(component, event, helper){
        var post = event.getParam("post");
        helper.updateList(component,'Submit for approval',post);
        var list = component.get("v.subPost");
        list.push(post);
        component.set("v.subPost",list);
    },
    
    handlePublish : function(component, event, helper){
        var post = event.getParam("post");
        helper.updateList(component,'Publish',post);
        var list = component.get("v.publishedPost");
        list.push(post);
        component.set("v.publishedPost",list);
    }
})