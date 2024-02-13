export class FormFieldModel {
    field_id: number;
    question_name: string;
    question_type: string;
    question: string;
    required_field: boolean;
    choices: string[];
    minimum: number;
    maximum: number;

    constructor(
        field_id: number = 0,
        question_name: string = "",
        question_type: string = "",
        question: string = "",
        required_field: boolean = false,
        choices: string[] = [],
        minimum: number = 0,
        maximum: number = 0,
    ) {
        this.field_id = field_id;
        this.question_name = question_name;
        this.question_type = question_type;
        this.question = question;
        this.required_field = required_field;
        this.choices = choices;
        this.minimum = minimum;
        this.maximum = maximum;
    }
}
