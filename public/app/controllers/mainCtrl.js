/**
 * This is the controller for index.html
 *
 * @author  https: //github.com/lukemcfarlane
 * @date    Dec 2014
 */
app.controller('MainCtrl', function($scope, $http, $interval, Timer) {
	$scope.alerts = [];

    $scope.timers = [];


    var deleteTimer = function(id) {
        if($scope.timers.length > 1 && confirm('Do you wish to delete this timer?')) {
            $scope.timers = _.reject($scope.timers, { 
                id: id 
            });
        }
    };

	$scope.closeAlert = function(index) {
		$scope.alerts.splice(index, 1);
	};

    $scope.addTimer = function(startTimingNow) {
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
                },
                onDelete: function(id) {
                    deleteTimer(id);
                },
                running: startTimingNow
            })
        );
    };

    var init = function() {
        $scope.addTimer(false);
    };
    init();
});