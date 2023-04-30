import {Component, OnInit} from '@angular/core';
import {Question, QuestionType} from "../../models/question";
import {ActivatedRoute, Router} from "@angular/router";
import {QuestionManagementService} from "../../services/question.service";

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.css']
})
export class QuestionEditComponent implements OnInit {
  question: Partial<Question> = {
    text: '',
    type: QuestionType.Text,
    options: []
  };
  selectedQuestionType: QuestionType = QuestionType.Text;
  options: string = '';
  errorMessage: string = '';
  questionType = QuestionType;

  constructor(private route: ActivatedRoute, private questionService: QuestionManagementService, private router: Router) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      return
    }
    const question = this.questionService.getQuestionById(+id) as Question
    this.question = question;
    this.selectedQuestionType = question.type;
    if (question.options) {
      this.options = question.options.join(',');
    }
  }

  onUpdate() {
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
    this.questionService.updateQuestion(this.question as Question)
    this.router.navigate(['..', 'question-list'])

  }
}
