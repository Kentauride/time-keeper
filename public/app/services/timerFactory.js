/**
 * A Timer instance is to be used in conjuction with
 * a timer element (see directives/timer.js).
 *
 * @author  https://github.com/lukemcfarlane
 * @date    Jan 2015
 */
app.factory('Timer', function() {
    var Timer = function(options) {
        this.id = _.uniqueId('timer_');
        this.onStart = options.onStart;
        this.onStop = options.onStop;
        this.onSave = options.onSave;
        this.onDelete = options.onDelete;
        this.isRunning = options.running;
    };
    return Timer;
});