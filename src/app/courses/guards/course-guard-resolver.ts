import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CoursesService } from '../services/coursesService';
import { ICourse } from '../model/course';

@Injectable({ providedIn: 'root' })
export class CourseGuardResolver implements Resolve<ICourse> {
  constructor(private service: CoursesService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ICourse> {
    const courseId = route.paramMap.get('id');
    if (courseId) {
      return this.service.getById(courseId);
    }

    return of({ _id: '', name: '', category: '' } as ICourse);
  }
}