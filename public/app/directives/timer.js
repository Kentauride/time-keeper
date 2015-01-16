/**
 * Usage:
 *
 *  <timer description="myDesc" ...
 *
 *
 * @author  https://github.com/lukemcfarlane
 * @date    Dec 2014
 */
app.directive('timer', function($interval) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            description: '&',
            elapsedSecs: '&',
            isRunning: '&'
        },
        controller: function($scope, $element, $window) {
            var stopwatch = new StopWatch(null, false);
            $scope.isRunning = false;
            $scope.elapsedSecs = 0;

            var updateTimeInput = function() {
                $element.find('#time-input').val($scope.getDurationFormatted());
            };

            var tick = function() {
                if($scope.isRunning) {
                    $scope.elapsedSecs = stopwatch.elapsedSeconds();
                    updateTimeInput();
                }
            };
            $interval(tick, 1 * 1000);

            $scope.getDurationFormatted = function() {
                if($scope.isRunning) {
                    return '' + stopwatch;
                } else {
                    return stopwatch.getStrWithoutSeconds();
                }
            };

            $scope.start = function() {
                $scope.isRunning = true;
                stopwatch.startTimer();
                updateTimeInput();
            };

            $scope.stop = function() {
                $scope.isRunning = false;
                stopwatch.stopTimer();
                updateTimeInput();
            };

            updateTimeInput();
        },
        templateUrl: 'app/directives/templates/timer.html'
    };
});