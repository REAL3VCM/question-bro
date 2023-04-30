import { Component } from '@angular/core';
import {Question, QuestionType} from "../../models/question";
import {QuestionManagementService} from "../../services/question.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent {
  question: Partial <Question> = {
    text: '',
    type: QuestionType.Text,
    options: []
  };
  questionType = QuestionType
  selectedQuestionType: QuestionType = QuestionType.Text;
  options: string = '';
  errorMessage: string = '';

  constructor(private questionService: QuestionManagementService, private router: Router) {
  }

  onCreate() {
    if (!this.question.text) {
      this.errorMessage = 'Question text is required';
      return;
    }
    if (this.selectedQuestionType === QuestionType.Multiple || this.selectedQuestionType === QuestionType.Single) {
      const options = this.options.split(',');
      if (options.length < 2) {
        this.errorMessage = 'At least two options are required for multiple or single choice questions';
        return;
      }
      this.question.options = options;
    }
    this.question.type = this.selectedQuestionType
    this.questionService.saveQuestion(this.question)
    this.router.navigate(['..', 'question-list'])
  }
}
