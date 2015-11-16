var app = angular.module('myApp', []);
app.controller('CounterController', function($scope) {

    $scope.time_left = 25;
    $scope.fresh = true;
    $scope.running = false;
    $scope.break_count = 5;
    var timerId = 0;
    $scope.countdown_time = $scope.time_left;
    $scope.event;

    if($scope.event == 32) {
        console.log('OK');
    }

    document.getElementById("toggle").innerHTML = $scope.countdown_time;

    var t = $scope.countdown_time * 60;
    var m = Math.floor(t % 3600 / 60);
    var s = Math.floor(t % 3600 % 60);
    
    $scope.increment = function() {
        if ($scope.countdown_time >= 60) { return; }
        $scope.countdown_time++;
        t = $scope.countdown_time * 60;
        document.getElementById("toggle").innerHTML = $scope.countdown_time;
    };
    $scope.decrement = function() {
        if ($scope.countdown_time <= 1) { return; }
        $scope.countdown_time--;
        t = $scope.countdown_time * 60;
        document.getElementById("toggle").innerHTML = $scope.countdown_time;
    };
    $scope.breakIncrement = function() {
        if ($scope.break_count >= 10) { return; }
        $scope.break_count++;
    };
    $scope.breakDecrement = function() {
        if ($scope.break_count <= 1) { return; }
        $scope.break_count--;
    };

    $scope.breakTimer = function() {
        t = $scope.break_count*60;
        console.log(t);
        timerId = setInterval(function() {
            t -= 1;
            m = Math.floor(t % 3600 / 60);
            s = Math.floor(t % 3600 % 60);
            document.getElementById("break").innerHTML = 'break:';
            document.getElementById("toggle").innerHTML = m + ":" + (s < 10 ? "0" + s : s);

            if(t == 0) {
                document.getElementById("break").innerHTML = '';
                document.getElementById("toggle").innerHTML = 'Finished.';   
                clearInterval(timerId);
            }
        }, 1000);   
    }
    $scope.timer = function() {
        $scope.running = true;
        timerId = setInterval(function() {
            // n -= 1;
            t -= 1;
            m = Math.floor(t % 3600 / 60);
            s = Math.floor(t % 3600 % 60);
            document.getElementById("toggle").innerHTML = m + ":" + (s < 10 ? "0" + s : s);

            if(t == 0) {
                document.getElementById("toggle").innerHTML = 'Break time';
                clearInterval(timerId);
                return $scope.breakTimer();
            }
        }, 1000);
    };
    $scope.toggleTimer = function() {
        console.log('running');
        $scope.fresh = false;
        if($scope.running) { 
            clearInterval(timerId);
            $scope.running = false;
            return;
        }
        return $scope.timer()
    };

    $scope.reset = function() {
        clearInterval(timerId);
        $scope.time_left = $scope.countdown_time;
        t = $scope.time_left * 60;
        document.getElementById("break").innerHTML = '';
        document.getElementById("toggle").innerHTML = $scope.time_left;
        $scope.fresh = true;
    }
});