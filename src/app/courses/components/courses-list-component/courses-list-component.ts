import { Component, Input } from '@angular/core';
import { ICourse } from '../../model/course';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses-list-component',
  standalone: false,
  templateUrl: './courses-list-component.html',
  styleUrl: './courses-list-component.scss'
})
export class CoursesListComponent {

  @Input() courses: ICourse[] = [];
  readonly displayedColumns: string[] = ['name', 'category', 'actions'];

  constructor(
    private readonly dialog: MatDialog,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {
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
