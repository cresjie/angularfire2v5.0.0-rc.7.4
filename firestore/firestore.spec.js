import { FirebaseApp, FirebaseAppConfig, AngularFireModule, FirebaseAppName } from 'angularfire2';
import { AngularFirestore } from './firestore';
import { AngularFirestoreModule } from './firestore.module';
import { AngularFirestoreDocument } from './document/document';
import { AngularFirestoreCollection } from './collection/collection';
import { TestBed, inject } from '@angular/core/testing';
import { COMMON_CONFIG } from './test-config';
describe('AngularFirestore', () => {
    let app;
    let afs;
    let sub;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                AngularFireModule.initializeApp(COMMON_CONFIG),
                AngularFirestoreModule.enablePersistence()
            ]
        });
        inject([FirebaseApp, AngularFirestore], (_app, _afs) => {
            app = _app;
            afs = _afs;
        })();
    });
    afterEach(done => {
        app.delete();
        done();
    });
    it('should be the properly initialized type', () => {
        expect(afs instanceof AngularFirestore).toBe(true);
    });
    it('should have an initialized Firebase app', () => {
        expect(afs.firestore.app).toBeDefined();
        expect(afs.firestore.app).toEqual(app);
    });
    it('should create an AngularFirestoreDocument from a string path', () => {
        const doc = afs.doc('a/doc');
        expect(doc instanceof AngularFirestoreDocument).toBe(true);
    });
    it('should create an AngularFirestoreDocument from a string path', () => {
        const ref = afs.doc('a/doc').ref;
        const doc = afs.doc(ref);
        expect(doc instanceof AngularFirestoreDocument).toBe(true);
    });
    it('should create an AngularFirestoreCollection from a string path', () => {
        const collection = afs.collection('stuffs');
        expect(collection instanceof AngularFirestoreCollection).toBe(true);
    });
    it('should create an AngularFirestoreCollection from a reference', () => {
        const ref = afs.collection('stuffs').ref;
        const collection = afs.collection(ref);
        expect(collection instanceof AngularFirestoreCollection).toBe(true);
    });
    it('should throw on an invalid document path', () => {
        const singleWrapper = () => afs.doc('collection');
        const tripleWrapper = () => afs.doc('collection/doc/subcollection');
        expect(singleWrapper).toThrowError();
        expect(tripleWrapper).toThrowError();
    });
    it('should throw on an invalid collection path', () => {
        const singleWrapper = () => afs.collection('collection/doc');
        const quadWrapper = () => afs.collection('collection/doc/subcollection/doc');
        expect(singleWrapper).toThrowError();
        expect(quadWrapper).toThrowError();
    });
    it('should enable persistence', (done) => {
        const sub = afs.persistenceEnabled$.subscribe(isEnabled => {
            expect(isEnabled).toBe(true);
            done();
        });
    });
});
const FIREBASE_APP_NAME_TOO = (Math.random() + 1).toString(36).substring(7);
describe('AngularFirestore with different app', () => {
    let app;
    let afs;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                AngularFireModule.initializeApp(COMMON_CONFIG),
                AngularFirestoreModule
            ],
            providers: [
                { provide: FirebaseAppName, useValue: FIREBASE_APP_NAME_TOO },
                { provide: FirebaseAppConfig, useValue: COMMON_CONFIG }
            ]
        });
        inject([FirebaseApp, AngularFirestore], (app_, _afs) => {
            app = app_;
            afs = _afs;
        })();
    });
    afterEach(done => {
        app.delete().then(done, done.fail);
    });
    describe('<constructor>', () => {
        it('should be an AngularFirestore type', () => {
            expect(afs instanceof AngularFirestore).toEqual(true);
        });
        it('should have an initialized Firebase app', () => {
            expect(afs.firestore.app).toBeDefined();
            expect(afs.firestore.app).toEqual(app);
        });
        it('should have an initialized Firebase app instance member', () => {
            expect(afs.firestore.app.name).toEqual(FIREBASE_APP_NAME_TOO);
        });
    });
});
describe('AngularFirestore without persistance', () => {
    let app;
    let afs;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                AngularFireModule.initializeApp(COMMON_CONFIG),
                AngularFirestoreModule
            ]
        });
        inject([FirebaseApp, AngularFirestore], (_app, _afs) => {
            app = _app;
            afs = _afs;
        })();
    });
    it('should not enable persistence', (done) => {
        afs.persistenceEnabled$.subscribe(isEnabled => {
            expect(isEnabled).toBe(false);
            done();
        });
    });
});
//# sourceMappingURL=firestore.spec.js.map