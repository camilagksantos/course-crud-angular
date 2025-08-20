import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ICategory } from '../../model/category';
import { CoursesService } from '../../services/coursesService';
import { SuccessDialogComponent } from '../../../../shared/components/success-dialog-component/success-dialog-component';
import { ErrorDialogComponent } from '../../../../shared/components/error-dialog-component/error-dialog-component';


@Component({
  selector: 'app-course-form-component',
  standalone: false,
  templateUrl: './course-form-component.html',
  styleUrl: './course-form-component.scss'
})
export class CourseFormComponent {

  categories: ICategory[] = [
    { value: 'null', viewValue: '' },
    { value: 'front-end', viewValue: 'Front-End' },
    { value: 'back-end', viewValue: 'Back-End' },
    { value: 'full-stack', viewValue: 'Full-Stack' },
    { value: 'mobile', viewValue: 'Mobile' },
    { value: 'data science', viewValue: 'Data Science' },
    { value: 'devops', viewValue: 'DevOps' }
  ];

  form: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly courseService: CoursesService,
    private readonly dialog: MatDialog,
    private readonly router: Router
  ) {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      category: [null, Validators.required]
    });
  }

  onSubmit() {
    this.courseService.save(this.form.value)
      .subscribe({
        next: (result) => this.onSuccess(result),
        error: (err) => this.onError('Error saving course')
      });
  }

  onCancel() {
    this.form.reset();
    this.router.navigate(['/']);
  }

  onSuccess(result: any) {
    this.dialog.open(SuccessDialogComponent, {
      data: `Course "${result.name}" saved successfully!`
    });

    this.form.reset();
    this.router.navigate(['/']);
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }
}
