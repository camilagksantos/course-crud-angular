import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICourse } from '../../model/course';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-courses-list-component',
  standalone: false,
  templateUrl: './courses-list-component.html',
  styleUrl: './courses-list-component.scss'
})
export class CoursesListComponent {

  @Input() courses: ICourse[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() delete = new EventEmitter(false);

  readonly displayedColumns: string[] = ['name', 'category', 'actions'];

  constructor(
    private readonly dialog: MatDialog
  ) {
  }

  onAdd(): void {
    this.add.emit(true);
  }

  onEdit(course: ICourse): void {
    this.edit.emit(course);
  }

  onDelete(course: ICourse): void {
    this.delete.emit(course);
  }
}
