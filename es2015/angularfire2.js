import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { queue } from 'rxjs/scheduler/queue';
import { isPlatformServer } from '@angular/common';
import 'rxjs/add/operator/first';
export const FirebaseAppName = new InjectionToken('angularfire2.appName');
export const FirebaseAppConfig = new InjectionToken('angularfire2.config');
export const RealtimeDatabaseURL = new InjectionToken('angularfire2.realtimeDatabaseURL');
export class FirebaseZoneScheduler {
    constructor(zone, platformId) {
        this.zone = zone;
        this.platformId = platformId;
    }
    schedule(...args) {
        return this.zone.runGuarded(function () { return queue.schedule.apply(queue, args); });
    }
    keepUnstableUntilFirst(obs$) {
        if (isPlatformServer(this.platformId)) {
            return new Observable(subscriber => {
                const noop = () => { };
                const task = Zone.current.scheduleMacroTask('firebaseZoneBlock', noop, {}, noop, noop);
                obs$.first().subscribe(() => this.zone.runOutsideAngular(() => task.invoke()));
                return obs$.subscribe(subscriber);
            });
        }
        else {
            return obs$;
        }
    }
    runOutsideAngular(obs$) {
        return new Observable(subscriber => {
            return this.zone.runOutsideAngular(() => {
                return obs$.subscribe(value => this.zone.run(() => subscriber.next(value)), error => this.zone.run(() => subscriber.error(error)), () => this.zone.run(() => subscriber.complete()));
            });
        });
    }
}
//# sourceMappingURL=angularfire2.js.map