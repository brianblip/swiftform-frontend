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
    order: number;
}

export type QuestionType =
    | "textfield"
    | "textarea"
    | "multiple_choice"
    | "checkbox"
    | "dropdown"
    | "attachment"
    | "date";

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
    answers: Answer[];
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

export type SectionComponentProps = {
    section: Section;
    sortedSections: Section[];
    updateSection: (sectionId: number, value: string, order: number) => void;
    moveSectionUp: (sectionId: number) => void;
    moveSectionDown: (sectionId: number) => void;
    handleDeleteSection: (sectionId: number) => void;
    handleDuplicateSection: (sectionId: number) => void;
};

export type QuestionComponentProps = {
    question: Question;
    sectionId: number;
    sortedQuestions: Question[];
    updateQuestion: (
        questionId: number,
        type: QuestionType,
        prompt: string,
        sectionId: number,
        questionOrder: number,
    ) => void;
    moveQuestionUp: (questionId: number) => void;
    moveQuestionDown: (questionId: number) => void;
    handleDeleteQuestion: (questionId: number) => void;
    handleDuplicateQuestion: (questionId: number) => void;
};

export type ChoiceComponentProps = {
    choice: Choice;
    handleUpdateChoice: (choiceId: number, updatedChoice: string, order: number) => void;
    handleDeleteChoice: (choiceId: number) => void;
};

export type CreateFormData = Partial<Pick<Form, "name" | "description">>;

export type FormState = {
    forms: Form[];
    isLoading: boolean;
    error: Error | null;
    getForm: (formId: number) => Form | null;
    createForm: (formData: CreateFormData) => Promise<Form>;
    updateForm: (formId: number, formData: Form) => Promise<ApiResponse<Form>>;
    deleteForm: (formId: number) => Promise<void>;
    createSection: (
        title: string,
        formId: number,
        order: number,
    ) => Promise<Section>;
    updateSection: (
        sectionId: number,
        title: string,
        sectionOrder: number,
    ) => Promise<Section>;
    deleteSection: (sectionId: number) => Promise<void>;
    createQuestion: (
        type: QuestionType,
        prompt: string,
        sectionId: number,
        order: number,
        isRequired?: boolean,
    ) => Promise<Question>;
    updateQuestion: (
        questionId: number,
        type: QuestionType,
        prompt: string,
        sectionId: number,
        order: number,
        isRequired?: boolean,
    ) => Promise<Question>;
    deleteQuestion: (questionId: number) => Promise<void>;
    createChoice: (
        text: string,
        questionId: number,
        order: number,
    ) => Promise<Choice>;
    updateChoice: (choiceId: number, text: string, order: number) => Promise<Choice>;
    deleteChoice: (choiceId: number) => Promise<void>;
};