import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';

@Component({
  selector: 'app-courses',
  standalone: false,
  templateUrl: './courses.html',
  styleUrl: './courses.scss'
})
export class Courses implements OnInit {
  courses: Course[] = [
    { _id: '1', name: 'Angular Básico', category: 'Front-end' },
    { _id: '2', name: 'Java Spring Boot', category: 'Back-end' },
    { _id: '3', name: 'React Avançado', category: 'Front-end' },
    { _id: '4', name: 'Python para Data Science', category: 'Data Science' },
    { _id: '5', name: 'Docker e Kubernetes', category: 'DevOps' },
    { _id: '6', name: 'Machine Learning', category: 'Data Science' },
    { _id: '7', name: 'TypeScript Completo', category: 'Front-end' },
    { _id: '8', name: 'Banco de Dados SQL', category: 'Banco de Dados' }
  ];
  displayedColumns: string[] = ['name', 'category'];

  constructor() { 
  }

  ngOnInit() { 
    
  }
}
