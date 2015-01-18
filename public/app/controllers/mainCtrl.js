/**
 * This is the controller for index.html
 *
 * @author  https: //github.com/lukemcfarlane
 * @date    Dec 2014
 */
app.controller('MainCtrl', function($scope, $http, $interval, Timer) {
	$scope.alerts = [];

    $scope.timers = [];

	$scope.closeAlert = function(index) {
		$scope.alerts.splice(index, 1);
	};

    $scope.addTimer = function() {
        $scope.timers.push(
            new Timer({
                onSave: function(id) {
                    console.log('Saved ' + id);
                }, 
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
                }
            })
        );
    };

    var init = function() {
        $scope.addTimer();
    };
    init();
});