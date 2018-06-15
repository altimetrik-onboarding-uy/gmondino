trigger statusDraftTrigger on Post__c (before insert) {
    for(Post__c p : Trigger.New) {       
        if(p.Status__c == null || string.isBlank(p.Status__c)){
            p.Status__c = 'Draft';
         }
    }
}