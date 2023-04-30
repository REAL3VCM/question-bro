import {Component, OnInit} from '@angular/core';
import {QuestionManagementService} from "../../services/question.service";
import {Question, QuestionType} from "../../models/question";

@Component({
  selector: 'app-question-management',
  templateUrl: './question-management.component.html',
  styleUrls: ['./question-management.component.css']
})
export class QuestionManagementComponent implements OnInit{
  questions: Question[] = [];
  QuestionType = QuestionType;
constructor(private questionService: QuestionManagementService) {
}
ngOnInit() {
  this.questions = this.questionService.getQuestions()
  }

  deleteQuestion(id: number) {
    this.questionService.deleteQuestion(id);
    this.questions = this.questionService.getQuestions()
  }
}
