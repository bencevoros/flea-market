import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({name: 'FormatDate'})
export class FormatDatePipe implements PipeTransform {

  transform(date: Date): string {
    const momentDate = moment(date);

    if (momentDate.isSame(moment(), 'days')) {
      return momentDate.format('hh:mm');
    }

    if (momentDate.isSame(moment(), 'year')) {
      return momentDate.format('hh:mm, MMMM DD');
    }

    return momentDate.format('YYYY-MM-DD hh:mm');
  }

}
