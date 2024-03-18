"use client";

import React, { useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/utils";
import { Form, Response, Answer, ApiResponse } from "@@/types";
import TextInput from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useForm } from "react-hook-form";
import api from "@/services/api";
import { handleApiError } from "@/utils";
import { toast } from "react-toastify";

export default function Shared({ params }: { params: { formId: string } }) {
    const { formId } = params;
    const { data: form } = useSWR<Form>(`/forms/${formId}`, fetcher);
    const [isCreatingResponse, setIsCreatingResponse] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<{
        sections: {
            questions: {
                text: string;
            }[];
        }[];
    }>({});

    const handleSubmitResponse = handleSubmit(async (data) => {
        try {
            setIsCreatingResponse(true);
            const response = await api.post<ApiResponse<Response>>(
                `/responses`,
                { form_id: formId },
            );
            const newResponse = response.data.data;

            const questions = form?.sections.flatMap((section) =>
                section.questions.map((question) => question),
            );

            const answers = data.sections.flatMap((section) =>
                section.questions.map((question, questionIndex) => ({
                    text: question.text,
                })),
            );

            const answersWithQuestionId = answers.map((answer, index) => ({
                ...answer,
                question_id: questions?.[index].id,
                response_id: newResponse?.id,
            }));

            await Promise.all(
                answersWithQuestionId.map((answer) =>
                    api.post<ApiResponse<Answer>>(`/answers`, answer),
                ),
            );

            reset();
            toast.success("Response submitted successfully");
        } catch (error) {
            handleApiError(error);
        } finally {
            setIsCreatingResponse(false);
        }
    });

    return (
        <form
            className="flex h-[calc(100vh-57.0667px)] w-full flex-col gap-8 overflow-scroll px-4 py-8"
            onSubmit={handleSubmitResponse}
        >
            <section className="grid gap-2">
                <h1 className="text-center text-2xl font-bold">{form?.name}</h1>
                <p className="break-all">{form?.description}</p>
            </section>

            <div className="grid gap-2">
                {form?.sections.map((section, sectionIndex) => (
                    <div
                        key={section.id}
                        className="flex flex-col gap-4 rounded bg-primary-secondary p-4"
                    >
                        <h1 className="text-lg font-medium">{section.title}</h1>

                        <div className="flex flex-col gap-4">
                            {section.questions.map(
                                (question, questionIndex) => {
                                    const key =
                                        `sections.${sectionIndex}.questions.${questionIndex}.text` as any;
                                    const registerProps = {
                                        key,
                                        ...register(key),
                                    };

                                    return (
                                        <div
                                            className="w-full"
                                            key={question.id}
                                        >
                                            <label>{question.prompt}</label>
                                            {(() => {
                                                switch (question.type) {
                                                    case "textfield":
                                                        return (
                                                            <TextInput
                                                                label={
                                                                    question.prompt
                                                                }
                                                                {...register(
                                                                    `sections.${sectionIndex}.questions.${questionIndex}.text`,
                                                                    {
                                                                        required:
                                                                            "This field is required",
                                                                    },
                                                                )}
                                                                error={
                                                                    errors
                                                                        ?.sections?.[
                                                                        sectionIndex
                                                                    ]
                                                                        ?.questions?.[
                                                                        questionIndex
                                                                    ]?.text
                                                                        ?.message
                                                                }
                                                            />
                                                        );
                                                    case "textarea":
                                                        return (
                                                            <TextInput
                                                                placeholder="Enter Answer"
                                                                className="rounded-md border px-3 py-2 text-black"
                                                                {...register(
                                                                    `sections.${sectionIndex}.questions.${questionIndex}.text`,
                                                                    {
                                                                        required:
                                                                            "This field is required",
                                                                    },
                                                                )}
                                                                error={
                                                                    errors
                                                                        ?.sections?.[
                                                                        sectionIndex
                                                                    ]
                                                                        ?.questions?.[
                                                                        questionIndex
                                                                    ]?.text
                                                                        ?.message
                                                                }
                                                            />
                                                        );
                                                    case "multiple_choice":
                                                        return (
                                                            <div className="flex flex-col gap-1">
                                                                {question.choices.map(
                                                                    (
                                                                        choice,
                                                                    ) => (
                                                                        <label
                                                                            key={
                                                                                choice.id
                                                                            }
                                                                            className="flex items-center gap-2"
                                                                        >
                                                                            <TextInput
                                                                                type="radio"
                                                                                value={
                                                                                    choice.text
                                                                                }
                                                                                {...register(
                                                                                    `sections.${sectionIndex}.questions.${questionIndex}.text`,
                                                                                    {
                                                                                        required:
                                                                                            "This field is required",
                                                                                    },
                                                                                )}
                                                                                error={
                                                                                    errors
                                                                                        ?.sections?.[
                                                                                        sectionIndex
                                                                                    ]
                                                                                        ?.questions?.[
                                                                                        questionIndex
                                                                                    ]
                                                                                        ?.text
                                                                                        ?.message
                                                                                }
                                                                            />
                                                                            <span>
                                                                                {
                                                                                    choice.text
                                                                                }
                                                                            </span>
                                                                        </label>
                                                                    ),
                                                                )}
                                                            </div>
                                                        );
                                                    case "checkbox":
                                                        return (
                                                            <div className="flex flex-col gap-1">
                                                                {question.choices.map(
                                                                    (
                                                                        choice,
                                                                    ) => (
                                                                        <label
                                                                            key={
                                                                                choice.id
                                                                            }
                                                                            className="flex items-center gap-2"
                                                                        >
                                                                            <TextInput
                                                                                type={
                                                                                    question.type
                                                                                }
                                                                                value={
                                                                                    choice.text
                                                                                }
                                                                                {...register(
                                                                                    `sections.${sectionIndex}.questions.${questionIndex}.text`,
                                                                                    {
                                                                                        required:
                                                                                            "This field is required",
                                                                                    },
                                                                                )}
                                                                                error={
                                                                                    errors
                                                                                        ?.sections?.[
                                                                                        sectionIndex
                                                                                    ]
                                                                                        ?.questions?.[
                                                                                        questionIndex
                                                                                    ]
                                                                                        ?.text
                                                                                        ?.message
                                                                                }
                                                                            />
                                                                            <span>
                                                                                {
                                                                                    choice.text
                                                                                }
                                                                            </span>
                                                                        </label>
                                                                    ),
                                                                )}
                                                            </div>
                                                        );
                                                    case "dropdown":
                                                        return (
                                                            <select
                                                                className="rounded-md border px-3 py-2 text-black"
                                                                {...register(
                                                                    `sections.${sectionIndex}.questions.${questionIndex}.text`,
                                                                    {
                                                                        required:
                                                                            "This field is required",
                                                                    },
                                                                )}
                                                            >
                                                                {question.choices.map(
                                                                    (
                                                                        choice,
                                                                    ) => (
                                                                        <option
                                                                            key={
                                                                                choice.id
                                                                            }
                                                                            value={
                                                                                choice.text
                                                                            }
                                                                        >
                                                                            {
                                                                                choice.text
                                                                            }
                                                                        </option>
                                                                    ),
                                                                )}
                                                            </select>
                                                        );
                                                    case "date":
                                                        return (
                                                            <input
                                                                type="date"
                                                                className="rounded-md border px-3 py-2"
                                                                {...register(
                                                                    `sections.${sectionIndex}.questions.${questionIndex}.text`,
                                                                    {
                                                                        required:
                                                                            "This field is required",
                                                                    },
                                                                )}
                                                            />
                                                        );
                                                    default:
                                                        return null;
                                                }
                                            })()}
                                        </div>
                                    );
                                },
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <Button
                type="submit"
                className="mb-8 rounded bg-white px-2 py-3 text-black hover:bg-white/75"
                disabled={isCreatingResponse}
            >
                {isCreatingResponse ? "Submitting..." : "Submit"}
            </Button>
        </form>
    );
}
