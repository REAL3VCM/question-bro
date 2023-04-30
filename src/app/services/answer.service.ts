import { Injectable } from '@angular/core';
import {Answer} from "../models/answer";

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  private readonly localStorageKey = 'answers';

  constructor() { }

  getAnswerByQuestionId(questionId: number): Answer | undefined {
    const answers = this.getAnswers();
    return answers.find(a => a.questionId === questionId);
  }

  saveAnswer(answer: Partial <Answer>): void {
    const answers = this.getAnswers();
    answer.id = answers.length;
    answer.answerDate = new Date()
    answers.push(answer as Answer);
    localStorage.setItem(this.localStorageKey, JSON.stringify(answers));
  }

  deleteAnswerByQuestionId(questionId: number): void {
    let answers = this.getAnswers();
    answers = answers.filter(a => a.questionId !== questionId);
    localStorage.setItem(this.localStorageKey, JSON.stringify(answers));
  }

  updateAnswer(answer: Answer): void {
    let answers = this.getAnswers();
    const index = answers.findIndex(a => a.questionId === answer.questionId);
    if (index !== -1) {
      answers[index] = answer;
      localStorage.setItem(this.localStorageKey, JSON.stringify(answers));
    }
  }

  private getAnswers(): Answer[] {
    const answersJson = localStorage.getItem(this.localStorageKey);
    return answersJson ? JSON.parse(answersJson) : [];
  }
}
