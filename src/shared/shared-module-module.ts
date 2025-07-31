import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorDialogComponent } from './components/undefined/error-dialog-component/error-dialog-component';
import { AngularMaterialModule } from './angular-material/angular-material-module';
import { CategoryPipePipe } from './pipes/category-pipe-pipe';



@NgModule({
  declarations: [
    ErrorDialogComponent,
    CategoryPipePipe
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
