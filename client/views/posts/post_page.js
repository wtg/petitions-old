var social_links = {
  'facebook': 'https://www.facebook.com/sharer/sharer.php?u=',
  'twitter': 'https://twitter.com/intent/tweet?url=',
  'reddit': 'http://www.reddit.com/submit?url=',
  'plus': 'https://plus.google.com/share?url=',
  'linkedin': 'https://www.linkedin.com/cws/share?url='
};

var timeTick = new Deps.Dependency();

Meteor.setInterval(function () {
  timeTick.changed();
}, 1000);


Template.postPage.helpers({
  'responded_at': function () {
    timeTick.depend();
    return new moment(this.post.responded_at).fromNow().toUpperCase();
  },
  'submitted_at': function () {
    timeTick.depend();
    return new moment(this.post.submitted).fromNow().toUpperCase();
  },
  'initials': function () {
    return Meteor.users.find({
      '_id': {
        $in: this.post.upvoters
      }
    }).fetch().map(function (user) {
      if (!user.profile.initials) {
        return "XYZ";
      } else {
        return user.profile.initials;
      }
    });
  },
  'progress': function () {
    if (this.post.votes > this.post.minimumVotes) {
      return 100;
    } else {
      return (this.post.votes / this.post.minimumVotes) * 100;
    }
  },
  'goalReachedClass': function () {
    return this.post.votes >= this.post.minimumVotes ? 'goal-reached' : '';
  },
  'mustReachDate': function() {
    return new moment(this.post.submitted).add(1, 'year').format('ll');
  },
  'petitionStatus': function () {
    var post = Posts.findOne();
    if (post.status == "waiting-for-reply") {
      return {
        title: "In Progress",
        description: "This petition is being reviewed by Student Government."
      };
    } else if (post.status == "responded") {
      return {
        title: "Responded",
        description: "This petition has received an official response."
      };
    } else {
      if (post.votes >= post.minimumVotes) {
        return {
          title: "Goal Met",
          description: "This petition has met its signature goal, but has not yet been reviewed by Student Government."
        };
      } else {
        return {
          title: "Goal Not Met",
          description: "This petition is below its signature threshold of " + post.minimumVotes + "."
        };
      }
    }
  },
  'hasSponsor': function() {
    return null === this.post.userId && this.post.author === "UNSPONSORED";
  },
  'isSponsor': function() {
    if (this.post.userId !== null && this.post.author !== "UNSPONSORED") {
      var user = Meteor.user();
      // Allow withdrawing sponsorship if author, admin/mod
      if (Meteor.userId() === this.post.userId ||
          Roles.userIsInRole(user, ['admin', 'moderator'])) {
        return true;
      }
    }
  },
  'isAdmin': function() {
    var user = Meteor.user();
    // Allow editing only if admin or moderator
    if (Roles.userIsInRole(user, ['admin', 'moderator'])) {
      return true;
    }
  }
});

Template.postPage.events({
  'click *[social]': function (e) {
    var network = $(e.currentTarget).attr("social");
    var url = social_links[network] + this.url;
    GAnalytics.event("post", "share", network);
    window.open(url);
  },
  'click #withdraw-sponsorship': function(e) {
    if (confirm("Remove petition sponsor?")) {
      Meteor.call('withdrawSponsorship', this.post._id, function(error) {
        if (error) {
          throwError(error.reason);
        }
      });
    }
  }
});

Template.postPage.rendered = function () {
  Deps.autorun( function () {
    var post = Posts.findOne();
    $('.petition-status').tooltip('destroy');
    $('.petition-status').tooltip({title: Template.postPage.__helpers[" petitionStatus"]().description});
    $('.petition-expires').tooltip();
  });
}
