export interface User {
    message?: string;
    data?: any;
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
    title: string;
    questions: Question[];
    created_at: string;
    updated_at: string;
}

export enum QuestionType {
    TEXTFIELD = "TEXTFIELD",
    TEXTAREA = "TEXTAREA",
    MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
    CHECKBOX = "CHECKBOX",
    DROPDOWN = "DROPDOWN",
    ATTACHMENT = "ATTACHMENT",
    DATE = "DATE",
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

export type ApiResponse<T = undefined> = {
    data?: T;
    message?: string;
};

// todo: use ApiResponse instead of this
export interface ErrorResponse {
    message: string;
}

// todo: use ApiResponse instead of this
export type FormResponse = {
    data: Form;
};

// todo: use ApiResponse instead of this
export type FormsResponse = {
    data: Form[];
};

export interface FormParam {
    id: number;
}

export type FormChoice = Choice;