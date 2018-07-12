@isTest
public class PostControllerTest {
    private static testMethod void exec() {
        Contact chiv = new Contact(LastName = 'testContact');
        insert chiv;
        Post__c newPost = new Post__c(Title__c='testTitle',Content__c='testContent',Tag__c='testTag',Author__c=chiv.id);
        Test.startTest();
        PostController.savePost(newPost);
        PostController.discardPost(newPost);
        Test.stopTest();

        System.assertEquals(0,[SELECT count()
                            	FROM Post__c
                            	WHERE Title__c = 'testTitle'
                                AND Tag__c = 'testTag'
                                AND Author__c != null]);
       
    }
    private static testMethod void allStatus(){
        Post__c dr = new Post__c (Title__c='titledr',Tag__c='tagd');
        Post__c sb = new Post__c (Title__c='titlesb',Tag__c='tags');
            sb.Status__c='Under Review';
        Post__c pr = new Post__c (Title__c='titlepr',Tag__c='tagp');
            pr.Status__c='Published';
        
        insert dr;
        insert sb;
        insert pr;
        Test.startTest();
        List<Post__c> draft1 = PostController.getDraftPosts();
        List<Post__c> submitted1 = PostController.getSubPosts();
        List<Post__c> published1 = PostController.getPublishedPosts();
        
       if(draft1.size()== 1) {
            PostController.discardPost(dr);
        }
       if(submitted1.size()== 1) {
            PostController.discardPost(sb);
        }
        if(published1.size()== 1) {
            PostController.discardPost(pr);
        }        
        Test.stopTest();       
            
        List<Post__c> draft = [SELECT Id, Status__c, Title__c, Tag__c
               				   FROM Post__c
              				   WHERE Status__c = 'Draft'
             				   AND OwnerId = :UserInfo.getUserId()];      
        List<Post__c> submitted = [SELECT Id, Status__c, Title__c, Tag__c
                				    FROM Post__c
                				    WHERE Status__c = 'Under Review'
                				    AND OwnerId = :UserInfo.getUserId()];              
        List<Post__c> published = [SELECT Id, Status__c, Title__c, Tag__c
                				   FROM Post__c
                				   WHERE Status__c = 'Published'
                				   AND OwnerId = :UserInfo.getUserId()];
       System.assertEquals(0,draft.size() + submitted.size() + published.size());
  
    }
    private static testMethod void submiting(){
        User dave = [SELECT Id FROM User WHERE Alias = 'tdave'];
        User manager = [SELECT Id FROM User WHERE Id=:UserInfo.getUserId()];
        Test.startTest();
        system.runAs(dave){
       	 Post__c dr = new Post__c (Title__c='titledr',Status__c='Draft',Tag__c='tagd');
         insert dr;
         PostController.saveMod(dr);
         PostController.submitPost(dr);
        }
       system.runAs(manager){
       List<Post__c> pst = [SELECT id FROM Post__c WHERE Title__c ='titledr'];
       Approval.ProcessWorkitemRequest pwr = new Approval.ProcessWorkitemRequest();
       Id objectId = pst[0].Id;
       List<ProcessInstance> procins = /*new List<ProcessInstance>(*/[SELECT Id 
                                                                  FROM ProcessInstance 
                                                                  WHERE Status = 'Pending' 
                                                                  AND TargetObjectId = :objectId];//);
       List<ProcessInstanceWorkitem>  workitem = /*new List<ProcessInstanceWorkitem>(*/[SELECT Id 
                                                                                    FROM ProcessInstanceWorkitem 
                                                                                    WHERE ProcessInstanceId = :procins[0].id];//);
       if ((workitem != null) && (workitem.size() > 0)){
           pwr.setWorkItemId(workitem[0].id);
           pwr.setAction('Approve'); 
           Approval.ProcessResult pr = Approval.process(pwr);
           System.debug(pr.isSuccess());
        }
        }
        system.runAs(dave){
            List<Post__c> app = PostController.getAppPosts();
            System.debug(app.size());
            PostController.publishPost(app[0]);
            List<Post__c> pub = PostController.getPublishedPosts();
         Test.stopTest();
     }
          List<Post__c> published = [SELECT Id, Status__c, Title__c, Tag__c,Published_Date__c
                				   FROM Post__c
                				   WHERE Status__c = 'Published'
                				   AND OwnerId = :dave.id];
         Post__c chiv = published[0];
         boolean chib = chiv.Published_Date__c != null;
         System.assertEquals(true,(published.size()==1)&&chib);
    }    
    
    private static testMethod void lookUp(){
        List<User> usr = customLookUpController.fetchLookUpValues('Test Dave','User');
        System.assertEquals(1, usr.size());
    }
    
    @isTest static void batchTest(){
        User dave = [SELECT Id FROM User WHERE Alias = 'tdave'];
        User manager = [SELECT Id FROM User WHERE Id=:UserInfo.getUserId()];
        system.runAs(dave){
       	 Post__c dr = new Post__c (Title__c='titledr',Status__c='Draft',Tag__c='tagd');
         Post__c sr = new Post__c (Title__c='titlesr',Status__c='Draft',Tag__c='tagd');
           Post__c pst = PostController.savePost(dr);
           Post__c pst2 = PostController.savePost(sr);
           PostController.submitPost(dr);
           PostController.submitPost(sr);
        
        Test.startTest();
        emailNotificationBatch eNB = new emailNotificationBatch();
        Id batchId = Database.executeBatch(eNB);
        Test.stopTest();
        }
    } 
    
    @isTest static void schedTest(){
    scheduledBatch m = new scheduledBatch();
    String sch = '0 0 0 1/1 * ? *';
    String jobID = system.schedule('Sched posts', sch, m);
    }
}