import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";

@Component({
    selector: 'confirm-dialog',
    templateUrl: 'confirm-dialog.html',
    standalone: true,
    imports: [
      MatFormFieldModule,
      MatButtonModule,
      MatDialogTitle,
      MatDialogContent,
      MatDialogActions,
      MatDialogClose,
      ReactiveFormsModule
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class ConfirmDeleteDialog {
    readonly dialogRef = inject(MatDialogRef<ConfirmDeleteDialog>);
    //readonly data = inject<NewGoalDialogData>(MAT_DIALOG_DATA);
  
    constructor() {
    }
  
    confirm() {
        this.dialogRef.close(true);
    }
  
    close() {
        this.dialogRef.close();
    }
  }