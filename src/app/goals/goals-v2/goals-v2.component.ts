import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';
import { GoalV2 } from '../../models-2/goal-v2';
import { AsyncPipe } from '@angular/common';
import { GoalV2Component } from "../goal-v2/goal-v2.component";
import { GoalsV2Service } from '../../services/goals-v2.service';
import { AddGoalDialog, NewGoalDialogData } from '../add-goal-dialog/add-goal-dialog';
import { MatDialog } from '@angular/material/dialog';
import { NewGoalV2 } from '../../models-2/new-goal-v2';

@Component({
  selector: 'app-goals-v2',
  standalone: true,
  imports: [MatButtonModule, AsyncPipe, GoalV2Component],
  templateUrl: './goals-v2.component.html',
  styleUrl: './goals-v2.component.scss'
})
export class GoalsV2Component {
  goal$: Observable<GoalV2> | undefined;
  readonly newRootDialog = inject(MatDialog);

  /**
   *
   */
  constructor(private goalService: GoalsV2Service) {
  }

  ngOnInit() {
    this.goal$ = this.goalService.getGoal(0);
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
    const newGoal = new NewGoalV2(input.title, input.text, 0, true);
    this.goalService.addGoal(newGoal);
    this.updateGoals(0);
  }

  updateGoals($event: number) {
    console.log(`received signal, id=${$event}`);
    this.goal$ = this.goalService.getGoal($event);
  }
}
