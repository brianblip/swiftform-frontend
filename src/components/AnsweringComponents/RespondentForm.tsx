"use client";
import React, { useEffect, useState, ChangeEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { FormDataModel, DynamicFormProps } from "./Interface";
import { FormFieldModel } from "./FormFieldModel";
import useUserValues from "@/store/useUserData";

export default function DynamicForm({
    id,
    user_id,
    owner_id,
    title,
    description,
    fields,
    onSubmit,
}: DynamicFormProps) {
    const { control, handleSubmit } = useForm<FormDataModel>();
    const router = useRouter();
    const userValues = useUserValues();
    const handleFormSubmit = async (formData: FormDataModel) => {
        try {
            const response = await axios.patch(
                `${process.env.NEXT_PUBLIC_FRONTEND_API_URL}/Response/${id}`,
                {
                    responses: [
                        {
                            respondent: {
                                id: user_id,
                                name: userValues[3],
                                email: userValues[1],
                                avatar_url: userValues[0],
                            },
                            answers: formData.fields.map((field: any) => ({
                                field_id: field.field_id,
                                answer: field.answer,
                            })),
                        },
                    ],
                },
            );
            console.log("Form submitted successfully:", response.data);
            router.push("/");
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    if (user_id !== owner_id) {
        return <p>You are not authorized to access this form.</p>;
    }

    return (
        <section className="flex w-full">
            <form
                onSubmit={handleSubmit(handleFormSubmit)}
                className="flex w-full flex-col items-center gap-10 border border-zinc-500 p-5"
            >
                {fields.map((field: FormFieldModel) => (
                    <div key={field.field_id}>
                        <label>{field.question}</label>
                        {field.question_type === "select" ? (
                            <select
                                {...control.register(
                                    `fields.${field.field_id}.answer`,
                                    {
                                        required: field.required_field,
                                    },
                                )}
                            >
                                {field.choices.map((choice, choiceIndex) => (
                                    <option key={choiceIndex} value={choice}>
                                        {choice}
                                    </option>
                                ))}
                            </select>
                        ) : field.question_type === "checkbox" ? (
                            field.choices.map((choice, choiceIndex) => (
                                <div key={choiceIndex}>
                                    <input
                                        type="checkbox"
                                        value={choice}
                                        {...control.register(
                                            `fields.${field.field_id}.answer[${choiceIndex}]`,
                                            {
                                                required: field.required_field,
                                            },
                                        )}
                                    />
                                    <label>{choice}</label>
                                </div>
                            ))
                        ) : field.question_type === "radio" ? (
                            field.choices.map((choice, choiceIndex) => (
                                <div key={choiceIndex}>
                                    <input
                                        type="radio"
                                        value={choice}
                                        {...control.register(
                                            `fields.${field.field_id}.answer`,
                                            {
                                                required: field.required_field,
                                            },
                                        )}
                                    />
                                    <label>{choice}</label>
                                </div>
                            ))
                        ) : field.question_type === "range" ? (
                            <input
                                type={field.question_type}
                                {...control.register(
                                    `fields.${field.field_id}.answer`,
                                    {
                                        required: field.required_field,
                                    },
                                )}
                                min={field.minimum}
                                max={field.maximum}
                            />
                        ) : (
                            <input
                                type={field.question_type}
                                {...control.register(
                                    `fields.${field.field_id}.answer`,
                                    {
                                        required: field.required_field,
                                    },
                                )}
                            />
                        )}
                    </div>
                ))}

                <button
                    type="submit"
                    className="w-fit bg-blue-500 px-6 py-3 font-bold text-white"
                >
                    Submit
                </button>
            </form>
        </section>
    );
}
