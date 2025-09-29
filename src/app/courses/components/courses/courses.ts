import { Component } from '@angular/core';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ICourse } from '../../model/course';
import { CoursesService } from '../../services/coursesService';
import { ErrorDialogComponent } from '../../../../shared/components/error-dialog-component/error-dialog-component';
import { SuccessDialogComponent } from '../../../../shared/components/success-dialog-component/success-dialog-component';
import { ConfirmationDialogComponent } from '../../../../shared/components/confirmation-dialog-component/confirmation-dialog-component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-courses',
  standalone: false,
  templateUrl: './courses.html',
  styleUrl: './courses.scss'
})
export class Courses {

  courses$: Observable<ICourse[]> = of([]);

  pageIndex: number = 0;
  pageSize: number = 10;
  totalElements: number = 0;
  pageSizeOptions: number[] = [5, 10, 25, 50];

  constructor(
    private readonly coursesService: CoursesService,
    private readonly dialog: MatDialog,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses() {
    this.coursesService.listWithLessons(this.pageIndex, this.pageSize).pipe(
      catchError(err => {
        this.onError('Erro ao carregar os cursos.');
        return of({ courses: [], totalElements: 0 });
      })
    ).subscribe(response => {
      this.courses$ = of(response.courses);
      this.totalElements = response.totalElements;
      console.log('Total elements:', this.totalElements);
      console.log('Page index:', this.pageIndex);
      console.log('Page size:', this.pageSize);
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadCourses();
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
    if (!courseId) return this.onError('Id do curso inválido.');

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Você tem certeza que deseja remover este curso?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.coursesService.delete(courseId).pipe(
          tap(() => {
            this.dialog.open(SuccessDialogComponent, {
              data: 'Curso removido com sucesso!'
            });
          }),
          switchMap(() => {
            this.loadCourses();
            return of(true);
          }),
          catchError(err => {
            this.onError('Erro ao remover curso');
            return of(false);
          })
        ).subscribe();
      }
    });
  }
}