import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorDialogComponent } from './components/error-dialog-component/error-dialog-component';
import { AngularMaterialModule } from './angular-material/angular-material-module';

import { SuccessDialogComponent } from './components/success-dialog-component/success-dialog-component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog-component/confirmation-dialog-component';
import { CategoryPipe } from './pipes/category-pipe';


@NgModule({
  declarations: [
    ErrorDialogComponent,
    CategoryPipe,
    SuccessDialogComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  exports: [
    ErrorDialogComponent,
    CategoryPipe,
    SuccessDialogComponent,
    ConfirmationDialogComponent
  ]
})
export class SharedModuleModule { }
