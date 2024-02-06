"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
    useForm,
    Control,
    SubmitHandler,
    useFieldArray,
} from "react-hook-form";
import {
    Delete,
    CopyAllOutlined,
    ArrowUpwardRounded,
    ArrowDownwardRounded,
    AddCircleOutlineOutlined,
} from "@mui/icons-material";
import RangeFields from "./RangeFields";
import DynamicChoiceRender from "./DynamicChoiceRender";

interface FormDataModel {
    id: string;
    title: string;
    description: string;
    fields: FormFieldModel[];
}

class FormFieldModel {
    question_name = "";
    question_type = "";
    question = "";
    required_field = false;
    choices: string[] = [];
}

interface DynamicFormProps extends FormDataModel {
    onSubmit: SubmitHandler<FormDataModel>;
}

export default function DynamicForm({
    id,
    title,
    description,
    fields,
    onSubmit,
}: DynamicFormProps) {
    const { register, control, handleSubmit, setValue, getValues, watch } =
        useForm<FormDataModel>({
            defaultValues: { id, title, description, fields },
        });
    const router = useRouter();
    const {
        fields: formFields,
        append,
        remove,
    } = useFieldArray<FormFieldModel>({
        control: control as Control<FormDataModel>,
        name: "fields",
    });

    const [selectedQuestionType, setSelectedQuestionType] = useState<
        string | null
    >(null);
    const [selectedFieldChoices, setSelectedFieldChoices] = useState<string[]>(
        [],
    );
    const [fieldQuestionTypes, setFieldQuestionTypes] = useState<string[]>([]);

    const handleQuestionTypeChange = (index: number, questionType: string) => {
        setFieldQuestionTypes((prevTypes) => {
            const updatedTypes = [...prevTypes];
            updatedTypes[index] = questionType;
            return updatedTypes;
        });

        setSelectedFieldChoices(getValues(`fields.${index}.choices`) || []);

        if (["select", "checkbox", "radio"].includes(questionType)) {
            // If the question type is 'select', 'checkbox', or 'radio'
            const existingChoices = getValues(`fields.${index}.choices`) || [];

            if (existingChoices.length === 0) {
                // If there are no existing choices, generate a default choice
                const defaultChoice = `Option ${index + 1}`;
                setValue(`fields.${index}.choices`, [defaultChoice]);
                setSelectedFieldChoices([defaultChoice]);
            }
        }
    };

    const handleFormSubmit = async (data: FormDataModel) => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;

            // Filter out empty question_name values before submitting
            data.fields = data.fields.filter(
                (field) => field.question_name.trim() !== "",
            );

            // Remove choices for fields with question_type other than 'select', 'checkbox', or 'radio'
            data.fields.forEach((field, index) => {
                const questionType = field.question_type;
                if (!["select", "checkbox", "radio"].includes(questionType)) {
                    data.fields[index].choices = [];
                }
            });

            const response = await axios.patch(`${apiUrl}/${id}`, data);
            console.log("Form submitted successfully:", response.data);
            window.dispatchEvent(new CustomEvent("formCreated"));
            router.push("/");
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    const moveField = (fromIndex: number, toIndex: number) => {
        formFields.splice(toIndex, 0, formFields.splice(fromIndex, 1)[0]);
        const movedField = document.getElementById(`fieldset-${toIndex}`);
        if (movedField) {
            movedField.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    const appendNewFormField = () => {
        const newField = new FormFieldModel();
        append(newField);
        setSelectedQuestionType(null); // Reset selected question type when adding a new field
    };

    const renderChoices = (index: number) => {
        const questionType = getValues(`fields.${index}.question_type`) || "";
        const choices = getValues(`fields.${index}.choices`) || [];

        const handleAddChoice = () => {
            const updatedChoices = [...choices, ""];
            setSelectedFieldChoices(updatedChoices);
            setValue(`fields.${index}.choices`, updatedChoices);
        };

        const handleRemoveChoice = (choiceIndex: number) => {
            const updatedChoices = choices.filter((_, i) => i !== choiceIndex);
            setSelectedFieldChoices(updatedChoices);
            setValue(`fields.${index}.choices`, updatedChoices);
        };

        const handleUpdateChoice = (choiceIndex: number, value: string) => {
            const updatedChoices = [...choices];
            updatedChoices[choiceIndex] = value;
            setSelectedFieldChoices(updatedChoices);
            setValue(`fields.${index}.choices.${choiceIndex}`, value);
        };

        return (
            <DynamicChoiceRender
                choices={choices}
                onAddChoice={handleAddChoice}
                onRemoveChoice={handleRemoveChoice}
                onUpdateChoice={handleUpdateChoice}
            />
        );
    };

    const renderRangeFields = (index: number) => {
        const minimumValue = watch(`fields.${index}.minimum`) || 1;
        const maximumValue = watch(`fields.${index}.maximum`) || 100;

        const handleMinimumChange = (e: ChangeEvent) => {
            setValue(
                `fields.${index}.minimum`,
                (e.target as HTMLInputElement).value,
            );
        };

        const handleMaximumChange = (e: ChangeEvent) => {
            setValue(
                `fields.${index}.maximum`,
                (e.target as HTMLInputElement).value,
            );
        };

        // Use the RangeFields component here
        return (
            <RangeFields
                index={index}
                minimumValue={minimumValue}
                maximumValue={maximumValue}
                handleMinimumChange={handleMinimumChange}
                handleMaximumChange={handleMaximumChange}
            />
        );
    };

    useEffect(() => {
        setValue("title", title);

        // Handle initial values and render choices
        formFields.forEach((field, index) => {
            const initialQuestionType = getValues(
                `fields.${index}.question_type`,
            );
            if (initialQuestionType) {
                setValue(`fields.${index}.question_type`, initialQuestionType);
                handleQuestionTypeChange(index, initialQuestionType);

                // Render choices only if it's a multiple choice type
                if (
                    ["select", "checkbox", "radio"].includes(
                        initialQuestionType,
                    )
                ) {
                    setSelectedQuestionType(initialQuestionType);
                    setSelectedFieldChoices(
                        getValues(`fields.${index}.choices`) || [],
                    );
                } else {
                    setSelectedQuestionType(null);
                }
            }
        });
    }, [title, setValue, getValues, formFields]);

    return (
        <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="flex w-3/4 flex-col items-center gap-10 border border-zinc-500 p-5"
        >
            <div className="flex w-4/5 flex-col items-center gap-3 p-5">
                <label
                    htmlFor="description"
                    className="flex w-4/5 flex-col items-center justify-center gap-3"
                >
                    <textarea
                        defaultValue={description}
                        {...register("description")}
                        className="max-h-80 min-h-40 w-full rounded bg-primary-secondary p-2 text-white"
                        id="description"
                    ></textarea>
                    Description:
                </label>
            </div>

            {formFields.map((field, index) => (
                <fieldset
                    key={field.id}
                    id={`fieldset-${index}`}
                    className="flex w-4/5 flex-col gap-5 rounded-md border border-zinc-500 p-7 shadow-xl"
                >
                    <legend className="mx-5 w-fit px-3">
                        <label
                            htmlFor={`fields.${index}.question_name`}
                            className="flex w-full items-center justify-start gap-3 text-xs"
                        >
                            Item Name:
                            <input
                                defaultValue={field.question_name}
                                {...register(
                                    `fields.${index}.question_name` as const,
                                )}
                                className="w-fit rounded bg-primary-secondary p-2 text-primary-white"
                                id={`fields.${index}.question_name`}
                            />
                        </label>
                    </legend>
                    <div className="flex w-full justify-between">
                        <label
                            htmlFor={`fields.${index}.question_type`}
                            className="flex w-3/4 flex-col items-start gap-3"
                        >
                            Type:
                            <select
                                defaultValue={field.question_type}
                                id={`fields.${index}.question_type`}
                                {...register(
                                    `fields.${index}.question_type` as const,
                                )}
                                className="h-10 w-1/2 rounded bg-primary-secondary p-2"
                                onChange={(e) => {
                                    const selectedType = e.target.value;
                                    setValue(
                                        `fields.${index}.question_type`,
                                        selectedType,
                                    );
                                    handleQuestionTypeChange(
                                        index,
                                        selectedType,
                                    );

                                    // Render choices or range fields based on the selected question type
                                    if (
                                        [
                                            "select",
                                            "checkbox",
                                            "radio",
                                        ].includes(selectedType)
                                    ) {
                                        setSelectedQuestionType(selectedType);
                                        setSelectedFieldChoices(
                                            getValues(
                                                `fields.${index}.choices`,
                                            ) || [],
                                        );
                                    } else if (selectedType === "range") {
                                        setSelectedQuestionType(null);
                                    }
                                }}
                            >
                                <option value="" disabled>
                                    Select question type
                                </option>
                                <optgroup label="Text Input Fields">
                                    <option value="text">Text</option>
                                    <option value="email">Email</option>
                                    <option value="password">Password</option>
                                    <option value="textarea">Paragraph</option>
                                </optgroup>
                                <optgroup label="Numbers">
                                    <option value="number">Number</option>
                                    <option value="tel">Phone Number</option>
                                </optgroup>
                                <optgroup label="Multiple Choice">
                                    <option value="select">Dropdown</option>
                                    <option value="checkbox">Checkbox</option>
                                    <option value="radio">Radio Button</option>
                                </optgroup>
                                <optgroup label="Slider">
                                    <option value="range">Slider</option>
                                </optgroup>
                                <optgroup label="Date & Time">
                                    <option value="time">Time</option>
                                    <option value="date">Date</option>
                                    <option value="datetime-local">
                                        Date and Time
                                    </option>
                                </optgroup>
                            </select>
                        </label>

                        <div className="flex h-fit w-1/4 items-start justify-between gap-5">
                            <button
                                type="button"
                                onClick={() => append({ ...field })}
                                className="ml-2 h-7 w-7 place-content-center"
                            >
                                <CopyAllOutlined
                                    titleAccess="Duplicate Question"
                                    className={`h-full w-full text-white transition-colors duration-300 hover:text-blue-600`}
                                />
                            </button>

                            {formFields.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="h-7 w-7 place-content-center"
                                >
                                    <Delete
                                        titleAccess="Delete Question"
                                        className={`h-full w-full text-white transition-colors duration-300 hover:text-red-600`}
                                    />
                                </button>
                            )}

                            <button
                                type="button"
                                onClick={() => {
                                    if (index > 0) {
                                        moveField(index, index - 1);
                                        setValue("fields", [...formFields]);
                                    }
                                }}
                                className="ml-2 h-7 w-7 place-content-center"
                                disabled={index === 0}
                            >
                                <ArrowUpwardRounded
                                    titleAccess="Move Up"
                                    className={`h-full w-full text-white transition-colors duration-300 hover:text-green-600`}
                                />
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    if (index < formFields.length - 1) {
                                        moveField(index, index + 1);
                                        setValue("fields", [...formFields]);
                                    }
                                }}
                                className="ml-2 h-7 w-7 place-content-center"
                                disabled={index === formFields.length - 1}
                            >
                                <ArrowDownwardRounded
                                    titleAccess="Move Down"
                                    className={`h-full w-full text-white transition-colors duration-300 hover:text-green-600`}
                                />
                            </button>
                        </div>
                    </div>

                    <label
                        htmlFor={`fields.${index}.question`}
                        className="flex flex-col items-start justify-center gap-3"
                    >
                        Question:
                        <textarea
                            defaultValue={field.question}
                            {...register(`fields.${index}.question` as const)}
                            className="max-h-64 min-h-24 w-full rounded bg-primary-white p-2 text-black"
                            id={`fields.${index}.question`}
                        ></textarea>
                    </label>

                    {fieldQuestionTypes[index] === "select" ||
                    fieldQuestionTypes[index] === "checkbox" ||
                    fieldQuestionTypes[index] === "radio" ? (
                        <div>{renderChoices(index)}</div>
                    ) : fieldQuestionTypes[index] === "range" ? (
                        <div>{renderRangeFields(index)}</div>
                    ) : null}

                    <label
                        htmlFor={`fields.${index}.required_field`}
                        className="flex items-center gap-3"
                    >
                        <input
                            type="checkbox"
                            defaultChecked={field.required_field}
                            {...register(
                                `fields.${index}.required_field` as const,
                            )}
                            id={`fields.${index}.required_field`}
                        />
                        Required:
                    </label>
                </fieldset>
            ))}

            <button
                type="button"
                onClick={appendNewFormField}
                className="group flex w-fit items-center gap-1 text-lg font-bold text-green-500 transition-colors ease-in-out hover:underline"
            >
                <AddCircleOutlineOutlined className="origin-center transition-all ease-in-out group-hover:rotate-180 " />{" "}
                Add Fieldset
            </button>
            <button
                type="submit"
                className="w-fit bg-blue-500 px-6 py-3 font-bold text-white"
            >
                Submit
            </button>
        </form>
    );
}
