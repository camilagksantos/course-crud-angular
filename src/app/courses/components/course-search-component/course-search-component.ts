import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { ICourse } from '../../model/course';
import { CoursesService } from '../../services/coursesService';

@Component({
  selector: 'app-course-search',
  standalone: false,
  templateUrl: './course-search-component.html',
  styleUrl: './course-search-component.scss'
})
export class CourseSearchComponent implements OnInit, OnDestroy {
  searchTerm = '';
  courses: ICourse[] = [];
  filteredCourses: ICourse[] = [];
  isLoading = false;

  displayedColumns: string[] = ['name', 'category'];

  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(
    private readonly coursesService: CoursesService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.loadAllCourses();
    this.setupSearch();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadAllCourses(): void {
    this.isLoading = true;
    // Carrega até 1000 cursos para pesquisa client-side
    this.coursesService.listWithLessons(0, 1000)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.courses = response.courses;
          this.filteredCourses = this.courses;
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        }
      });
  }

  private setupSearch(): void {
    this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.filterCourses();
      });
  }

  onSearchChange(term: string): void {
    this.searchTerm = term;
    this.searchSubject.next(term);
  }

  private filterCourses(): void {
    if (!this.searchTerm.trim()) {
      this.filteredCourses = this.courses;
      return;
    }

    const term = this.searchTerm.toLowerCase().trim();
    this.filteredCourses = this.courses.filter(course =>
      course.name.toLowerCase().includes(term) ||
      course.category.toLowerCase().includes(term)
    );
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filteredCourses = this.courses;
  }

  onCourseClick(course: ICourse): void {
    this.router.navigate(['/courses/edit', course._id]);
  }
}