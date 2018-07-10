({
	setSaver : function(component,event,post) {
        console.log("saverSet");
        console.log(post.Content__c);
        if (post.Status__c != ''){
            console.log("insideIf");
		var action = component.get("c.saveMod");
        action.setParams({ "post": post });
        action.setCallback(this,function(response) {
            var state = response.getState();
            if (state === 'ERROR'){
                var errors = response.getError();
                for(var i=0; i<= errors.length; i++){
                    console.log(errors[i]);
                }
            }
        });
        $A.enqueueAction(action);
	   }
    },
    construct : function (component, str, init, fin,con){
        var ret;
        if(init <= fin){
             ret = (str.slice(0,init)).concat(con);
             ret = ret.concat(str.slice(fin));
        } else {
            ret = (str.slice(0,fin)).concat(con);
            ret = ret.concat(str.slice(init));
        }
        return ret;
    }
})