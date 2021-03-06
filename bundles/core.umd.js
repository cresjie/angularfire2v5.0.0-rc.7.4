(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs/Observable'), require('rxjs/scheduler/queue'), require('@angular/common'), require('rxjs/add/operator/first'), require('@firebase/app')) :
    typeof define === 'function' && define.amd ? define(['exports', '@angular/core', 'rxjs/Observable', 'rxjs/scheduler/queue', '@angular/common', 'rxjs/add/operator/first', '@firebase/app'], factory) :
    (factory((global.angularfire2 = global.angularfire2 || {}),global.ng.core,global.Rx,global.Rx.Scheduler,global.ng.common,global.Rx.Observable.prototype,global.firebase));
}(this, (function (exports,_angular_core,rxjs_Observable,rxjs_scheduler_queue,_angular_common,rxjs_add_operator_first,firebase) { 'use strict';

firebase = 'default' in firebase ? firebase['default'] : firebase;

var FirebaseAppName = new _angular_core.InjectionToken('angularfire2.appName');
var FirebaseAppConfig = new _angular_core.InjectionToken('angularfire2.config');
var RealtimeDatabaseURL = new _angular_core.InjectionToken('angularfire2.realtimeDatabaseURL');
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
        return this.zone.runGuarded(function () { return rxjs_scheduler_queue.queue.schedule.apply(rxjs_scheduler_queue.queue, args); });
    };
    FirebaseZoneScheduler.prototype.keepUnstableUntilFirst = function (obs$) {
        var _this = this;
        if (_angular_common.isPlatformServer(this.platformId)) {
            return new rxjs_Observable.Observable(function (subscriber) {
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
        return new rxjs_Observable.Observable(function (subscriber) {
            return _this.zone.runOutsideAngular(function () {
                return obs$.subscribe(function (value) { return _this.zone.run(function () { return subscriber.next(value); }); }, function (error) { return _this.zone.run(function () { return subscriber.error(error); }); }, function () { return _this.zone.run(function () { return subscriber.complete(); }); });
            });
        });
    };
    return FirebaseZoneScheduler;
}());

var FirebaseApp = (function () {
    function FirebaseApp() {
    }
    return FirebaseApp;
}());
function _firebaseAppFactory(config, name) {
    var appName = name || '[DEFAULT]';
    var existingApp = firebase.apps.filter(function (app) { return app.name == appName; })[0];
    return existingApp || firebase.initializeApp(config, appName);
}
var FirebaseAppProvider = {
    provide: FirebaseApp,
    useFactory: _firebaseAppFactory,
    deps: [FirebaseAppConfig, FirebaseAppName]
};
var AngularFireModule = (function () {
    function AngularFireModule() {
    }
    AngularFireModule.initializeApp = function (config, appName) {
        return {
            ngModule: AngularFireModule,
            providers: [
                { provide: FirebaseAppConfig, useValue: config },
                { provide: FirebaseAppName, useValue: appName }
            ]
        };
    };
    AngularFireModule.decorators = [
        { type: _angular_core.NgModule, args: [{
                    providers: [FirebaseAppProvider],
                },] },
    ];
    return AngularFireModule;
}());

exports.FirebaseAppName = FirebaseAppName;
exports.FirebaseAppConfig = FirebaseAppConfig;
exports.RealtimeDatabaseURL = RealtimeDatabaseURL;
exports.FirebaseZoneScheduler = FirebaseZoneScheduler;
exports.FirebaseApp = FirebaseApp;
exports._firebaseAppFactory = _firebaseAppFactory;
exports.AngularFireModule = AngularFireModule;

Object.defineProperty(exports, '__esModule', { value: true });

})));
