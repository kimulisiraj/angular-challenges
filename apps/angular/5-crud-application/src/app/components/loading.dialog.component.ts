import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogContent } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading-dialog',
  template: `
    <mat-dialog-content>
      <mat-spinner />
    </mat-dialog-content>
  `,
  standalone: true,
  imports: [MatDialogContent, MatProgressSpinnerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingDialogComponent {}
