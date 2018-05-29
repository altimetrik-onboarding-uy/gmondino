public with sharing class PostController {
    @AuraEnabled
    public static Post__c savePost (Post__c post){
        upsert post;
        return post;
    }
    
    public static List<Post__c> getAppPosts() {
        return [SELECT Id, Name, Title__c, Content__c, Tag__c 
                FROM Post__c
                WHERE Status__c = 'Ready'];
    }
    
    public static List<Post__c> getSubPosts() {
        return [SELECT Id, Name, Title__c, Content__c, Tag__c 
                FROM Post__c
                WHERE Status__c = 'Under Review'];
    }
    
    public static List<Post__c> getDraftPosts() {
        return [SELECT Id, Name, Title__c, Content__c, Tag__c 
                FROM Post__c
                WHERE Status__c = 'Draft'];
    }
}