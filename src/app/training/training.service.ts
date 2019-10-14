import { Subject } from 'rxjs-compat'
import { Exercise } from './exercise.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Store } from '@ngrx/store'
import { take } from 'rxjs/operators'

import { Subscription } from 'rxjs'
import { UIService } from 'src/app/shared/ui.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import * as UI from '../shared/ui.actions'
import * as fromRoot from '../app.reducer'
import * as Training from './training.action'
import * as fromTraining from './training.reducer'

@Injectable()
export class TrainingService {
    // exerciseChanged = new Subject<Exercise>();
    // exercisesChanged = new Subject<Exercise[]>();
    // finishedExercisesChanged = new Subject<Exercise[]>();
    // private availableExercises: Exercise[] = [];
    // private runnintExercise: Exercise;
    private fbSubs: Subscription[] = [];

    constructor(
        private db: AngularFirestore,
        private uiService: UIService,
        private store: Store<fromTraining.State>) { }

    fetchAvailableExercises() {
        this.store.dispatch(new UI.StartLoading());
        //valueChanges() gives us an observable so we can subscribe. It strips out metadata
        //.valueChanges()
        //snapshotChanges() gives us a larger object with id and detailed payload.
        // this.uiService.loadingStateChanged.next(true)
        this.fbSubs.push(this.db
            .collection('availableExercises')
            .snapshotChanges()
            .map(docArray => {
                // throw(new Error());
                return docArray.map(doc => {
                    return {
                        id: doc.payload.doc.id,
                        name: doc.payload.doc.data()['name'],
                        duration: doc.payload.doc.data()['duration'],
                        calories: doc.payload.doc.data()['calories']
                    };
                });
            }).subscribe(
                (exercises: Exercise[]) => {
                    this.store.dispatch(new UI.StopLoading());
                    this.store.dispatch(new Training.SetAvailableTrainings(exercises));

                    //Old code using services
                    // this.uiService.loadingStateChanged.next(false)
                    // this.availableExercises = exercises;
                    // this.exercisesChanged.next([...this.availableExercises]);
                }, error => {
                    this.store.dispatch(new UI.StopLoading());
                    // this.uiService.loadingStateChanged.next(false);
                    this.uiService.showSnackbar('Fetching Exercises failed, please try agin later', null, 3000);
                    // this.exercisesChanged.next(null);
                }))
    }

    startExercise(selectedId: string) {
        this.store.dispatch(new Training.StartTraining(selectedId))

        // how to select a single document and update it in angular firebase.
        // this.db.doc('availableExercises/' + selectedId).update({lastSelected: new Date()})
        // this.runnintExercise = this.availableExercises.find(
        //     ex => ex.id === selectedId);
        // this.exerciseChanged.next({ ...this.runnintExercise })
    }

    cancelExercise(progress: number) {
        this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {
            this.addDataToDatabase({
                ...ex,
                duration: ex.duration * (progress / 100),
                calories: ex.calories * (progress / 100),
                date: new Date(),
                state: 'cancelled'
            });
            this.store.dispatch(new Training.StopTraining());
        });
    }

    completeExercise() {
        this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {
            this.addDataToDatabase({
                ...ex,
                date: new Date(),
                state: 'completed'
            });
            this.store.dispatch(new Training.StopTraining());
        });
    }

    // getRunningExercise() {
    //     return { ...this.runnintExercise };
    // }

    fetchCompletedOrCancelledExercises() {
        this.fbSubs.push(this.db
            .collection('finishedExercises')
            .valueChanges()
            .subscribe((exercises: Exercise[]) => {
                this.store.dispatch(new Training.SetFinishedTrainings(exercises))
                // this.finishedExercisesChanged.next(exercises);
            }))

        //This would be an error handler
        // , error => {
        //     // console.log(error)
        // }
    }

    cancleSubscriptions() {
        this.fbSubs.forEach(sub => sub.unsubscribe());
    }

    private addDataToDatabase(exercise: Exercise) {
        this.db.collection('finishedExercises').add(exercise);
    }
}