import { Injectable, Inject, Optional, InjectionToken, NgZone, PLATFORM_ID } from '@angular/core';
import { createStorageRef } from './ref';
import { FirebaseAppConfig, FirebaseAppName, FirebaseZoneScheduler, _firebaseAppFactory } from 'angularfire2';
export const StorageBucket = new InjectionToken('angularfire2.storageBucket');
export class AngularFireStorage {
    constructor(config, name, storageBucket, platformId, zone) {
        this.scheduler = new FirebaseZoneScheduler(zone, platformId);
        this.storage = zone.runOutsideAngular(() => {
            const app = _firebaseAppFactory(config, name);
            return app.storage(storageBucket || undefined);
        });
    }
    ref(path) {
        return createStorageRef(this.storage.ref(path), this.scheduler);
    }
    upload(path, data, metadata) {
        const storageRef = this.storage.ref(path);
        const ref = createStorageRef(storageRef, this.scheduler);
        return ref.put(data, metadata);
    }
}
AngularFireStorage.decorators = [
    { type: Injectable },
];
AngularFireStorage.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [FirebaseAppConfig,] },] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [FirebaseAppName,] },] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [StorageBucket,] },] },
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] },] },
    { type: NgZone, },
];
//# sourceMappingURL=storage.js.map