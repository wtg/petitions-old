meteor add http

Accounts.onCreateUser(function(options, user) {
  var name = options.profile.name.toLowerCase();
  user.username = name;

  HTTP.call( 'GET', 'https://cms.union.rpi.edu/api/users/view_rcs/' + user.username, {headers: {Authorization: Token [INSERT WEBTECH API KEY HERE FROM CMS]}}, function( error, response ) {
  if ( error ) {
    console.log( error );
  } else {
    console.log( response );
    var nameObj = JSON.parse(response);
    var realName = nameObj.first_name + nameObj.last_name

    if nameObj.userType == "Employee"{
      var isEmployee == True
    } else {
      var isEmployee == False
    }
  }
});

if (!isEmployee){
  // Build user profile information using CAS id
  user.profile = {}
  user.profile.sn = name;
  user.profile.name = name;
  user.profile.givenName = name;
  user.profile.displayName = realName;

  // Remove RCS ID unique numbers and get initials 
  p_name = name.replace(/[0-9]/g, '');
  user.profile.initials = p_name.charAt(p_name.length - 1) + p_name.charAt(0);
  user.profile.initials = user.profile.initials.toUpperCase();

  return user;
} else {
  return null
}
});