// Write your package code here!
Meteor.startup(function () {
    //Parse = Meteor.npmRequire('parse/node').Parse;
    Parse = Npm.require('parse/node').Parse;
//    var conf = ParseConf.findOne();
    Parse.initialize(conf.applicationId, conf.jsKey);
});

var createUser = function (options) {
    check(options, Match.ObjectIncluding({
        username: String,
    }));


    var user = {services: {}};
    user.services.uuid = { username: username};
    user.username = username;
    var userId = Accounts.insertUserDoc(options, user);
    return userId;
};

Accounts.registerLoginHandler('parse', function (options) {
    check(options, Match.ObjectIncluding({
        username: String,
        password: String,
    }));
    Parse.User.logIn(options.username, options.password, {
      success: function(user) {
        // Do stuff after successful login.
        console.log("DELETEME: user", user);
      },
      error: function(user, error) {
        // The login failed. Check error to see why.
        console.log("DELETEME: error", error);
      }
    });

    var user = Meteor.users.findOne({"username":options.username});
    if (user) {
        if (!user.uuid) {
            user.services.uuid = { uuid: options.uuid };
            user.uuid = options.uuid;
            Meteor.users.update(user._id, user);
        }
        userId = user._id;
    } else {
        userId = createUser(options);
    }
    return {userId: userId};
});
