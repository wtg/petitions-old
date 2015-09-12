Accounts.onCreateUser(function(options, user) {
  var name = options.profile.name.toLowerCase();
  user.username = name;

  // Build user profile information using CAS id
  user.profile = {}
  user.profile.sn = name;
  user.profile.name = name;
  user.profile.givenName = name;
  user.profile.displayName = name;

  // Remove RCS ID unique numbers and get initials 
  p_name = name.replace(/[0-9]/g, '');
  user.profile.initials = p_name.charAt(p_name.length - 1) + p_name.charAt(0);
  user.profile.initials = user.profile.initials.toUpperCase();

  return user;
});