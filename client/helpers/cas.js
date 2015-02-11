Template.header.events({ 
  'click #casLogin': function(event, template) {
    Meteor.loginWithCas();
  },
  'click #logout-button': function(event, template) {
    event.preventDefault();
    return Meteor.logout();
  }
});

Template.accessDenied.events({
  'click #casLogin': function(event, template) {
    Meteor.loginWithCas();
  }
});