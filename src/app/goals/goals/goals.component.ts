import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, model, signal } from '@angular/core';
import { Observable, map, take } from 'rxjs';
import { GoalsService } from '../../services/goals.service';
import { AsyncPipe } from '@angular/common';
import { GoalViewModel } from '../../models/goal-view';
import { GoalComponent } from "../goal/goal.component";
import { GoalRender } from '../../models/goal-render';
import { FormBuilder, Validators, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NewGoal } from '../../models/new-goal';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { AddGoalDialog, NewGoalDialogData } from '../add-goal-dialog/add-goal-dialog';
import { Router } from '@angular/router';

@Component({
    selector: 'app-goals',
    standalone: true,
    templateUrl: './goals.component.html',
    styleUrl: './goals.component.scss',
    imports: [AsyncPipe, GoalComponent, ReactiveFormsModule, MatButtonModule]
})
export class GoalsComponent {
  goals$: Observable<GoalRender[]> | undefined;
  roots$: Observable<GoalRender[] | undefined> | undefined;
  readonly newRootDialog = inject(MatDialog);

  /**
   *
   */
  constructor(private goalsService: GoalsService, private fb: FormBuilder, private cdRef: ChangeDetectorRef, private router: Router) {
  
  }

  ngOnInit() {
    console.log('refreshing ui');
    this.updateGoals(true);
  }

  getUpdatedRoot(root: GoalRender): GoalRender {
    return { ...root }; // Creates a new reference
  }

  updateGoals($event: boolean) {
    console.log('emmited signal');
    this.goals$ = this.goalsService.getGoals();
    this.roots$ = this.goals$.pipe(
      map(goals => goals.filter(g => g.isRoot))
    );

    this.roots$.subscribe();
  }

  startAddingNewRoot() {
    const dialogRef = this.newRootDialog.open(AddGoalDialog, {
      data: {},
      backdropClass: 'dialog-bg-trans',
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.addNewRoot(result);
      }
    });
  }

  addNewRoot(input: NewGoalDialogData): any {
    const newGoal = new NewGoal(input.title, input.text, 0, true);
    this.goalsService.addGoal(newGoal);
    this.updateGoals(true);
  }
}
