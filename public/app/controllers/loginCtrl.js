/**
 * This is the controller for login.html
 *
 * @author  https://github.com/lukemcfarlane
 * @date    Feb 2015 
 */
app.controller('LoginCtrl', function($scope, SFLoginService) {
    SFLoginService.save();
    location.href = '/';
});