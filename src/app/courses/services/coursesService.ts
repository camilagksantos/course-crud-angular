import { Injectable } from '@angular/core';
import { ICourse } from '../model/course';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, map, Observable, of, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  // private readonly apiUrl = 'data/courses.json';

  private readonly apiUrl = 'http://localhost:8080/api/courses';

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  list() { 
    return this.httpClient.get<ICourse[]>(this.apiUrl)
      .pipe(
        delay(1000),
        take(1)
      );
  }

  getById(id: string): Observable<ICourse> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.get<ICourse>(url)
      .pipe(take(1));
  }

  save(course: ICourse) {
    if (course._id) {
      return this.update(course);
    } else {
      return this.create(course);
    }
  }

  create(course: ICourse): Observable<ICourse> {
    return this.httpClient.post<ICourse>(this.apiUrl, course)
      .pipe(
        take(1)
      );
  }

  update(course: ICourse): Observable<ICourse> {
    const url = `${this.apiUrl}/${course._id}`;

    return this.httpClient.put<ICourse>(url, course)
      .pipe(
        take(1)
      );
  }

  delete(id: string): Observable<boolean> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.delete(url).pipe(
      take(1),
      map(() => true),
      catchError(() => of(false))
    );
  }
}
