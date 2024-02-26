export interface User {
    id: number;
    name: string;
    email: string;
    avatar_url: string;
}

export interface Form {
    id: number;
    name: string;
    description: string | null;
    user_id: number;
    sections: Section[];
    created_at: string;
    updated_at: string;
}

export interface Section {
    id: number;
    form_id: number;
    title: number;
    questions: Question[];
    created_at: string;
    updated_at: string;
}

export enum QuestionType {
    TEXTFIELD = "textfield",
    TEXTAREA = "textarea",
    MULTIPLE_CHOICE = "multiple_choice",
    CHECKBOX = "checkbox",
    DROPDOWN = "dropdown",
    ATTACHMENT = "attachment",
    DATE = "date",
}

export interface Question {
    id: number;
    prompt: string;
    type: QuestionType;
    is_required: boolean;
    order: number;
    section_id: number;
    choices: FormChoice[];
    created_at: string;
    updated_at: string;
}

export interface Choice {
    id: number;
    question_id: number;
    text: string;
    order: number;
    created_at: string;
    updated_at: string;
}

export interface Answer {
    id: number;
    response_id: number;
    question_id: number;
    text: string;
    created_at: string;
}

export interface Notification {
    id: number;
    recipient_id: number;
    title: string;
    message: string;
    created_at: string;
}

export interface Response {
    id: number;
    form_id: number;
    created_at: string;
    user_id: number;
}

// todo: these are not properties from the backend, remove this
export interface FormChoice {
    id: number;
    label: string;
    value: string;
    question_id: number;
}

export interface ErrorResponse {
    message: string;
}

export type FormResponse = {
    data: Form;
};

export type FormsResponse = {
    data: Form[];
};

export interface FormParam {
    id: number;
}
