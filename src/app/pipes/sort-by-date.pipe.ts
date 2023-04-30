import { Pipe, PipeTransform } from '@angular/core';
import {Question} from "../models/question";

@Pipe({
  name: 'sortByDate'
})
export class SortByDatePipe implements PipeTransform {

  transform(questions: Question[]): Question[] {
    return questions.sort((a, b) => {
      const dateA = new Date(a.creationDate);
      const dateB = new Date(b.creationDate);
      return dateB.getTime() - dateA.getTime();
    });
  }

}
