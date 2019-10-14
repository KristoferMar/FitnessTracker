import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore'
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { tick } from '@angular/core/testing';
import { UIService } from 'src/app/shared/ui.service';
import * as fromTraining from '../training.reducer'
import * as fromRoot from '../../app.reducer'

import { Store } from '@ngrx/store'

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  exercises$: Observable<Exercise[]>;
  exerciseSubscription: Subscription;
  private loadingSubscription: Subscription;
  isLoading$: Observable<boolean>;

  constructor(
    private trainingService: TrainingService,
    private db: AngularFirestore,
    private uiService: UIService,
    private store: Store<fromTraining.State>
  ) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.exercises$ = this.store.select(fromTraining.getAvailableExercises)
      // this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(
      //   isLoading => {
      //     this.isLoading = isLoading;
      //   })
    // this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(
    //   exercises => {
    //     this.exercises = exercises
    //   }
    // );
    this.fetchExercises();
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  // ngOnDestroy() {
  //   if (this.exerciseSubscription) {
  //     this.exerciseSubscription.unsubscribe();
  //   }
  //   // if (this.loadingSubscription) {
  //   //   this.loadingSubscription.unsubscribe();
  //   // }
  // }

}
