"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "@/utils";
import { Form, Response, Answer, ApiResponse } from "@@/types";
import { useForm } from "react-hook-form";
import api from "@/services/api";
import Button from "@/components/UIComponents/Button";
import Input from "@/components/UIComponents/Input";
import { handleApiError } from "@/utils";
import { toast } from "react-toastify";

export default function Shared({ params }: { params: { formId: string } }) {
    const { formId } = params;
    const { data: form } = useSWR<Form>(`/forms/${formId}`, fetcher);
    const [isCreatingResponse, setIsCreatingResponse] = useState(false);
    const router = useRouter();

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
            className="flex h-[calc(100vh-57.0667px)] w-dvw flex-col items-center justify-start gap-8 overflow-scroll px-4 py-10 sm:px-8 md:h-dvh md:py-16 xl:p-16"
            onSubmit={handleSubmitResponse}
        >
            <section className="grid w-full gap-2 sm:w-11/12 lg:w-9/12 xl:w-[660px]">
                <h1 className="text-center text-2xl font-bold">{form?.name}</h1>
                <p className="break-all">{form?.description}</p>
            </section>

            {/* sections */}
            <div className="grid w-full gap-6 sm:w-11/12 lg:w-9/12 xl:w-[660px]">
                {form?.sections.map((section, sectionIndex) => (
                    <div
                        key={section.id}
                        className="flex flex-col gap-4 rounded bg-primary-secondary p-4"
                    >
                        <h1 className="text-lg font-semibold">
                            {section.title}
                        </h1>

                        <div className="flex flex-col gap-4">
                            {section.questions.map(
                                (question, questionIndex) => {
                                    switch (question.type) {
                                        case "textfield":
                                            return (
                                                <>
                                                    {/* <TextInput
                                                        label={question.prompt}
                                                        key={question.id}
                                                        {...register(
                                                            `sections.${sectionIndex}.questions.${questionIndex}.text`,
                                                        )}
                                                    /> */}
                                                    <Input
                                                        type="text"
                                                        label={question.prompt}
                                                        key={question.id}
                                                        {...register(
                                                            `sections.${sectionIndex}.questions.${questionIndex}.text`,
                                                        )}
                                                    />
                                                </>
                                            );
                                        case "textarea":
                                            return (
                                                <>
                                                    {/* <textarea
                                                        className="rounded-md border border-gray-300 px-3 py-2"
                                                        key={question.id}
                                                        {...register(
                                                            `sections.${sectionIndex}.questions.${questionIndex}.text`,
                                                        )}
                                                    /> */}
                                                    <Input
                                                        variant="textarea"
                                                        type="textarea"
                                                        key={question.id}
                                                        {...register(
                                                            `sections.${sectionIndex}.questions.${questionIndex}.text`,
                                                        )}
                                                    />
                                                </>
                                            );
                                        case "multiple_choice":
                                            return (
                                                <div
                                                    key={question.id}
                                                    className="grid gap-1"
                                                >
                                                    <h1>{question.prompt}</h1>
                                                    {question.choices.map(
                                                        (choice) => (
                                                            <label
                                                                key={choice.id}
                                                                className="flex items-center gap-2"
                                                            >
                                                                <input
                                                                    type="radio"
                                                                    value={
                                                                        choice.text
                                                                    }
                                                                    {...register(
                                                                        `sections.${sectionIndex}.questions.${questionIndex}.text`,
                                                                    )}
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
                                                <div
                                                    key={question.id}
                                                    className="grid gap-1"
                                                >
                                                    <h1>{question.prompt}</h1>
                                                    {question.choices.map(
                                                        (choice) => (
                                                            <label
                                                                key={choice.id}
                                                                className="flex items-center gap-2"
                                                            >
                                                                <input
                                                                    type="checkbox"
                                                                    value={
                                                                        choice.text
                                                                    }
                                                                    {...register(
                                                                        `sections.${sectionIndex}.questions.${questionIndex}.text`,
                                                                    )}
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
                                                <>
                                                    {/* <select
                                                        key={question.id}
                                                        {...register(
                                                            `sections.${sectionIndex}.questions.${questionIndex}.text`,
                                                        )}
                                                        className="rounded-md border border-gray-300 px-3 py-2"
                                                    >
                                                        {question.choices.map(
                                                            (choice) => (
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
                                                    </select> */}
                                                    <Input
                                                        label={question.prompt}
                                                        type="select"
                                                        variant="formSelect"
                                                        className="bg-primary-neutral"
                                                        key={question.id}
                                                        {...register(
                                                            `sections.${sectionIndex}.questions.${questionIndex}.text`,
                                                        )}
                                                    >
                                                        {question.choices.map(
                                                            (choice) => (
                                                                <option
                                                                    className={`w-full font-sans`}
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
                                                    </Input>
                                                </>
                                            );
                                        case "date":
                                            return (
                                                <>
                                                    {/* <input
                                                        type="date"
                                                        key={question.id}
                                                        {...register(
                                                            `sections.${sectionIndex}.questions.${questionIndex}.text`,
                                                        )}
                                                        className="rounded-md border bg-primary-secondary px-3 py-2"
                                                    /> */}
                                                    <Input
                                                        type="date"
                                                        variant="formSelect"
                                                        className="bg-primary-neutral"
                                                        key={question.id}
                                                        {...register(
                                                            `sections.${sectionIndex}.questions.${questionIndex}.text`,
                                                        )}
                                                    />
                                                </>
                                            );
                                        default:
                                            return null;
                                        // TODO: Create an input field for Attachment
                                    }
                                },
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <Button
                variant="secondary"
                type="submit"
                disabled={isCreatingResponse}
                className="sm:w-11/12 lg:w-9/12 xl:w-[660px]"
            >
                {isCreatingResponse ? "Submitting..." : "Submit"}
            </Button>
        </form>
    );
}
