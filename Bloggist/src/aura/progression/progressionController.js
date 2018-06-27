({
	itemsChange: function(component, event) {
       var status = component.get("v.statusValue");
       var liDraft = component.find("draftLi");
       var liReady = component.find("readyLi");
       var liPublish = component.find("publishLi");
        if(status === 'Draft'){
          $A.util.removeClass(liDraft, 'slds-is-incomplete');
          $A.util.addClass(liDraft, 'slds-is-current');
          $A.util.addClass(liDraft, 'slds-is-active');
          $A.util.removeClass(liReady, 'slds-is-current');
          $A.util.removeClass(liReady, 'slds-is-active');
          $A.util.addClass(liReady, 'slds-is-incomplete');
          $A.util.removeClass(liPublish, 'slds-is-current');
          $A.util.removeClass(liPublish, 'slds-is-active');
          $A.util.addClass(liPublish, 'slds-is-incomplete');
        } else if (status === 'Ready') {
          $A.util.removeClass(liReady, 'slds-is-incomplete');
          $A.util.addClass(liReady, 'slds-is-current');
          $A.util.addClass(liReady, 'slds-is-active');
          $A.util.removeClass(liDraft, 'slds-is-current');
          $A.util.removeClass(liDraft, 'slds-is-active');
          $A.util.addClass(liDraft, 'slds-is-incomplete');
          $A.util.removeClass(liPublish, 'slds-is-current');
          $A.util.removeClass(liPublish, 'slds-is-active');
          $A.util.addClass(liPublish, 'slds-is-incomplete');
        } else if (status === 'Published') {
          $A.util.removeClass(liPublish, 'slds-is-incomplete');
          $A.util.addClass(liPublish, 'slds-is-current');
          $A.util.addClass(liPublish, 'slds-is-active');
          $A.util.removeClass(liDraft, 'slds-is-current');
          $A.util.removeClass(liDraft, 'slds-is-active');
          $A.util.addClass(liDraft, 'slds-is-incomplete');
          $A.util.removeClass(liReady, 'slds-is-current');
          $A.util.removeClass(liReady, 'slds-is-active');
          $A.util.addClass(liReady, 'slds-is-incomplete');
        }          
    }
    
})