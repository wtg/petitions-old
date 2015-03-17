Template.postSponsor.helpers({
  'availableSponsors': function() {
    return Meteor.users.find({});
  }
});

Template.postSponsor.events({
  'submit form' : function (e) {
    e.preventDefault();

    var postId = this.post._id;
    var sponsorId = $("#sponsorSelect").val();

    Meteor.call('addSponsor', postId, sponsorId, function(error) {
      if (error) {
        throwError(error.reason);
      } else {
        throwError("Sponsor Changed");
        setTimeout(function() {$('#postSponsorModal').modal("hide")}, 1000);
      }
    });
  }
});