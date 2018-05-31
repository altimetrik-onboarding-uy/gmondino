public with sharing class PostController {
    @AuraEnabled
    public static Post__c savePost (Post__c post){
        upsert post;
        return post;
    }
    @AuraEnabled
    public static List<Post__c> getAppPosts() {
        return [SELECT Id, Name, Title__c, Content__c, Tag__c 
                FROM Post__c
                WHERE Status__c = 'Ready'];
    }
    @AuraEnabled
    public static List<Post__c> getSubPosts() {
        return [SELECT Id, Name, Title__c, Content__c, Tag__c 
                FROM Post__c
                WHERE Status__c = 'Under Review'];
    }
    @AuraEnabled
    public static List<Post__c> getDraftPosts() {
        return [SELECT Id, Name, Title__c, Content__c, Tag__c 
                FROM Post__c
                WHERE Status__c = 'Draft'];
    }
    
/*    @AuraEnabled
    public static void discardPost(Id postId) {
        Post__c deleteable = [SELECT Id FROM Post__c WHERE Status__c = :postId];
        delete deleteable;
    } */
    
     @AuraEnabled
    public static void discardPost(Post__c post) {
        delete post;
    }
    
    @AuraEnabled
    public static void changePostStatus(Post__c post) {
        if (post.Status__c == 'Draft') {
            post.Status__c = 'Under Review';
        } else if (post.Status__c == 'Under Review') {
            post.Status__c = 'Ready';
        } else if (post.Status__c == 'Ready') {
            post.Status__c = 'Published';
        }
        update post;
    }
}