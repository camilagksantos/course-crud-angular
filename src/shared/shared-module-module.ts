import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorDialogComponent } from './components/error-dialog-component/error-dialog-component';
import { AngularMaterialModule } from './angular-material/angular-material-module';
import { CategoryPipePipe } from './pipes/category-pipe-pipe';
import { SuccessDialogComponent } from './components/success-dialog-component/success-dialog-component';



@NgModule({
  declarations: [
    ErrorDialogComponent,
    CategoryPipePipe,
    SuccessDialogComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  exports: [
    ErrorDialogComponent,
    CategoryPipePipe
  ]
})
export class SharedModuleModule { }
