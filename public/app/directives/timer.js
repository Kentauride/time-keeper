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
            instance: '='
        },
        controller: function($scope, $element, $window) {
            _.merge($scope, $scope.instance);

            var stopwatch = new StopWatch(null, false);
            $scope.elapsedSecs = 0;

            var updateTimeInput = function() {
                $element.find('#time-input').val($scope.getDurationFormatted());
            };

            var descriptionEl = $element.find('.description > input');
            descriptionEl.bind('keydown', function(e) {
                var backspaceKeyCode = 8;
                if(e.keyCode ===  backspaceKeyCode) {
                    if(descriptionEl.val() === '') {
                        $scope.onDelete($scope.id);
                    }
                }
            });

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
                $scope.onStart(
                    $scope.id
                );
            };

            $scope.stop = function() {
                if($scope.isRunning) {
                    $scope.isRunning = false;
                    stopwatch.stopTimer();
                    updateTimeInput();
                    $scope.onStop(
                        $scope.id
                    );
                }
            };

            $scope.save = function() {
                $scope.onSave(
                    $scope.id
                );
            };

            if($scope.isRunning) $scope.start();

            updateTimeInput();
            _.merge($scope.instance, $scope);
        },
        templateUrl: 'app/directives/templates/timer.html'
    };
});