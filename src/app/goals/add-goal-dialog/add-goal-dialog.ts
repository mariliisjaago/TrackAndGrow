import {Component, inject, model, signal, ChangeDetectionStrategy, Inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule} from '@angular/forms';

export interface NewGoalDialogData {
    parentGoalId: number | null;
    title: string;
    text: string;
}

@Component({
    selector: 'add-goal-dialog',
    templateUrl: 'add-goal-dialog.html',
    styleUrl: './add-goal-dialog.scss',
    standalone: true,
    imports: [
      MatFormFieldModule,
      MatInputModule,
      FormsModule,
      MatButtonModule,
      MatDialogTitle,
      MatDialogContent,
      MatDialogActions,
      MatDialogClose,
      ReactiveFormsModule
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddGoalDialog {
    newGoal = this.fb.group({
        title: ["", [Validators.required]],
        text: ["", [Validators.required]],
        parentGoalId: [0]
    });

    readonly dialogRef = inject(MatDialogRef<AddGoalDialog>);
    //readonly data = inject<NewGoalDialogData>(MAT_DIALOG_DATA);

    constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: {parentGoalId: number | null}) {
    }

    save() {
        this.dialogRef.close(this.newGoal.value);
    }

    close() {
        this.dialogRef.close();
    }
}
