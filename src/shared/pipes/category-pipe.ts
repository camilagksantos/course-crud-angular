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
      default:
        return 'school';
    }
  }
}
