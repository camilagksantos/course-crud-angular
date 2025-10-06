import { Component, ElementRef, ViewChild } from '@angular/core';
import { ICourse } from '../../model/course';
import { Subject, takeUntil } from 'rxjs';
import { CoursesService } from '../../services/coursesService';
import { ICategoryStats } from '../../model/category-stats';
import {
  Chart, ChartConfiguration, TooltipItem, ArcElement, Tooltip, Legend, PieController} from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend, PieController);

@Component({
  selector: 'app-course-organize-component',
  standalone: false,
  templateUrl: './course-organize-component.html',
  styleUrl: './course-organize-component.scss'
})
export class CourseOrganizeComponent {
  @ViewChild('pieChart') pieChartRef!: ElementRef<HTMLCanvasElement>;

  courses: ICourse[] = [];
  categoryStats: ICategoryStats[] = [];
  isLoading = false;
  chart?: Chart;

  displayedColumns: string[] = ['icon', 'category', 'courses', 'lessons', 'average'];

  private destroy$ = new Subject<void>();

  readonly categoryConfig: { [key: string]: { label: string; icon: string; color: string } } = {
    'FRONTEND': { label: 'Front-end', icon: 'code', color: '#2196F3' },
    'BACKEND': { label: 'Back-end', icon: 'developer_board', color: '#4CAF50' },
    'DATA_SCIENCE': { label: 'Data Science', icon: 'bar_chart', color: '#FF9800' },
    'DEVOPS': { label: 'DevOps', icon: 'hub', color: '#9C27B0' },
    'DATABASE': { label: 'Banco de Dados', icon: 'storage', color: '#F44336' },
    'MOBILE': { label: 'Mobile', icon: 'smartphone', color: '#00BCD4' },
    'CLOUD': { label: 'Cloud Computing', icon: 'cloud', color: '#3F51B5' },
    'SECURITY': { label: 'Segurança', icon: 'security', color: '#E91E63' },
    'DESIGN': { label: 'Design', icon: 'palette', color: '#FF5722' },
    'TESTING': { label: 'Testes', icon: 'bug_report', color: '#795548' }
  };

  constructor(private readonly coursesService: CoursesService) { }

  ngOnInit(): void {
    this.loadCourses();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.chart) {
      this.chart.destroy();
    }
  }

  private loadCourses(): void {
    this.isLoading = true;
    this.coursesService.listWithLessons(0, 1000)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.courses = response.courses;
          this.calculateStatistics();
          this.isLoading = false;
          setTimeout(() => {
            if (this.pieChartRef?.nativeElement) {
              this.createPieChart();
            }
          }, 0);
        },
        error: () => {
          this.isLoading = false;
        }
      });
  }

  private calculateStatistics(): void {
    const grouped: { [key: string]: ICourse[] } = {};

    this.courses.forEach(course => {
      if (!grouped[course.category]) {
        grouped[course.category] = [];
      }
      grouped[course.category].push(course);
    });

    this.categoryStats = Object.keys(grouped)
      .map(category => {
        const courses = grouped[category];
        const lessonsCount = courses.reduce((sum, c) => sum + (c.lessons?.length || 0), 0);
        const averageLessons = lessonsCount / courses.length;

        return {
          category: this.categoryConfig[category]?.label || category,
          icon: this.categoryConfig[category]?.icon || 'book',
          coursesCount: courses.length,
          lessonsCount,
          averageLessons: Number(averageLessons.toFixed(1))
        };
      })
      .sort((a, b) => b.coursesCount - a.coursesCount);
  }

  private createPieChart(): void {
    if (!this.pieChartRef?.nativeElement) {
      console.error('Canvas não encontrado');
      return;
    }

    const ctx = this.pieChartRef.nativeElement.getContext('2d');
    if (!ctx) {
      console.error('Contexto 2D não disponível');
      return;
    }

    const labels = this.categoryStats.map(stat => stat.category);
    const data = this.categoryStats.map(stat => stat.coursesCount);
    const colors = this.categoryStats.map(stat => {
      const categoryKey = Object.keys(this.categoryConfig).find(
        key => this.categoryConfig[key].label === stat.category
      );
      return categoryKey ? this.categoryConfig[categoryKey].color : '#9E9E9E';
    });

    const config: ChartConfiguration<'pie'> = {
      type: 'pie',
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: colors,
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 15,
              font: {
                size: 12
              }
            }
          },
          tooltip: {
            callbacks: {
              label: (context: TooltipItem<'pie'>) => {
                const label = context.label || '';
                const value = context.parsed || 0;
                const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0) as number;
                const percentage = ((value / total) * 100).toFixed(1);
                return `${label}: ${value} cursos (${percentage}%)`;
              }
            }
          }
        }
      }
    };

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(ctx, config);
  }

  getTotalCourses(): number {
    return this.courses.length;
  }

  getTotalLessons(): number {
    return this.courses.reduce((sum, course) => sum + (course.lessons?.length || 0), 0);
  }

  getAverageLessonsPerCourse(): number {
    if (this.courses.length === 0) return 0;
    return Number((this.getTotalLessons() / this.courses.length).toFixed(1));
  }

  getMostPopularCategory(): string {
    if (this.categoryStats.length === 0) return '-';
    return this.categoryStats[0].category;
  }
}
