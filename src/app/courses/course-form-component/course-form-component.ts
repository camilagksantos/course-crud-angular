import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CoursesService } from '../services/coursesService';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../../shared/components/undefined/error-dialog-component/error-dialog-component';

interface ICategory {
  value: string;
  viewValue: string;
}

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
  ) { 
    this.form = this.formBuilder.group({
      name: [null],
      category: [null]
    });
  }

  onSubmit() { 
    this.courseService.save(this.form.value)
      .subscribe({
        next: () => {
          console.log('Course saved successfully');
          this.form.reset();
        },
        error: (err) => {
          this.onError('Error saving course');
          console.error(err);
        }
      });
  }

  onCancel() { 
    this.form.reset();
  }

  onError(errorMsg: string) {
      this.dialog.open(ErrorDialogComponent, {
        data: errorMsg
      });
    }
}
