import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorDialogComponent } from '../../../../shared/components/error-dialog-component/error-dialog-component';
import { SuccessDialogComponent } from '../../../../shared/components/success-dialog-component/success-dialog-component';
import { ICategory } from '../../model/category';
import { ICourse } from '../../model/course';
import { ILesson } from '../../model/lesson';
import { CoursesService } from '../../services/coursesService';


@Component({
  selector: 'app-course-form-component',
  standalone: false,
  templateUrl: './course-form-component.html',
  styleUrl: './course-form-component.scss'
})
export class CourseFormComponent {

  categories: ICategory[] = [
    { value: '', viewValue: 'Selecione uma Categoria' },
    { value: 'Front-end', viewValue: 'Front-End' },
    { value: 'Back-end', viewValue: 'Back-End' },
    { value: 'Data Science', viewValue: 'Data Science' },
    { value: 'DevOps', viewValue: 'DevOps' },
    { value: 'Banco de Dados', viewValue: 'Database' }
  ];

  form: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly courseService: CoursesService,
    private readonly dialog: MatDialog,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      _id: [null],
      name: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      category: [null, Validators.required],
      lessons: this.formBuilder.array([])
    });
  }

  ngOnInit() {
    const course: ICourse = this.route.snapshot.data['course'];

    this.form.patchValue({
      _id: course._id,
      name: course.name,
      category: course.category || ''
    });

    this.lessonsFormArray.clear();

    if (course.lessons && course.lessons.length > 0) {
      course.lessons.forEach(lesson => {
        this.addLesson(lesson);
      });
    } else {
      this.addLesson();
    }
  }

  get lessonsFormArray(): FormArray {
    return this.form.get('lessons') as FormArray;
  }

  createLessonFormGroup(lesson?: ILesson): FormGroup {
    return this.formBuilder.group({
      id: [lesson?.id || null],
      name: [lesson?.name || '', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      youtubeUrl: [lesson?.youtubeUrl || '', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]]
    });
  }

  addLesson(lesson?: ILesson): void {
    const lessonFormGroup = this.createLessonFormGroup(lesson);
    this.lessonsFormArray.push(lessonFormGroup);
  }

  removeLesson(index: number): void {
    this.lessonsFormArray.removeAt(index);
  }

  addNewLesson(): void {
    this.addLesson();
  }

  validateAllFormFields(formGroup: UntypedFormGroup | UntypedFormArray): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof UntypedFormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof UntypedFormGroup || control instanceof UntypedFormArray) {
        control.markAsTouched({ onlySelf: true });
        this.validateAllFormFields(control);
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const formValue = this.form.value;

      formValue.lessons = formValue.lessons.filter((lesson: any) =>
        lesson.name.trim() && lesson.youtubeUrl.trim()
      );

      this.courseService.save(formValue)
        .subscribe({
          next: (result) => this.onSuccess(result),
          error: (err) => this.onError('Erro ao salvar curso'),
        });
    } else {
      this.validateAllFormFields(this.form);
      this.onError('Por favor, preencha o formulário corretamente antes de salvar.');
    }
  }
  
  onCancel() {
    this.form.reset();
    this.lessonsFormArray.clear();
    this.addLesson();
    this.router.navigate(['/']);
  }

  onSuccess(result: any) {
    this.dialog.open(SuccessDialogComponent, {
      data: `Curso "${result.name}" salvo com sucesso!`
    });

    this.form.reset();
    this.lessonsFormArray.clear();
    this.addLesson();
    this.router.navigate(['/']);
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }
}
