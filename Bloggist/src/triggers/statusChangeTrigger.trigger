trigger statusChangeTrigger on Post__c (before update) {
    for(Post__c p : Trigger.New) {
        if(p.Status__c == 'Draft') {
            p.Status__c = 'Under Review';
        } else if (p.Status__c == 'Under Review') {
            p.Status__c = 'Ready';
        }
    }
}