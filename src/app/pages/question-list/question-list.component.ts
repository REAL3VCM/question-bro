import {Component, OnInit} from '@angular/core';
import {Question, QuestionType} from "../../models/question";
import {QuestionManagementService} from "../../services/question.service";
import {AnswerService} from "../../services/answer.service";

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {
  questions: Question[] = [];
  unansweredQuestions: Question[] = [];
  answeredQuestions: Question[] = [];
  questionType = QuestionType;
  answerText: Record<string, string> = {};
  answerSingle: Record<string, number> = {};
  answerMultiple: Record<string, number[]> = {};

  constructor(private questionService: QuestionManagementService, private answerService: AnswerService) {
  }

  ngOnInit(): void {
    const questions = this.questionService.getQuestions();
    this.unansweredQuestions = questions.filter(question => !this.answerService.getAnswerByQuestionId(question.id))
    this.answerText = this.unansweredQuestions.filter(question => question.type == this.questionType.Text).reduce((acc: any, question) => {
      acc[question.id] = '';
      return acc;
    }, {});

    this.answerSingle = this.unansweredQuestions.filter(question => question.type == this.questionType.Text).reduce((acc: any, question) => {
      acc[question.id] = undefined;
      return acc;
    }, {});

    this.answerMultiple = this.unansweredQuestions.filter(question => question.type == this.questionType.Text).reduce((acc: any, question) => {
      acc[question.id] = []
      return acc;
    }, {});

    this.answeredQuestions = questions.filter(question => this.answerService.getAnswerByQuestionId(question.id))
  }

  onCheckboxChange(event: Event, option: number, questionId: number) {
    if (!this.answerMultiple[questionId]) {
      this.answerMultiple[questionId] = []
    }
    if ((event.target as HTMLInputElement).checked) {
      this.answerMultiple[questionId].push(option);
    } else {
      const index = this.answerMultiple[questionId].indexOf(option);
      if (index > -1) {
        this.answerMultiple[questionId].splice(index, 1);
      }
    }
  }

  onRadioChange(option: number, questionId: number) {
    this.answerSingle[questionId] = option
  }

  answerQuestion(question: Question) {
    if (question.type === QuestionType.Text) {
      this.answerService.saveAnswer({questionId: question.id, answer: this.answerText[question.id]})
    } else if (question.type === QuestionType.Single) {
      this.answerService.saveAnswer({questionId: question.id, selectedOptionIndex: this.answerSingle[question.id]})

    } else {
      const optionIndexes = this.answerMultiple[question.id]
      this.answerService.saveAnswer({questionId: question.id, selectedOptionIndexes: optionIndexes})
    }
    this.unansweredQuestions = this.unansweredQuestions.filter(_question => _question !== question);
    this.answeredQuestions.push(question)
  }

  getAnswer(question: Question): string {
    const answer = this.answerService.getAnswerByQuestionId(question.id)
    if (!answer) {
      return '';
    }

    if (question.type === QuestionType.Text) {
      return answer.answer as string;
    } else if (question.type === QuestionType.Single) {
      const selectedOption = (question.options as string[])[answer.selectedOptionIndex as number];
      return selectedOption;
    } else {
      const selectedOptions = (answer.selectedOptionIndexes as number[]).map(index => (question.options as string[])[index])
      return selectedOptions.join(',')
    }

  }

  deleteAnswer(question: Question) {
    this.answerService.deleteAnswerByQuestionId(question.id);
    this.answeredQuestions = this.answeredQuestions.filter(_question => _question != question);
    this.unansweredQuestions.push(question)
  }

  canAnswer(question: Question) {
    if (question.type === QuestionType.Text) {
    return !!this.answerText[question.id]
    } else if (question.type === QuestionType.Single) {
      return !!this.answerSingle[question.id]
    } else {
      const optionIndexes = this.answerMultiple[question.id]
      return !!optionIndexes?.length
    }
  }
}
