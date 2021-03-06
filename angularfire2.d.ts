import { InjectionToken, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { FirebaseOptions } from '@firebase/app-types';
import 'rxjs/add/operator/first';
export declare const FirebaseAppName: InjectionToken<string>;
export declare const FirebaseAppConfig: InjectionToken<FirebaseOptions>;
export declare const RealtimeDatabaseURL: InjectionToken<string>;
export declare class FirebaseZoneScheduler {
    zone: NgZone;
    private platformId;
    constructor(zone: NgZone, platformId: Object);
    schedule(...args: any[]): Subscription;
    keepUnstableUntilFirst<T>(obs$: Observable<T>): Observable<T>;
    runOutsideAngular<T>(obs$: Observable<T>): Observable<T>;
}
