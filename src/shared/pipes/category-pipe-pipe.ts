import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryPipe',
  standalone: false
})
export class CategoryPipePipe implements PipeTransform {

  transform(value: string): string {

    if (!value) {
      return 'school';
    }

    switch (value.toLocaleLowerCase()) {
      case 'front-end':
        return 'code';
      case 'back-end':
        return 'developer_board';
      case 'data science':
        return 'bar_chart';
      case 'devops':
        return 'hub';
      case 'banco de dados':
        return 'storage';
      default:
        return 'school';
    }
  }
}
