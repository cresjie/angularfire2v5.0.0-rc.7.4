import { FirebaseDatabase } from '@firebase/database-types';
import { NgZone } from '@angular/core';
import { FirebaseListObservable } from './firebase_list_observable';
import { FirebaseListFactoryOpts, FirebaseObjectFactoryOpts, PathReference } from './interfaces';
import { FirebaseObjectObservable } from './firebase_object_observable';
import { FirebaseOptions } from '@firebase/app-types';
import { RealtimeDatabaseURL } from 'angularfire2';
export declare class AngularFireDatabase {
    database: FirebaseDatabase;
    constructor(config: FirebaseOptions, name: string, databaseURL: string, zone: NgZone);
    list(pathOrRef: PathReference, opts?: FirebaseListFactoryOpts): FirebaseListObservable<any[]>;
    object(pathOrRef: PathReference, opts?: FirebaseObjectFactoryOpts): FirebaseObjectObservable<any>;
}
export { RealtimeDatabaseURL };
