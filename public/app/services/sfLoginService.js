app.factory('SFLoginService', function(clientID, $cookies, $location) {
    var isLoggedIn = false;
    var oAuthDetails = null;

    if($cookies.accessToken && $cookies.userEndpoint) {
        isLoggedIn = true;
        oAuthDetails = {
            accessToken: $cookies.accessToken,
            userEndpoint: $cookies.userEndpoint
        };
    }

    var SFLoginFactory = {
        isLoggedIn: isLoggedIn,
        oAuthDetails: oAuthDetails,
        getURL: function() {
            var redirectURI = encodeURI('http://localhost/login.html');
            return 'https://login.salesforce.com/services/oauth2/authorize?response_type=token' + 
                        '&client_id=' + clientID + 
                        '&redirect_uri=' + redirectURI;
        }, 
        getOAuthResponse: function() {
            var params = queryString.parse($location.hash());
            var accessToken = params['access_token'];
            var userEndpoint = params['id'];
            if(!accessToken && !userEndpoint) return null;
            return {
                accessToken: accessToken,
                userEndpoint: userEndpoint
            }
        },
        save: function() {
            var response = SFLoginFactory.getOAuthResponse();
            console.log('Saving login details: ', response);
            $cookies.accessToken = response.accessToken;
            $cookies.userEndpoint = response.userEndpoint;
            SFLoginFactory.isLoggedIn = true;
        }
    };
    return SFLoginFactory;
});