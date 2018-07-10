global class emailNotificationBatch implements Database.Batchable<sObject> {
  	
    Map<Id,String> postsByManager = new Map<Id,String>();
    
    global Database.QueryLocator start(Database.BatchableContext bc) {
      return Database.getQueryLocator('SELECT Id, Title__c, Approver__c FROM Post__c WHERE Status__c == \'Under Review\' ');
    }
    
    global void execute(Database.BatchableContext bc, List<Post__c> posts){
        for (Post__c p: posts) {
            //Adds the post title to the string for the mail body
            if(p.Approver__c != null){ 
                String add = postsByManager.get(p.Approver__c);
                add = add + ', ' + p.Title__c;
                postsByManager.put(p.Approver__c, add);                
            }
        }
    }
    
    global void finish(Database.BatchableContext bc){
        list<User> managers = [SELECT Id, Email FROM User WHERE Id in :postsByManager.keySet()];
        for(User u : managers){
          if(u.Email != null){
            Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
            String[] ad = new String[] { u.Email };
            email.setToAddresses(ad);
            email.setSubject('Review reminder');
            email.setHtmlBody('You have the following post for reviewing <br/><br/>' + postsByManager.get(u.Id));
              try{
                  Messaging.sendEmail(new Messaging.SingleEmailMessage[] { email });
              } catch(exception e) {
                  System.debug(e.getMessage());
              }    
          }
        }
    } 
}