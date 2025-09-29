import { Pipe, PipeTransform } from '@angular/core';
import { Category } from '../../app/courses/model/category.enum';

@Pipe({
  name: 'categoryPipe',
  standalone: false
})
export class CategoryPipe implements PipeTransform {

  transform(value: string): string {

    if (!value) {
      return 'school';
    }

    switch (value) {
      case Category.FRONTEND:
        return 'code';
      case Category.BACKEND:
        return 'developer_board';
      case Category.DATA_SCIENCE:
        return 'bar_chart';
      case Category.DEVOPS:
        return 'hub';
      case Category.DATABASE:
        return 'storage';
      case Category.MOBILE:
        return 'smartphone';
      case Category.CLOUD:
        return 'cloud';
      case Category.SECURITY:
        return 'security';
      case Category.DESIGN:
        return 'palette';
      case Category.TESTING:
        return 'bug_report';
      default:
        return 'school';
    }
  }
}
