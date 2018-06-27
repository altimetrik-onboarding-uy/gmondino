({
	updateList : function(component,postStatus,post) {
        var list;
        var i = 0;
        var keep = true;
        switch(postStatus) {
            case 'Publish':
                list = component.get("v.appPost");
                while(i<=list.length && keep) {
                	if(list[i].Id === post.Id) {
                        list.splice(i,1);
                        keep = false;
                    }
                    i++;
                }
                component.set("v.appPost",list);
                break;
            case 'Submit for approval':
                list = component.get("v.draftPost");
				while(i<=list.length && keep) {
                	if(list[i].Id === post.Id) {
                        list.splice(i,1);
                        keep = false;
                    }
                    i++;
                }
                component.set("v.draftPost",list);
                break;
            case 'AlreadyPublished':
                list = component.get("v.publishedPost");
                while(i<=list.length && keep) {
                	if(list[i].Id === post.Id) {
                        list.splice(i,1);
                        keep = false;
                    }
                    i++;
                }
                component.set("v.publishedPost",list);
        }
    },
    //this can be refactored with the previous code
    updatePostContent : function(component,postStatus,post) {
    	var list;
        var i = 0;
        var keep = true;
        console.log("inside helper");
        console.log(postStatus);
        switch(postStatus) {
            case 'Ready':
                list = component.get("v.appPost");
                while(i<=list.length && keep) {
                	if(list[i].Id === post.Id) {
                        list[i]=post;
                        keep = false;
                    }
                    i++;
                }
                component.set("v.appPost",list);
                break;
            case 'Draft':
                list = component.get("v.draftPost");
                console.log("inside the case");
				while(i<=list.length && keep) {
                	if(list[i].Id === post.Id) {
                        console.log("THE POST IS EQUAL");
                        list[i]=post;
                        keep = false;
                    }
                    i++;
                }
                component.set("v.draftPost",list);
                break;
            case 'Published':
                list = component.get("v.publishedPost");
                while(i<=list.length && keep) {
                	if(list[i].Id === post.Id) {
                        list[i]=post;
                        keep = false;
                    }
                    i++;
                }
                component.set("v.publishedPost",list);
        }
    }
    
})