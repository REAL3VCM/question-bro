import {Injectable} from '@angular/core';

import {Question} from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionManagementService {
  private readonly localStorageKey = 'questions';

  constructor() {
  }

  getQuestions(): Question[] {
    const questionsJson = localStorage.getItem(this.localStorageKey);
    return questionsJson ? JSON.parse(questionsJson) : [];
  }

  saveQuestion(question: Partial<Question>): void {
    question.creationDate = new Date();
    const questions = this.getQuestions();
    question.id = questions.length
    questions.push(question as Question);
    localStorage.setItem(this.localStorageKey, JSON.stringify(questions));
  }

  deleteQuestion(questionId: number): void {
    let questions = this.getQuestions();
    questions = questions.filter(q => q.id !== questionId);
    localStorage.setItem(this.localStorageKey, JSON.stringify(questions));
  }

  updateQuestion(question: Question): void {
    let questions = this.getQuestions();
    const index = questions.findIndex(q => q.id === question.id);
    if (index !== -1) {
      questions[index] = question;
      localStorage.setItem(this.localStorageKey, JSON.stringify(questions));
    }
  }

  getQuestionById(questionId: number): Question | undefined {
    const questions = this.getQuestions();
    return questions.find(q => q.id === questionId);
  }
}
