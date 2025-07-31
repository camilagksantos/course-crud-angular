import { Injectable } from '@angular/core';
import { ICourse } from '../model/course';
import { HttpClient } from '@angular/common/http';
import { delay, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  // private readonly apiUrl = 'data/courses.json';
  private readonly apiUrl = 'http://localhost:8080/api/courses';

  constructor(
    private readonly httpClient: HttpClient,
  ) { }

  list() { 
    return this.httpClient.get<ICourse[]>(this.apiUrl)
      .pipe(
        delay(3000),
        take(1)
      );
  }
}
