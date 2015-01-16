/**
 * Stopwatch provides the functionality of a standard stop watch.
 * The difference between this stopwatch and other stopwatch examples
 * if that it will summate the time between multiple stops.
 */
var StopWatch = function (startTime, running) {

    // Idiom for scoping the this keyword.
    var me = this;

    // Timing information for the stop watch.
    me.startTime = startTime;
    me.getStartTime = function () {
        return me.startTime;
    };
    me.deltaTime = 0;
    me.getDeltaTime = function () {
        return me.deltaTime / 1000;
    };
    me.stopTime = null;
    me.running;

    /**
     * Sets the stopwatch's running field.
     * The intention of this method is to ensure that the running field is set in one place to help with debugging later on.
     * True means the stopwatch is running. False means it is paused.
     */
    me.setRunning = function(val) {
        me.running = val;
    }

    me.setRunning(running);

    /**
    * Author: Nathan K
    * Restarts the stopwatch with the given hours, minutes and seconds as the start time.
    */
    me.resetWithStartTime = function (h,m,s, rnning) {
        var timing = new Date(),
            newTime = timing.getTime() - me.convertHours(h) - me.convertMinutes(m) - me.convertSeconds(s);
        me.setRunning(rnning);

        me.startTime = null;
        me.stopTime = null;

        if (rnning) {
            me.startTime = newTime;
        } else {
            me.stopTime = newTime;
        }
        me.deltaTime = 0;
    };

    /**
     * If the stop watch has not been started then the stop watch is
     * started and the current time recorded is returned. If the stop
     * watch has already been started then nothing occurs and null is
     * returned.
     * @return {object}
     */
    me.startTimer = function () {
        var timing = new Date();
        if(null !== me.startTime) {
            return null;
        } else {
            me.startTime = timing.getTime();
            me.stopTime = null;
            me.setRunning(true);
            return me.secondsToTime(Math.floor(me.startTime / 1000));
        }
    };

    /**
     * If the stop watch has not been stopped then return the final
     * time and set the final time to the current time. If the stop
     * watch has already been stopped then return null.
     * @return {object}
     */
    me.stopTimer = function () {
        var timing = new Date();
        if(null !== me.stopTime) {
            return null;
        } else {
            me.stopTime = timing.getTime();
            me.deltaTime += me.stopTime - me.startTime;
            me.startTime = null;
            me.setRunning(false);
            return me.secondsToTime(Math.floor(( me.deltaTime ) / 1000));
        }
    };

    /**
     * If the timer is running then it is stopped, if the timer is
     * stopped then it is started.
     * @return {Boolean} If the timer is or isn't running.
     */
    me.toggleTimer = function() {
        if(me.running) {
            me.setRunning(false);
            me.stopTimer();
        } else {
            me.setRunning(true);
            me.startTimer();
        }
        return me.running;
    };

    me.resetTimer = function (rnning) {
        me.startTime = null;
        me.deltaTime = 0;
        me.stopTime = null;
        me.setRunning(rnning);
        return true;
    };

    /**
     * If the stopwatch has not been stopped then the difference between
     * the start time and the current time is returned. If the stopwatch
     * has been stopped then the difference between the start time and the
     * stop time is returned.
     * @return {object}
     */
    me.elapsedTime = function () {
        var timing = new Date();
        var secs = null;
        if(null !== me.startTime && true === me.running) {
            var elapsed = (timing.getTime()- me.startTime + me.deltaTime)/1000;
            return me.secondsToTime(Math.floor(elapsed));
        } else {
            return me.secondsToTime(Math.floor(( me.deltaTime ) / 1000));
        }
    };

    /**
     * If the stopwatch has not been stopped then the difference between
     * the start time and the current time is returned. If the stopwatch
     * has been stopped then the difference between the start time and the
     * stop time is returned.
     * @return int
     */
    me.elapsedSeconds = function () {
        var timing = new Date();
        var secs = null;
        if(null !== me.startTime && true === me.running) {
            var elapsed = (timing.getTime()- me.startTime + me.deltaTime)/1000;
            return Math.floor(elapsed);
        } else {
            return Math.floor(( me.deltaTime ) / 1000);
        }
    };

    /**
     * Returns if the stop watch is currently running or not.
     * @return {Boolean}
     */
    me.isRunning = function () {
        return me.running;
    };

    /**
     * Adds the number of hours to the stop watch.
     * @param {int} hrs Hours to add to the stop watch.
     */
    me.addHours = function(hrs) {
        me.deltaTime += hrs * 60 * 60 * 1000;
    };

    /**
     * Adds the number of minutes to the stop watch.
     * @param {int} mins Minutes to add to the stop watch.
     */
    me.addMinutes = function(mins) {
        me.deltaTime += mins * 60 * 1000;
    };

    /**
     * Adds the number of seconds to the stop watch.
     * @param {int} secs Seconds to add to the stop watch.
     */
    me.addSeconds = function(secs) {
        me.deltaTime += secs * 1000;
    };

    /**
    * Converts hours in to milliseconds
    */
    me.convertHours = function(hours) {
        return hours * 60 * 60 * 1000;
    }

    /**
    * Converts minutes in to milliseconds
    */
    me.convertMinutes = function(minutes) {
        return minutes * 60 * 1000;
    }

    /**
    * Converts seconds in to milliseconds
    */
    me.convertSeconds = function(seconds) {
        return seconds * 1000;
    }

    /**
     * Given some seconds convert them into hours minutes and seconds. Create
     * and object that can be used by the developer to extract this information
     * @param  {int} secs Seconds to convert into hours minutes seconds.
     * @return {object}
     */
    me.secondsToTime = function (secs) {
        var hours   = Math.floor( secs / 3600 );
        var minutes = Math.floor( ( secs - ( hours * 3600 ) ) / 60 );
        var seconds = Math.floor( secs - ( hours * 3600 ) - ( minutes * 60 ) );
        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        return {
            "hours" : hours,
            "minutes" : minutes,
            "seconds" : seconds
        };
    };

    me.capTime = function () {
        me.deltaTime = 3599999000;
    }


    me.toString = function () {
        var time = me.elapsedTime();
        return (time.hours + ":" + time.minutes + ":" + time.seconds);
    };

    me.getStrWithoutSeconds = function() {
        var time = me.elapsedTime();
        // Round up 1 minute:
        if(time.seconds >= 1) {
            time.minutes++;
            if(time.minutes == 0) {
                time.hours++;
                if (time.hours < 10) {
                    time.hours = "0" + time.hours;
                }
            }
            if (time.minutes < 10) {
                time.minutes = "0" + time.minutes;
            }
        }

        return (time.hours + ":" + time.minutes);
    }

};