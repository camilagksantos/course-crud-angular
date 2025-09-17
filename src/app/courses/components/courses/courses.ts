import { Component } from '@angular/core';
import { catchError, Observable, of, switchMap, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ICourse } from '../../model/course';
import { CoursesService } from '../../services/coursesService';
import { ErrorDialogComponent } from '../../../../shared/components/error-dialog-component/error-dialog-component';
import { SuccessDialogComponent } from '../../../../shared/components/success-dialog-component/success-dialog-component';
import { ConfirmationDialogComponent } from '../../../../shared/components/confirmation-dialog-component/confirmation-dialog-component';

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
    this.courses$ = this.coursesService.listWithLessons().pipe(
      tap(courses => console.log('Cursos carregados:', courses)),
      catchError(err => {
        this.onError('Erro ao carregar os cursos.');
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
    if (!courseId) return this.onError('Id do curso inválido.');

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Você tem certeza que deseja remover este curso?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.courses$ = this.coursesService.delete(courseId).pipe(
          tap(() => {
            this.dialog.open(SuccessDialogComponent, {
              data: 'Curso removido com sucesso!'
            });
          }),
          switchMap(() => this.coursesService.list()),
          catchError(err => {
            this.onError('Erro ao remover curso');
            return of([]);
          })
        );
      }
    });
  }
}