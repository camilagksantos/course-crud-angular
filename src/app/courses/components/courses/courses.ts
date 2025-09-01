import { Component } from '@angular/core';
import { catchError, Observable, of, switchMap, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ICourse } from '../../model/course';
import { CoursesService } from '../../services/coursesService';
import { ErrorDialogComponent } from '../../../../shared/components/error-dialog-component/error-dialog-component';
import { SuccessDialogComponent } from '../../../../shared/components/success-dialog-component/success-dialog-component';

@Component({
  selector: 'app-courses',
  standalone: false,
  templateUrl: './courses.html',
  styleUrl: './courses.scss'
})
export class Courses {

  courses$: Observable<ICourse[]> = of([]);

  constructor(
    private readonly coursesService: CoursesService,
    private readonly dialog: MatDialog,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.courses$ = this.coursesService.list().pipe(
      tap(courses => console.log('Cursos carregados:', courses)), // log the loaded courses
      catchError(err => {
        this.onError('Error loading courses');
        return of([]);
      })
    );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  onAdd(): void {
    this.router.navigate(['new'], { relativeTo: this.activatedRoute });
  }

  onEdit(course: ICourse) {
    this.router.navigate(['edit', course._id], { relativeTo: this.activatedRoute });
  }

  onDelete(courseId: string): void {
    if (!courseId) return this.onError('Invalid course ID');

    this.courses$ = this.coursesService.delete(courseId).pipe(
      tap(success => {
        if (success) {
          this.dialog.open(SuccessDialogComponent, {
            data: 'Course deleted successfully!'
          });
        } else {
          throw new Error('Error deleting course');
        }
      }),
      switchMap(() => this.coursesService.list()),
      catchError(err => {
        this.onError(err.message || 'Error deleting course');
        return of([]);
      })
    );
  }
}