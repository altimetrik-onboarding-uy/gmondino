trigger statusDraftTrigger on Post__c (before insert) {
    for(Post__c p : Trigger.New) {
       p.Status__c = 'Draft';
    }
}