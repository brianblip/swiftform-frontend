export interface User {
    id: number;
    name: string;
    email: string;
    avatar_url: string;
}

export interface Form {
    id: number;
    name: string;
    description: string;
    user_id: number | null;
    sections: FormSection[];
}

export interface FormSection {
    id: number; // Added id for each section
    title: string;
    form_id: number;
    questions: FormQuestion[];
}

export interface FormQuestion {
    id: number; // Added id for each question
    prompt: string;
    type: string;
    is_required: boolean;
    order: number;
    section_id: number;
    choices: FormChoice[];
}

export interface FormChoice {
    id: number; // Added id for each choice
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
