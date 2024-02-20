export interface User {
    id: number;
    name: string;
    email: string;
    avatar_url: string;
}

export interface Answer {
    id: number;
    response_id: number;
    question_id: number;
    text: string;
}

export interface Choice {
    id: number;
    question_id: number;
    text: string;
    order: number;
}

export interface Form {
    id: number;
    name: string;
    description: string | null;
    user_id: number;
    created_at: string;
    updated_at: string;
}

export interface Notification {
    id: number;
    recipient_id: number;
    title: string;
    message: string;
    created_at: string;
}

export interface Question {
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
    DATE = "date",
}

export interface Response {
    id: number;
    form_id: number;
    created_at: string;
    user_id: number;
}

export interface Section {
    id: number;
    form_id: number;
    title: number;
    created_at: string;
    updated_at: string;
}
