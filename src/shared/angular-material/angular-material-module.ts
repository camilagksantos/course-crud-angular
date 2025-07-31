import { NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  exports: [
    MatToolbarModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatIconModule
 ]
})
export class AngularMaterialModule { }
