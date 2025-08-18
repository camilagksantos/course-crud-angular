import { Component, OnInit } from '@angular/core';
import { ICourse } from '../model/course';
import { CoursesService } from '../services/coursesService';
import { catchError, Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../../shared/components/undefined/error-dialog-component/error-dialog-component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  standalone: false,
  templateUrl: './courses.html',
  styleUrl: './courses.scss'
})
export class Courses {

  courses$: Observable<ICourse[]> = of([]);;
  displayedColumns: string[] = ['name', 'category', 'actions'];

  constructor(
    private readonly coursesService: CoursesService,
    private readonly dialog: MatDialog,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) { 
    // this.courses$ = this.coursesService.list().pipe(
    //   catchError(err => {
    //     this.onError('Error loading courses');
    //     return of([]);
    //   })
    // );
  }

  ngOnInit() {
    this.courses$ = this.coursesService.list().pipe(
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

  onEdit(course: ICourse): void {
    this.router.navigate(['new'], { relativeTo: this.activatedRoute });
  }

  onDelete(course: ICourse): void {
    console.log('Excluir curso', course);
    // Exemplo: abrir um diálogo de confirmação, depois deletar via service
  }
}
