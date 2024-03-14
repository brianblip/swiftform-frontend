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
        <form className="container mx-auto" onSubmit={handleSubmitResponse}>
            <div className="mt-24 border border-black p-4">
                <TextInput defaultValue={form?.name} disabled label="" />

                <TextInput
                    defaultValue={form?.description}
                    disabled
                    label=""
                    className="mt-4"
                />
            </div>

            {/* sections */}
            <div className="mt-16 flex flex-col gap-4">
                {form?.sections.map((section, sectionIndex) => (
                    <div
                        key={section.id}
                        className="flex flex-col gap-4 border border-black p-4"
                    >
                        <TextInput
                            disabled
                            defaultValue={section.title}
                            label=""
                        />

                        {/* questions */}
                        <div className="mt-8 flex flex-col gap-4">
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

            <Button type="submit" className="mt-8" disabled={isCreatingRespose}>
                {isCreatingRespose ? "Submitting..." : "Submit"}
            </Button>
        </form>
    );
}
