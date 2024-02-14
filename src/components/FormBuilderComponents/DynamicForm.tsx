"use client";
// DynamicForm.tsx
import React, { useEffect, useState, ChangeEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
    Delete,
    CopyAllOutlined,
    ArrowUpwardRounded,
    ArrowDownwardRounded,
    AddCircleOutlineOutlined,
} from "@mui/icons-material";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import SliderRangeRender from "./SliderRangeRender";
import MultipleChoiceRender from "./MultipleChoiceRender";
import { FormDataModel, DynamicFormProps } from "./Interface";
import { FormFieldModel } from "./FormFieldModel";

export default function DynamicForm({
    id,
    title,
    titleInput,
    description,
    fields,
    onSubmit,
}: DynamicFormProps) {
    const {
        watch,
        control,
        register,
        setValue,
        getValues,
        clearErrors,
        handleSubmit,
        formState: { errors },
    } = useForm<FormDataModel>({
        defaultValues: { id, title, description, fields },
    });

    const router = useRouter();
    const {
        fields: formFields,
        append,
        remove,
    } = useFieldArray<FormFieldModel>({ control, name: "fields" });

    const [selectedQuestionType, setSelectedQuestionType] = useState<
        string | null
    >(null);
    const [selectedFieldChoices, setSelectedFieldChoices] = useState<string[]>(
        [],
    );
    const [fieldQuestionTypes, setFieldQuestionTypes] = useState<string[]>([]);
    const [inputValues, setInputValues] = useState({});

    const handleAddField = () =>
        append(new FormFieldModel(formFields.length + 1));

    const handleDuplicateField = (index: number) => {
        const updatedFields = [...getValues("fields")];
        const newField = { ...updatedFields[index], field_id: Date.now() };
        updatedFields.splice(index + 1, 0, newField);
        setValue("fields", updatedFields);
    };

    const handleMoveField = (
        currentIndex: number,
        direction: "up" | "down",
    ) => {
        const updatedFields = [...getValues("fields")];
        const newIndex =
            direction === "up" ? currentIndex - 1 : currentIndex + 1;

        if (newIndex >= 0 && newIndex < updatedFields.length) {
            [updatedFields[currentIndex], updatedFields[newIndex]] = [
                updatedFields[newIndex],
                updatedFields[currentIndex],
            ];

            // Clear the 'required_field' value when moving the field
            updatedFields[currentIndex].required_field = false;
            updatedFields[newIndex].required_field = false;

            setValue("fields", updatedFields);
        }
    };

    const handleFormSubmit = async (formData: FormDataModel) => {
        try {
            // Convert "required_field": ["on"] to "required_field": true
            // and "required_field": [] to "required_field": false
            formData.fields = formData.fields.map((field) => ({
                ...field,
                required_field: Array.isArray(field.required_field)
                    ? field.required_field.length > 0
                    : field.required_field,
            }));

            const response = await axios.patch(
                `${process.env.NEXT_PUBLIC_API_URL}/${id}`,
                formData,
            );
            console.log("Form submitted successfully:", response.data);
            window.dispatchEvent(new CustomEvent("formCreated"));
            router.push("/");
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    const handleQuestionTypeChange = (index: number, questionType: string) => {
        setFieldQuestionTypes((prevTypes) => {
            const updatedTypes = [...prevTypes];
            updatedTypes[index] = questionType;
            return updatedTypes;
        });

        setSelectedFieldChoices(getValues(`fields.${index}.choices`) || []);

        if (["select", "checkbox", "radio"].includes(questionType)) {
            const existingChoices = getValues(`fields.${index}.choices`) || [];
            if (existingChoices.length === 0) {
                setValue(`fields.${index}.choices`, [`New Option`]);
                setSelectedFieldChoices([`New Option`]);
            }
        } else {
            // Remove choices when question type is not 'select', 'checkbox', 'radio', or 'range'
            setValue(`fields.${index}.choices`, []);
            setSelectedFieldChoices([]);
        }

        // Remove minimum and maximum when question type is not 'range'
        if (questionType !== "range") {
            setValue(`fields.${index}.minimum`, undefined);
            setValue(`fields.${index}.maximum`, undefined);
        }
    };

    const renderSliderRange = (index: number) => {
        const minimumValue = watch(`fields.${index}.minimum`);
        const maximumValue = watch(`fields.${index}.maximum`);

        const handleChange = (type: "minimum" | "maximum", e: ChangeEvent) => {
            const value = Number((e.target as HTMLInputElement).value);
            setValue(`fields.${index}.${type}`, isNaN(value) ? 0 : value);
        };

        return (
            <SliderRangeRender
                index={index}
                minimumValue={minimumValue}
                maximumValue={maximumValue}
                handleMinimumChange={(e) => handleChange("minimum", e)}
                handleMaximumChange={(e) => handleChange("maximum", e)}
            />
        );
    };

    const renderMultipleChoice = (index: number) => {
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
            <MultipleChoiceRender
                choices={choices}
                onAddChoice={handleAddChoice}
                onRemoveChoice={handleRemoveChoice}
                onUpdateChoice={handleUpdateChoice}
            />
        );
    };

    useEffect(() => {
        setValue("title", title);

        formFields.forEach((field, index) => {
            const initialQuestionType = getValues(
                `fields.${index}.question_type`,
            );
            if (initialQuestionType) {
                setValue(`fields.${index}.question_type`, initialQuestionType);
                handleQuestionTypeChange(index, initialQuestionType);

                setInputValues((prevInputValues) => ({
                    ...prevInputValues,
                    [`question-${field.id}`]: field.question,
                }));

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

            {watch("fields", []).map((field: FormFieldModel, index: number) => (
                <fieldset
                    key={field.field_id}
                    className="flex w-4/5 flex-col gap-5 rounded-md border border-zinc-500 p-7 shadow-xl"
                >
                    <legend className="mx-5 w-fit px-3">
                        <label
                            htmlFor={`fields[${index}].question_name`}
                            className="flex w-full items-center justify-start gap-3 text-xs"
                        >
                            Item Name:
                            <input
                                required
                                defaultValue={field.question_name}
                                {...register(
                                    `fields[${index}].question_name` as const,
                                )}
                                className="w-fit rounded bg-primary-secondary p-2 text-primary-white"
                            />
                        </label>
                    </legend>
                    <div className="flex w-full justify-between">
                        <label
                            htmlFor={`fields[${index}].question_type`}
                            className="flex w-3/4 flex-col items-start gap-3"
                        >
                            Type:
                            <select
                                defaultValue={field.question_type}
                                {...register(
                                    `fields[${index}].question_type` as const,
                                    {
                                        required:
                                            "Please select a question type",
                                    },
                                )}
                                className={`h-10 w-1/2 rounded bg-primary-secondary p-2  ${errors?.fields?.[index]?.question_type ? "border border-red-500" : ""}`}
                                onChange={(e) => {
                                    const selectedType = e.target.value;

                                    clearErrors(
                                        `fields.${index}.question_type`,
                                    );

                                    setValue(
                                        `fields.${index}.question_type`,
                                        selectedType,
                                    );
                                    handleQuestionTypeChange(
                                        index,
                                        selectedType,
                                    );

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
                                            ),
                                        );
                                    } else {
                                        setSelectedQuestionType(null);
                                    }
                                }}
                            >
                                <option value="" disabled>
                                    {errors?.fields?.[index]?.question_type
                                        ?.message || "Select question type"}
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
                                onClick={() => handleMoveField(index, "up")}
                                className="ml-2 size-7 place-content-center"
                            >
                                <ArrowUpwardRounded
                                    titleAccess="Move Up"
                                    className={`size-full text-white transition-colors duration-300 hover:text-green-600`}
                                />
                            </button>
                            <button
                                type="button"
                                onClick={() => handleMoveField(index, "down")}
                                className="ml-2 size-7 place-content-center"
                            >
                                <ArrowDownwardRounded
                                    titleAccess="Move Down"
                                    className={`size-full text-white transition-colors duration-300 hover:text-green-600`}
                                />
                            </button>
                            <button
                                type="button"
                                onClick={() => handleDuplicateField(index)}
                                className="ml-2 size-7 place-content-center"
                            >
                                <CopyAllOutlined
                                    titleAccess="Duplicate Question"
                                    className={`size-full text-white transition-colors duration-300 hover:text-blue-600`}
                                />
                            </button>
                            <button
                                type="button"
                                onClick={() => remove(index)}
                                className="ml-2 size-7 place-content-center"
                            >
                                <Delete
                                    titleAccess="Delete Question"
                                    className={`size-full text-white transition-colors duration-300 hover:text-red-600`}
                                />
                            </button>
                        </div>
                    </div>
                    <label
                        htmlFor={`fields[${index}].question`}
                        className="flex flex-col items-start justify-center gap-3"
                    >
                        Question:
                        <textarea
                            required
                            defaultValue={field.question}
                            {...register(`fields[${index}].question` as const)}
                            className="max-h-64 min-h-24 w-full rounded bg-primary-white p-2 text-black"
                        ></textarea>
                    </label>
                    {fieldQuestionTypes[index] === "select" ||
                    fieldQuestionTypes[index] === "checkbox" ||
                    fieldQuestionTypes[index] === "radio" ? (
                        <div>{renderMultipleChoice(index)}</div>
                    ) : fieldQuestionTypes[index] === "range" ? (
                        <div>{renderSliderRange(index)}</div>
                    ) : null}
                    <label
                        htmlFor={`fields[${index}].required_field`}
                        className="flex items-center gap-3"
                    >
                        <input
                            type="checkbox"
                            defaultChecked={field.required_field}
                            {...register(
                                `fields[${index}].required_field` as const,
                            )}
                        />
                        Required:
                    </label>
                </fieldset>
            ))}

            <button
                type="button"
                onClick={handleAddField}
                className="group flex w-fit items-center gap-1 text-lg font-bold text-green-500 transition-colors ease-in-out hover:underline"
            >
                <AddCircleOutlineOutlined className="origin-center transition-all ease-in-out group-hover:rotate-180 " />
                Add Fieldset
            </button>
            {/* Submit Button */}
            <button
                type="submit"
                className="w-fit bg-blue-500 px-6 py-3 font-bold text-white"
            >
                Submit
            </button>
        </form>
    );
}
