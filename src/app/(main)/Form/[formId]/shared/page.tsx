"use client";
import React, { useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/utils";
import { Form, Response, Answer, ApiResponse } from "@@/types";
import TextInput from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useForm } from "react-hook-form";
import api from "@/services/api";

export default function Shared({ params }: { params: { formId: string } }) {
    const { formId } = params;
    const { data: form } = useSWR<Form>(`/forms/${formId}`, fetcher);
    const [isCreatingResponse, setIsCreatingResponse] = useState(false);

    const { register, handleSubmit, reset } = useForm<{
        sections: {
            questions: {
                text: string;
            }[];
        }[];
    }>({});

    const handleSubmitResponse = handleSubmit(async (data) => {
        try {
            setIsCreatingResponse(true);

            // create a response to the form first
            const response = await api.post<ApiResponse<Response>>(
                `/responses`,
                {
                    form_id: formId,
                },
            );

            const newResponse = response.data.data;

            const questions = form?.sections.flatMap((section) =>
                section.questions.map((question) => question),
            );

            // get the answers to the questions
            const answers = data.sections.flatMap((section) => {
                return section.questions.map((question, questionIndex) => {
                    return {
                        question_id: questions?.[questionIndex].id,
                        response_id: newResponse?.id,
                        text: question.text,
                    };
                });
            });

            // add the answers to the response
            await Promise.all(
                answers.map((answer) => {
                    return api.post<ApiResponse<Answer>>(`/answers`, answer);
                }),
            );

            reset();
            alert("Response submitted successfully");
        } catch (e) {
            alert("An error occurred");
        } finally {
            setIsCreatingResponse(false);
        }
    });

    return (
        <form
            className="flex h-[calc(100vh-57.0667px)] flex-col gap-8 overflow-scroll px-4 py-8"
            onSubmit={handleSubmitResponse}
        >
            <section className="grid gap-2">
                <h1 className="text-center text-2xl font-bold">{form?.name}</h1>
                <p className="break-all">{form?.description}</p>
            </section>

            {/* sections */}
            <div className="grid gap-2">
                {form?.sections.map((section, sectionIndex) => (
                    <div
                        key={section.id}
                        className="flex flex-col gap-4 rounded bg-primary-secondary p-4"
                    >
                        <h1 className="text-lg font-medium">{section.title}</h1>

                        {/* questions */}
                        <div className="flex flex-col gap-4">
                            {section.questions.map((question, questionIndex) => {
                                switch (question.type) {
                                    case "textfield":
                                        return (
                                            <TextInput
                                                label={question.prompt}
                                                key={question.id}
                                                {...register(
                                                    `sections.${sectionIndex}.questions.${questionIndex}.text`,
                                                )}
                                            />
                                        );
                                    case "textarea":
                                        return (
                                            <textarea
                                                className="border border-gray-300 rounded-md px-3 py-2"
                                                key={question.id}
                                                {...register(
                                                    `sections.${sectionIndex}.questions.${questionIndex}.text`,
                                                )}
                                            />
                                        );
                                    case "multiple_choice":
                                        return (
                                            <div
                                                key={question.id}
                                                className="flex flex-col gap-1"
                                            >
                                                {question.choices.map((choice) => (
                                                    <label
                                                        key={choice.id}
                                                        className="flex items-center gap-2"
                                                    >
                                                        <input
                                                            type="radio"
                                                            value={choice.text}
                                                            {...register(
                                                                `sections.${sectionIndex}.questions.${questionIndex}.text`,
                                                            )}
                                                        />
                                                        <span>{choice.text}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        );
                                    case "checkbox":
                                        return (
                                            <div
                                                key={question.id}
                                                className="flex flex-col gap-1"
                                            >
                                                {question.choices.map((choice) => (
                                                    <label
                                                        key={choice.id}
                                                        className="flex items-center gap-2"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            value={choice.text}
                                                            {...register(
                                                                `sections.${sectionIndex}.questions.${questionIndex}.text`,
                                                            )}
                                                        />
                                                        <span>{choice.text}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        );
                                    case "dropdown":
                                        return (
                                            <select
                                                key={question.id}
                                                {...register(
                                                    `sections.${sectionIndex}.questions.${questionIndex}.text`,
                                                )}
                                                className="border border-gray-300 rounded-md px-3 py-2"
                                            >
                                                {question.choices.map((choice) => (
                                                    <option
                                                        key={choice.id}
                                                        value={choice.text}
                                                    >
                                                        {choice.text}
                                                    </option>
                                                ))}
                                            </select>
                                        );
                                    case "date":
                                        return (
                                            <input
                                                type="date"
                                                key={question.id}
                                                {...register(
                                                    `sections.${sectionIndex}.questions.${questionIndex}.text`,
                                                )}
                                                className="border border-gray-300 rounded-md px-3 py-2"
                                            />
                                        );
                                    default:
                                        return null;
                                        // TODO: Create an input field for Attachment
                                }
                            })}
                        </div>
                    </div>
                ))}
            </div>

            <button
                type="submit"
                className="mb-8 rounded bg-white px-2 py-3 text-black hover:bg-white/75"
                disabled={isCreatingResponse}
            >
                {isCreatingResponse ? "Submitting..." : "Submit"}
            </button>
        </form>
    );
}
