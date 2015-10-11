Accounts.onCreateUser(function(options, user) {
  console.log("CALLED");
  var name = options.profile.name.toLowerCase();
  user.username = name;

  HTTP.call( 'GET', 'https://cms.union.rpi.edu/api/users/view_rcs/' + user.username, {headers: {Authorization: "Token <token>"}}, function( error, response ) {
    if ( error ) {
      console.log( error );
    } else {
      console.log( response );
      var realName = response.data.first_name + response.data.last_name;
      console.log(response.data.user_type);
      var isEmployee = (response.data.user_type == "Employee");

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
        console.log("done");
        return user;
      } else {
        console.log("FAILED")
        return null
      }
    }
  });
});
