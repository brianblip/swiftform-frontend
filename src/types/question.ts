export interface Question{
  id: number;
  type: QuestionType;
  prompt: string;
  section_id: number;
  is_required: boolean;
  order: number;
}

export enum QuestionType {
  TEXTFIELD = "textfield",
  TEXTAREA = "textarea",
  MULTIPLE_CHOICE = "multiple_choice",
  CHECKBOX = "checkbox",
  DROPDOWN = "dropdown",
  ATTACHMENT = "attachment",
  DATE = "date"
}