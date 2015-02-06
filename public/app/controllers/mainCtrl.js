/**
 * This is the controller for index.html
 *
 * @author  https: //github.com/lukemcfarlane
 * @date    Dec 2014
 */
app.controller('MainCtrl', function($scope, $http, $interval, Timer, SFLoginService) {
	$scope.alerts = [];

    $scope.timers = [];
    $scope.timeEntries = [];

    $scope.loginStatus = 'Login';

    if(SFLoginService.isLoggedIn) {
        var req = {
            method: 'GET',
            url: SFLoginService.oAuthDetails.userEndpoint,
            headers: {
                'Authorization': 'Bearer ' + 
                SFLoginService.oAuthDetails.accessToken
            }
        };
        $http(req)
            .then(function(data) {
                debugger
            });
    }

    var deleteTimer = function(id, doConfirm) {
        if(!doConfirm || confirm('Do you wish to delete this timer?')) {
            $scope.timers = _.reject($scope.timers, { 
                id: id 
            });
            if($scope.timers.length === 0) $scope.addTimer(false);
        }
    };

    var saveTimeEntry = function(id, duration, description) {
        if(confirm('Are you sure that you wish to log this timer?')) {
            $scope.timeEntries.push({
                duration: duration,
                description: description
            });
            deleteTimer(id, false);
        }
    };

	$scope.closeAlert = function(index) {
		$scope.alerts.splice(index, 1);
	};

    $scope.addTimer = function(startTimingNow) {
        $scope.timers.push(
            new Timer({
                onSave: saveTimeEntry,
                onStart: function(id) {
                    console.log('Started ' + id);
                    // Stop all other timers
                    var allOtherTimers = _.reject($scope.timers, {
                        id: id
                    });
                    allOtherTimers.forEach(function(timer) {
                        timer.stop();
                    });
                },
                onStop: function(id) {
                    console.log('Stopped ' + id);
                },
                onDelete: function(id) {
                    var doConfirm = true;
                    deleteTimer(id, doConfirm);
                },
                running: startTimingNow
            })
        );
    };

    $scope.login = function() {
        location.href = SFLoginService.getURL();
    };

    var init = function() {
        $scope.addTimer(false);
    };
    init();
});