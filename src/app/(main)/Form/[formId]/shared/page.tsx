"use client";

import useSWR from "swr";
import { fetcher } from "@/utils";
import { Form, Response, Answer, ApiResponse } from "@@/types";
import TextInput from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useForm } from "react-hook-form";
import api from "@/services/api";
import { useState } from "react";

export default function Shared({ params }: { params: { formId: string } }) {
    const { formId } = params;
    const { data: form } = useSWR<Form>(`/forms/${formId}`, fetcher);
    const [isCreatingRespose, setIsCreatingResponse] = useState(false);

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
                {/* <TextInput defaultValue={form?.name} disabled label="" />

                <TextInput
                    defaultValue={form?.description}
                    disabled
                    label=""
                    className="mt-4"
                /> */}
            </section>

            {/* sections */}
            <div className="grid gap-2">
                {form?.sections.map((section, sectionIndex) => (
                    <div
                        key={section.id}
                        className="flex flex-col gap-4 rounded bg-primary-secondary p-4"
                    >
                        <h1 className="text-lg font-medium">{section.title}</h1>
                        {/* <TextInput
                            disabled
                            defaultValue={section.title}
                            label=""
                        /> */}

                        {/* questions */}
                        <div className="flex flex-col gap-4">
                            {section.questions.map(
                                (question, questionIndex) => {
                                    if (question.type === "textfield") {
                                        return (
                                            <TextInput
                                                label={question.prompt}
                                                key={question.id}
                                                {...register(
                                                    `sections.${sectionIndex}.questions.${questionIndex}.text`,
                                                )}
                                            />
                                        );
                                    }
                                },
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <button
                type="submit"
                className="mb-8 rounded bg-white px-2 py-3 text-black hover:bg-white/75"
                disabled={isCreatingRespose}
            >
                {isCreatingRespose ? "Submitting..." : "Submit"}
            </button>
        </form>
    );
}
