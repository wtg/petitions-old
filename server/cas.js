Accounts.onCreateUser(function(options, user) {
  var name = options.profile.name;
  user.username = name;

  // Build user profile information using CAS id
  user.profile = {}
  user.profile.name = name;
  user.profile.displayName = name;
  user.profile.initials = name.charAt(5) + name.charAt(0);
  user.profile.initials = user.profile.initials.toUpperCase();
  user.profile.sn = name;
  user.profile.givenName = name;

  return user;
});