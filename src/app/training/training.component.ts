import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs-compat'
import { TrainingService } from './training.service';
import { Store } from '@ngrx/store'
import * as fromTraining from './training.reducer'

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  ongoingTraining$: Observable<boolean>
  // ongoingTraining = false;
  // exerciseSubscribtion: Subscription;

  constructor(private trainingService: TrainingService, private store: Store<fromTraining.State>) { }

  ngOnInit() {
    this.ongoingTraining$ = this.store.select(fromTraining.getIsTraining);

    // this.exerciseSubscribtion = this.trainingService.exerciseChanged.subscribe(
    //   exercise => {
    //     if (exercise) {
    //       this.ongoingTraining = true;
    //     } else {
    //       this.ongoingTraining = false;
    //     }
    //   }
    // );
  }

  // ngOnDestroy() {
  //   if (this.exerciseSubscribtion) {
  //     this.exerciseSubscribtion.unsubscribe();
  //   }
  // }
}
