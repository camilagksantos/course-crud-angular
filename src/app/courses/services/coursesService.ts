import { Injectable } from '@angular/core';
import { ICourse } from '../model/course';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, map, Observable, of, take, tap } from 'rxjs';
import { ICourseWithLessonsResponse } from '../model/course-with-lessons-response';
import { Page } from '../model/page';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly apiUrl = 'http://localhost:8080/api/courses';

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  list(page: number = 0, size: number = 10): Observable<Page<ICourse>> {
    return this.httpClient.get<Page<ICourse>>(this.apiUrl, {
      params: {
        page: page.toString(),
        size: size.toString()
      }
    }).pipe(
      delay(1000),
      take(1)
    );
  }

  getById(id: string): Observable<ICourse> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.get<ICourse>(url)
      .pipe(take(1));
  }

  save(course: ICourse): Observable<ICourse> {
    if (course._id) {
      return this.update(course);
    } else {
      return this.create(course);
    }
  }

  create(course: ICourse): Observable<ICourse> {
    return this.httpClient.post<ICourse>(this.apiUrl, course)
      .pipe(take(1));
  }

  update(course: ICourse): Observable<ICourse> {
    const url = `${this.apiUrl}/${course._id}`;
    return this.httpClient.put<ICourse>(url, course)
      .pipe(take(1));
  }

  delete(id: string): Observable<boolean> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.delete(url).pipe(
      take(1),
      map(() => true),
      catchError(() => of(false))
    );
  }

  listWithLessons(page: number = 0, size: number = 10): Observable<{ courses: ICourse[], totalElements: number }> {
    const url = `${this.apiUrl}/with-lessons`;
    return this.httpClient.get<Page<ICourseWithLessonsResponse>>(url, {
      params: {
        page: page.toString(),
        size: size.toString()
      }
    }).pipe(
      map((response: Page<ICourseWithLessonsResponse>) => {
        const courses = response.content.map((item: ICourseWithLessonsResponse) => ({
          _id: item.course._id,
          name: item.course.name,
          category: item.course.category,
          lessons: item.lessons || []
        }));
        return {
          courses: courses,
          totalElements: response.page.totalElements  // ← Mudança aqui
        };
      }),
      delay(1000),
      take(1)
    );
  }

  getByIdWithLessons(id: string): Observable<ICourse> {
    const url = `${this.apiUrl}/${id}/with-lessons`;
    return this.httpClient.get<ICourseWithLessonsResponse>(url)
      .pipe(
        map((response: ICourseWithLessonsResponse) => ({
          _id: response.course._id,
          name: response.course.name,
          category: response.course.category,
          lessons: response.lessons || []
        })),
        take(1)
      );
  }
}