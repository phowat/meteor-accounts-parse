Meteor.loginWithUuid = function (username, password, callback) {
    Accounts.callLoginMethod({
        methodArguments: [{username: username, password: password}],
        userCallback: function (error, result) {
            if (error) {
                callback && callback(error);
            } else {
                callback && callback();
            }
        }
    });
};
