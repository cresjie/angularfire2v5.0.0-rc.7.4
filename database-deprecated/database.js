import { Inject, Injectable, Optional, NgZone } from '@angular/core';
import { FirebaseListFactory } from './firebase_list_factory';
import { FirebaseObjectFactory } from './firebase_object_factory';
import * as utils from './utils';
import { FirebaseAppConfig, FirebaseAppName, RealtimeDatabaseURL, _firebaseAppFactory } from 'angularfire2';
var AngularFireDatabase = (function () {
    function AngularFireDatabase(config, name, databaseURL, zone) {
        this.database = zone.runOutsideAngular(function () {
            var app = _firebaseAppFactory(config, name);
            return app.database(databaseURL || undefined);
        });
    }
    AngularFireDatabase.prototype.list = function (pathOrRef, opts) {
        var ref = utils.getRef(this.database, pathOrRef);
        return FirebaseListFactory(ref, opts);
    };
    AngularFireDatabase.prototype.object = function (pathOrRef, opts) {
        var ref = utils.getRef(this.database, pathOrRef);
        return FirebaseObjectFactory(ref, opts);
    };
    AngularFireDatabase.decorators = [
        { type: Injectable },
    ];
    AngularFireDatabase.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [FirebaseAppConfig,] },] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [FirebaseAppName,] },] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [RealtimeDatabaseURL,] },] },
        { type: NgZone, },
    ]; };
    return AngularFireDatabase;
}());
export { AngularFireDatabase };
export { RealtimeDatabaseURL };
//# sourceMappingURL=database.js.map