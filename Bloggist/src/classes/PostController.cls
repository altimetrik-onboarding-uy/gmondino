public with sharing class PostController {
    @AuraEnabled
    public static Post__c savePost (Post__c post){
       insert post;
       return post;
    }
    @AuraEnabled
    public static List<Post__c> getAppPosts() {
        return [SELECT Id, Name, Title__c, Content__c, Tag__c
                FROM Post__c
                WHERE Status__c = 'Ready'
                AND OwnerId = :UserInfo.getUserId()];
    }
    @AuraEnabled
    public static List<Post__c> getSubPosts() {
        return [SELECT Id, Name, Title__c, Content__c, Tag__c
                FROM Post__c
                WHERE Status__c = 'Under Review'
                AND OwnerId = :UserInfo.getUserId()];
    }
    @AuraEnabled
    public static List<Post__c> getDraftPosts() {
        return [SELECT Id, Name, Title__c, Content__c, Tag__c
                FROM Post__c
                WHERE Status__c = 'Draft'
                AND OwnerId = :UserInfo.getUserId()];
    }
    @AuraEnabled
    public static List<Post__c> getPublishedPosts() {
        return [SELECT Id, Name, Title__c, Content__c, Tag__c
                FROM Post__c
                WHERE Status__c = 'Published'
                AND OwnerId = :UserInfo.getUserId()];
    }
    @AuraEnabled
    public static void discardPost(Post__c post) {
        delete post;
    }
    @AuraEnabled
    public static void submitPost(Post__c post){
        post.Status__c = 'Under Review';
        update post;
        
        Approval.ProcessSubmitRequest request = new Approval.ProcessSubmitRequest();
	    request.setObjectId(post.id);
 		request.setProcessDefinitionNameOrId('Approve_post_submit');
        User usr = [Select Id, ManagerId FROM User WHERE Id = :UserInfo.getUserId()];
        Approval.ProcessResult result = Approval.process(request);
    } 
    @AuraEnabled
    public static Post__c publishPost(Post__c post) {
        post.Status__c = 'Published';
        post.Published_Date__c = Date.today();
        update post;
        return post;
    }
}