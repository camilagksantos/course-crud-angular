import { Component } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ICourse } from '../../model/course';
import { CoursesService } from '../../services/coursesService';
import { ErrorDialogComponent } from '../../../../shared/components/error-dialog-component/error-dialog-component';

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

  onDelete(course: ICourse): void {
      
  }
}
