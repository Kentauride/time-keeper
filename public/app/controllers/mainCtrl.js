/**
 * This is the controller for index.html
 *
 * @author  https: //github.com/lukemcfarlane
 * @date    Dec 2014
 */
app.controller('MainCtrl', function($scope, $http, $interval) {
	$scope.alerts = [];

    $scope.timers = [];

	$scope.closeAlert = function(index) {
		$scope.alerts.splice(index, 1);
	};

    $scope.addNewTimer = function() {
        $scope.timers.push({
        });
    };

    var init = function() {
        $scope.addNewTimer();
    };
    init();
});