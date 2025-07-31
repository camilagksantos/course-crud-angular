import { Component, OnInit } from '@angular/core';
import { ICourse } from '../model/course';
import { CoursesService } from '../services/coursesService';
import { catchError, Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../../shared/components/undefined/error-dialog-component/error-dialog-component';

@Component({
  selector: 'app-courses',
  standalone: false,
  templateUrl: './courses.html',
  styleUrl: './courses.scss'
})
export class Courses implements OnInit {
  courses$: Observable<ICourse[]>;
  displayedColumns: string[] = ['name', 'category'];

  constructor(
    private readonly coursesService: CoursesService,
    private readonly dialog: MatDialog
  ) { 
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
  
  ngOnInit() { 
  }
}
