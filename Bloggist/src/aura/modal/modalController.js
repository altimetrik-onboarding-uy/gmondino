({
   handleEdit : function(component, event, helper) {
      var post = event.getParam("post");
       console.log(post.Status__c);
      component.set("v.Post", post);
      component.set("v.textAreaValue",marked(post.Content__c));
      component.set("v.isDraft", post.Status__c == 'Draft');
      console.log(post.Status__c == 'Draft');
//      component.set("v.isUnder", post.Status__c == 'Under Review');
//       console.log(post.Status__c == 'Under Review');
      component.set("v.isReady", post.Status__c == 'Ready');
//       console.log(post.Status__c == 'Ready');
//      component.set("v.isPublished", post.Status__c == 'Published');
//       console.log(post.Status__c == 'Published'); */
       
      var interval = window.setInterval(
	    $A.getCallback(function() {
	           helper.setSaver(component,event,component.get("v.Post"));
	    }), 3000);
      component.set("v.setIntervalId", interval) ;
      component.set("v.isOpen", true);
      
   },
 
   closeModel : function(component, event, helper) {       
     window.clearInterval(component.get("v.setIntervalId"));
      var updatePost = component.getEvent("editPostActEvent");
      var post = component.get("v.Post");
      updatePost.setParam("post", post);
      updatePost.fire();
      console.log("event actualization fired");
      console.log(post.Content__c);
      component.set("v.isOpen", false);
      component.set("v.post", { 'sobjectType': 'Post__c',
               	   	  'Title__c': '',
               	   	  'Status__c': '',
               	   	  'Tag__c': '',
               	   	  'Content__c': ''});
   },
 
   submitForAppHand : function(component, event, helper) {
       window.clearInterval(component.get("v.setIntervalId"));
       var post = component.get("v.Post");
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
      component.set("v.isOpen", false);
      component.set("v.post", { 'sobjectType': 'Post__c',
          	   	  'Title__c': '',
           	   	  'Status__c': '',
           	   	  'Tag__c': '',
           	   	  'Content__c': ''});
   },
   publishPostHand : function(component, event, helper) {
   window.clearInterval(component.get("v.setIntervalId"));
    var post = component.get("v.Post");
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
   component.set("v.isOpen", false);
   component.set("v.post", { 'sobjectType': 'Post__c',
          	   	  'Title__c': '',
           	   	  'Status__c': '',
           	   	  'Tag__c': '',
           	   	  'Content__c': ''});
   },
   jsLoaded : function(cmp,event){
 	marked.setOptions({
  		gfm: true,
        tables: true,
        breaks: false,
  		pedantic: false,
  		sanitize: true,
  		smartLists: true,
  		langPrefix: 'language-',
  		highlight: function(code, lang) {
   		 if (lang === 'js') {
     		 return highlighter.javascript(code);
    		}
    		return code;
  		}
		});
    },
    handleKeyup : function(cmp, event) {
        var elem = event.getSource().get('v.value');
        cmp.set("v.textAreaValue",marked(elem));
    }
})