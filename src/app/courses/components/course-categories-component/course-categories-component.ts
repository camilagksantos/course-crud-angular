import { Component } from '@angular/core';
import { ICourse } from '../../model/course';
import { Subject, takeUntil } from 'rxjs';
import { CoursesService } from '../../services/coursesService';
import { Router } from '@angular/router';
import { ICategoryInfo } from '../../model/category-info';

@Component({
  selector: 'app-course-categories-component',
  standalone: false,
  templateUrl: './course-categories-component.html',
  styleUrl: './course-categories-component.scss'
})
export class CourseCategoriesComponent {
  categories: ICategoryInfo[] = [];
  selectedCategory: ICategoryInfo | null = null;
  isLoading = false;

  private destroy$ = new Subject<void>();

  readonly categoryConfig: { [key: string]: { label: string; icon: string; color: string; description: string } } = {
    'FRONTEND': {
      label: 'Front-end',
      icon: 'code',
      color: '#2196F3',
      description: 'Desenvolvimento de interfaces e experiências do usuário com HTML, CSS, JavaScript e frameworks modernos'
    },
    'BACKEND': {
      label: 'Back-end',
      icon: 'developer_board',
      color: '#4CAF50',
      description: 'Desenvolvimento de servidores, APIs, bancos de dados e lógica de negócios'
    },
    'DATA_SCIENCE': {
      label: 'Data Science',
      icon: 'bar_chart',
      color: '#FF9800',
      description: 'Análise de dados, machine learning, estatística e visualização de informações'
    },
    'DEVOPS': {
      label: 'DevOps',
      icon: 'hub',
      color: '#9C27B0',
      description: 'Integração contínua, deploy automatizado, infraestrutura como código e monitoramento'
    },
    'DATABASE': {
      label: 'Banco de Dados',
      icon: 'storage',
      color: '#F44336',
      description: 'Modelagem, administração e otimização de bancos de dados relacionais e NoSQL'
    },
    'MOBILE': {
      label: 'Mobile',
      icon: 'smartphone',
      color: '#00BCD4',
      description: 'Desenvolvimento de aplicativos para iOS, Android e multiplataforma'
    },
    'CLOUD': {
      label: 'Cloud Computing',
      icon: 'cloud',
      color: '#3F51B5',
      description: 'Computação em nuvem, AWS, Azure, GCP e arquitetura serverless'
    },
    'SECURITY': {
      label: 'Segurança',
      icon: 'security',
      color: '#E91E63',
      description: 'Segurança da informação, testes de penetração, criptografia e boas práticas'
    },
    'DESIGN': {
      label: 'Design',
      icon: 'palette',
      color: '#FF5722',
      description: 'UI/UX design, prototipagem, design thinking e ferramentas de design'
    },
    'TESTING': {
      label: 'Testes',
      icon: 'bug_report',
      color: '#795548',
      description: 'Testes automatizados, TDD, BDD, testes de integração e qualidade de software'
    }
  };

  constructor(
    private readonly coursesService: CoursesService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.loadCourses();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadCourses(): void {
    this.isLoading = true;
    this.coursesService.listWithLessons(0, 1000)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.organizeCoursesByCategory(response.courses);
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        }
      });
  }

  private organizeCoursesByCategory(courses: ICourse[]): void {
    const grouped: { [key: string]: ICourse[] } = {};

    const labelToKey: { [label: string]: string } = {};
    Object.keys(this.categoryConfig).forEach(key => {
      labelToKey[this.categoryConfig[key].label] = key;
    });

    courses.forEach(course => {
      const enumKey = labelToKey[course.category] || course.category;

      if (!grouped[enumKey]) {
        grouped[enumKey] = [];
      }
      grouped[enumKey].push(course);
    });

    this.categories = Object.keys(grouped).map(key => {
      const coursesInCategory = grouped[key];
      const lessonsCount = coursesInCategory.reduce((sum, c) => sum + (c.lessons?.length || 0), 0);

      return {
        key,
        label: this.categoryConfig[key]?.label || key,
        icon: this.categoryConfig[key]?.icon || 'book',
        color: this.categoryConfig[key]?.color || '#9E9E9E',
        description: this.categoryConfig[key]?.description || '',
        courses: coursesInCategory,
        coursesCount: coursesInCategory.length,
        lessonsCount
      };
    }).sort((a, b) => b.coursesCount - a.coursesCount);
  }

  onCategoryClick(category: ICategoryInfo): void {
    this.selectedCategory = category;
  }

  backToCategories(): void {
    this.selectedCategory = null;
  }

  onCourseClick(course: ICourse): void {
    this.router.navigate(['/courses/edit', course._id]);
  }

  addCourseInCategory(): void {
    this.router.navigate(['/courses/new']);
  }

  getLessonsCount(course: ICourse): number {
    return course.lessons?.length || 0;
  }
}
