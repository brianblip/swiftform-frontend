export interface FormDataModel {
    id: number;
    user_id: number;
    owner_id: number;
    title: string;
    description: string;
    fields: FormFieldModel[];
}

export interface DynamicFormProps extends FormDataModel {
    titleInput: string;
    onSubmit: SubmitHandler<FormDataModel>;
}

export interface FormFieldModel {
    field_id: number;
    question_name: string;
    question_type: string;
    question: string;
    required_field: boolean;
    choices: string[];
    minimum: number;
    maximum: number;
}
