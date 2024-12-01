import { Component, EventEmitter, Input, Output, inject, ChangeDetectionStrategy, SimpleChanges } from '@angular/core';
import { GoalViewModel } from '../../models/goal-view';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { GoalRender } from '../../models/goal-render';
import { GoalsService } from '../../services/goals.service';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { NewGoal } from '../../models/new-goal';
import { UpdateGoal } from '../../models/update-goal';
import { UUID } from 'crypto';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { AddGoalDialog, NewGoalDialogData } from '../add-goal-dialog/add-goal-dialog';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { ConfirmDeleteDialog } from '../confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-goal',
  standalone: true,
  imports: [MatCardModule, CommonModule, ReactiveFormsModule, MatButtonModule, MatIconModule],
  templateUrl: './goal.component.html',
  styleUrl: './goal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoalComponent {

  @Input()
  goal: GoalRender | undefined;

  @Output()
  isUpdate = new EventEmitter<boolean>(false);

  readonly newGoalDialog = inject(MatDialog);
  readonly confirmDeleteDialog = inject(MatDialog);
  /**
   *
   */
  constructor(private goalsService: GoalsService, private fb: FormBuilder) {
    
  }

  ngOnInit() {

  }

  startAddingChildGoal(goal: GoalRender | undefined) {
    const dialogRef = this.newGoalDialog.open(AddGoalDialog, {
      data: { parentGoalId: goal?.id },
      backdropClass: 'dialog-bg-trans',
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.addNewSubGoal(result, goal?.id);
      }
    });
  }

  updateGoals($event: boolean) {
    this.isUpdate.emit(true);
  }

  addNewSubGoal(input: NewGoalDialogData, parentGoalId: number | undefined): any {
    const newGoal = new NewGoal(input.title, input.text, parentGoalId, false);
    this.goalsService.addGoal(newGoal);
    console.log('adding sub-goal');
    this.isUpdate.emit(true);
  }

  confirmAndThenDelete(id: number|undefined) {
    const dialogRef = this.confirmDeleteDialog.open(ConfirmDeleteDialog, {
      data: {  },
      backdropClass: 'dialog-bg-trans',
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteGoal(id);
      }
    });
  }

  deleteGoal(id: number|undefined) {
    this.goalsService.deleteGoal(id);
    console.log('deleting');
    this.isUpdate.emit(true);
  }

  completeGoal(goal: GoalRender | undefined) {
    if (!!!goal) {
      return;
    }
    const updatedGoal = new UpdateGoal(goal.id, true, new Date())
    this.goalsService.updateGoal(updatedGoal);
    this.isUpdate.emit(true);
  }
}




