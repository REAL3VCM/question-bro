export interface Answer {
  id: number;
  questionId: number;
  answerDate: Date;
  selectedOptionIndexes?: number[]; // Only required for "multiple" type
  selectedOptionIndex?: number; // Only required for "single" type
  answer?: string; // Only required for "text" type
}
