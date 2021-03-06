import { Observable } from 'rxjs/Observable';
import { Operator } from 'rxjs/Operator';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';
import { Reference, DataSnapshot, ThenableReference } from '@firebase/database-types';
import { AFUnwrappedDataSnapshot, FirebaseOperationCases, QueryReference } from './interfaces';
export declare type FirebaseOperation = string | Reference | DataSnapshot | AFUnwrappedDataSnapshot;
export declare class FirebaseListObservable<T> extends Observable<T> {
    $ref: QueryReference;
    constructor($ref: QueryReference, subscribe?: <R>(subscriber: Subscriber<R>) => Subscription | Function | void);
    lift<T, R>(operator: Operator<T, R>): Observable<R>;
    push(val: any): ThenableReference;
    set(item: FirebaseOperation, value: Object): Promise<void>;
    update(item: FirebaseOperation, value: Object): Promise<void>;
    remove(item?: FirebaseOperation): Promise<void>;
    protected _checkOperationCases(item: FirebaseOperation, cases: FirebaseOperationCases): Promise<void>;
}
