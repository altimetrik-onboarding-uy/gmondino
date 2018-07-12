global class emailNotificationBatch implements Database.Batchable<sObject>, Database.Stateful {
  	
    Map<Id,String> postsByManager = new Map<Id,String>();
    
    global Database.QueryLocator start(Database.BatchableContext bc) {
      return Database.getQueryLocator('SELECT Id, Title__c, Approver__c FROM Post__c WHERE Status__c = \'Under Review\' ');
    }
    
    global void execute(Database.BatchableContext bc, List<Post__c> posts){
        for (Post__c p: posts) {
            //Adds the post title to the string for the mail body
            if(p.Approver__c != null){ 
                System.debug('Inside if execute');
                String add = postsByManager.get(p.Approver__c);
                if(add != null){
                System.debug('String' + add);
                add = add + ', ' + p.Title__c;
                } else {
                    add = p.Title__c;
                }
                postsByManager.put(p.Approver__c, add);
                System.debug('String ' + add);                  
            }
        }
        System.debug(postsByManager);
        System.debug('Keyset = ' + postsByManager.keySet());
    }
    
    global void finish(Database.BatchableContext bc){
        list<User> managers = [SELECT Id, Email FROM User WHERE Id in :postsByManager.keySet()];
        List<Messaging.SingleEmailMessage> mails = new List<Messaging.SingleEmailMessage>();
        System.debug(postsByManager.keySet());
        System.debug(managers);
        for(User u : managers){
          if(u.Email != null){
            Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
            String[] ad = new String[] { u.Email };
            System.debug('Email es ' + u.Email);
            email.setToAddresses(ad);
            email.setSubject('Review reminder');
            email.setReplyTo('gmondino@Altimetrik.com');
            email.setSenderDisplayName('Salesforce Notification');
     //       email.setHtmlBody('You have the following post for reviewing <br/><br/>' + postsByManager.get(u.Id));
            email.setPlainTextBody('You have the following post for reviewing ' + postsByManager.get(u.Id));
            mails.add(email);  
     //         try{
            Messaging.sendEmail(mails);
    //          } catch(exception e) {
    //              System.debug(e.getMessage());
    //          }    
          }
        }
    } 
}