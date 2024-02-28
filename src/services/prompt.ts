import api from "./api";
import { ApiResponse, Form, Section, Question } from "@@/types";

export interface GeneratedForm extends Pick<Form, "name" | "description"> {
    sections: GeneratedSection[];
}

interface GeneratedSection extends Pick<Section, "title"> {
    questions: GeneratedQuestion[];
}

interface GeneratedQuestion
    extends Pick<Question, "prompt" | "type" | "order"> {
    validations: GeneratedValidation[];
}

type ValidationType =
    | "required"
    | "minLength"
    | "maxLength"
    | "min"
    | "max"
    | "pattern";

interface GeneratedValidation {
    type: ValidationType;
    value: string | number | boolean;
    message: string;
}

export const generateFormJson = async (description: string) => {
    const response = await api.post<ApiResponse<GeneratedForm>>("/prompt", {
        text: description,
    });
    return response.data;
};
