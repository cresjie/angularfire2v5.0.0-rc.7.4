import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { queue } from 'rxjs/scheduler/queue';
import { isPlatformServer } from '@angular/common';
import 'rxjs/add/operator/first';
export var FirebaseAppName = new InjectionToken('angularfire2.appName');
export var FirebaseAppConfig = new InjectionToken('angularfire2.config');
export var RealtimeDatabaseURL = new InjectionToken('angularfire2.realtimeDatabaseURL');
var FirebaseZoneScheduler = (function () {
    function FirebaseZoneScheduler(zone, platformId) {
        this.zone = zone;
        this.platformId = platformId;
    }
    FirebaseZoneScheduler.prototype.schedule = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return this.zone.runGuarded(function () { return queue.schedule.apply(queue, args); });
    };
    FirebaseZoneScheduler.prototype.keepUnstableUntilFirst = function (obs$) {
        var _this = this;
        if (isPlatformServer(this.platformId)) {
            return new Observable(function (subscriber) {
                var noop = function () { };
                var task = Zone.current.scheduleMacroTask('firebaseZoneBlock', noop, {}, noop, noop);
                obs$.first().subscribe(function () { return _this.zone.runOutsideAngular(function () { return task.invoke(); }); });
                return obs$.subscribe(subscriber);
            });
        }
        else {
            return obs$;
        }
    };
    FirebaseZoneScheduler.prototype.runOutsideAngular = function (obs$) {
        var _this = this;
        return new Observable(function (subscriber) {
            return _this.zone.runOutsideAngular(function () {
                return obs$.subscribe(function (value) { return _this.zone.run(function () { return subscriber.next(value); }); }, function (error) { return _this.zone.run(function () { return subscriber.error(error); }); }, function () { return _this.zone.run(function () { return subscriber.complete(); }); });
            });
        });
    };
    return FirebaseZoneScheduler;
}());
export { FirebaseZoneScheduler };
//# sourceMappingURL=angularfire2.js.map