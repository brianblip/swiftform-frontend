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
    const { data } = useSWR<Form>(`/forms/${formId}`, fetcher);
    const [isCreatingRespose, setIsCreatingResponse] = useState(false);

    const { register, handleSubmit } = useForm({});

    const handleSubmitResponse = handleSubmit(async (data) => {
        try {
            setIsCreatingResponse(true);
            const response = await api.post<ApiResponse<Response>>(
                `/responses`,
                {
                    form_id: formId,
                },
            );

            console.log(response.data.data);
        } catch (e) {
            alert("An error occurred");
        } finally {
            setIsCreatingResponse(false);
        }
    });

    return (
        <form className="container mx-auto" onSubmit={handleSubmitResponse}>
            <div className="mt-24 border border-black p-4">
                <TextInput defaultValue={data?.name} disabled label="" />

                <TextInput
                    defaultValue={data?.description}
                    disabled
                    label=""
                    className="mt-4"
                />
            </div>

            {/* sections */}
            <div className="mt-16 flex flex-col gap-4">
                {data?.sections.map((section, sectionIndex) => (
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
                                                    `sections.${sectionIndex}.questions.${questionIndex}`,
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
