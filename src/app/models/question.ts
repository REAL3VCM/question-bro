export enum QuestionType {
  Multiple = "multiple",
  Single = "single",
  Text = "text"
}

export interface Question {
  id: number;
  text: string;
  creationDate: Date;
  type: QuestionType;
  options?: string[];
}
