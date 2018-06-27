({
	discard : function(component, event, helper) {
		helper.discard(component,component.get("v.post"), component.get("v.transferButton"));
	},
    
    changeStatus :  function(component,event,helper) {
       helper.changeStatus(component, component.get("v.post"), component.get("v.transferButton"));
    },
    
    deletePost : function(component, event, helper) {
		helper.discard(component,component.get("v.post"), component.get("v.transferButton"));
	},
    
    editPost : function(component, event, helper) {
		helper.edit(component,component.get("v.post"), component.get("v.transferButton"));
	},
    jsLoaded: function(cmp,event){
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
    doInit : function(component, event, helper) {
        var post = component.get("v.post");
        component.set("v.textAreaValue",marked(post.Content__c));
    }
})