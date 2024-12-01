import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { GoalV2 } from '../../models-2/goal-v2';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { GoalsV2Service } from '../../services/goals-v2.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialog } from '../confirm-dialog/confirm-dialog';
import { AddGoalDialog, NewGoalDialogData } from '../add-goal-dialog/add-goal-dialog';
import { UpdateGoalV2 } from '../../models-2/update-goal-v2';
import { NewGoalV2 } from '../../models-2/new-goal-v2';

@Component({
  selector: 'app-goal-v2',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './goal-v2.component.html',
  styleUrl: './goal-v2.component.scss'
})
export class GoalV2Component {
  @Input() goal!: GoalV2;

  @Output()
  isUpdateGoal = new EventEmitter<number>();
  @Output()
  isUpdate = new EventEmitter<number>();

  readonly newGoalDialog = inject(MatDialog);
  readonly confirmDeleteDialog = inject(MatDialog);

  constructor(private goalService: GoalsV2Service) {

  }

  emitToParent(id: number) {
    if (this.goal.isRoot) {
      this.isUpdate.emit(id);
    }
    else {
      this.isUpdateGoal.emit(id);
    }
  }

  startAddingChildGoal(goal: GoalV2 | undefined) {
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

  addNewSubGoal(input: NewGoalDialogData, parentGoalId: number | undefined): any {
    const newGoal = new NewGoalV2(input.title, input.text, parentGoalId, false);
    this.goalService.addGoal(newGoal);
    console.log('adding sub-goal');
    this.emitToParent(0);
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
    this.goalService.deleteGoal(id);
    console.log('deleting');
    this.emitToParent(0);
  }

  completeGoal(goal: GoalV2 | undefined) {
    if (!!!goal) {
      return;
    }
    const updatedGoal = new UpdateGoalV2(goal.id, true, new Date())
    this.goalService.updateGoal(updatedGoal);
    this.emitToParent(0);
  }

  openNode() {
    console.log(`clicked, id=${this.goal.id}`);
    this.emitToParent(this.goal.id);
  }

  updateParent($event: number) {
    this.emitToParent($event);
  }
}
