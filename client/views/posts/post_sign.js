Template.postSign.events({
  'submit form': function(e) {
    e.preventDefault();
    var post = this.post;
    var buttonName = $('#sign-petition').attr('value');

    if (buttonName == "Sign") {
      var modify_sign = function () {
        Meteor.call('sign', post._id, function(error) {
        if (error)
          throwError(error.reason);
        else {
          var signaturesNeeded = post.minimumVotes - post.votes;
          if (signaturesNeeded >= 1) {
            $('#postShareModal').modal('show');
          }
        }
        });
      };
    } 
    else if (buttonName == "Unsign") {
      var modify_sign = function () {
        if (confirm("Are you sure you want to remove your signature from this petition?")) {
          Meteor.call('unsign', post._id, function(error) {
            if (error) {
              throwError(error.reason);
            }
          });
        }
      };
    }

    if (Meteor.userId()) {
      modify_sign();
    } else {
      Session.set("loginMsg", "Please login to sign.");
      $('#loginModal').modal('show');
      $('#loginModal').on('hidden.bs.modal', function () {
        if (Meteor.userId())
          sign();
      });
    }
  }
});

Template.postSign.helpers({
  signedClass: function() {
    var userId = Meteor.userId();
    if (userId && this.post && _.include(this.post.upvoters, userId) 
        && this.post.minimumVotes <= this.post.votes) {
      return 'disabled';
    } else {
      return '';
    }
  },
  btnText: function() {
    var userId = Meteor.userId();
    if (userId && this.post && _.include(this.post.upvoters, userId)
        && this.post.minimumVotes > this.post.votes) {
      return 'Unsign';
    } 
    else if (userId && this.post && _.include(this.post.upvoters, userId)) {
      return 'Signed';
    }
    else {
      return 'Sign';
    }
  }
});