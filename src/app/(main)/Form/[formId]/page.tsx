"use client";

import { FormParam, Form } from "@@/types";
import useAuth from "@/contexts/auth";
import { Edit } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import { SectionProvider } from "@/contexts/sections";
import useForm, { FormProvider } from "@/contexts/forms";
import ResponseComponent from "@/components/ResponseComponent";
import DynamicForm from "@/components/FormBuilder/DynamicForm";
import { ErrorBoundary } from "@/components";

export default function FormPage({ params }: { params: { formId: number } }) {
    const { formId } = params;
    const { user } = useAuth();
    const { isLoading, error, getForm } = useForm();

    const activeForm = getForm(Number(formId));

    const [isQuestionSectionOpen, setIsQuestionSectionOpen] = useState(true);
    const [titleInput, setTitleInput] = useState<string>("");

    const onClickOpenQuestionSection = () => {
        setIsQuestionSectionOpen(true);
    };

    const onClickOpenResponseSection = () => {
        setIsQuestionSectionOpen(false);
    };

    const handleFormSubmission = async (formData: any) => {
        console.log("Form data submitted:", formData);
    };

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitleInput(event.target.value);
    };

    const mainClassNames =
        "h-[calc(100vh-57.0667px)] w-screen p-4 pt-16 sm:p-8 sm:pt-16 md:h-screen overflow-scroll flex flex-col items-center gap-10";

    console.log(activeForm);

    return (
        <ErrorBoundary isLoading={isLoading} error={error}>
            <main className={mainClassNames}>
                <div className="flex w-full flex-col items-center gap-y-4">
                    <div className="flex w-full items-center justify-center">
                        <input
                            autoFocus
                            value={titleInput}
                            onChange={handleTitleChange}
                            className="w-1/4 border-none bg-transparent p-2 text-center text-3xl"
                        />
                        <Edit className="text-3xl" />
                    </div>
                    <div className="flex w-full gap-x-4 border-b border-b-primary-white">
                        <button
                            onClick={onClickOpenQuestionSection}
                            className={`border-b-2 ${isQuestionSectionOpen ? "border-b-primary-white font-bold" : "border-b-transparent"}`}
                        >
                            Question
                        </button>
                        <button
                            onClick={onClickOpenResponseSection}
                            className={`border-b-2 ${!isQuestionSectionOpen ? "border-b-primary-white font-bold" : "border-b-transparent"}`}
                        >
                            Response
                        </button>
                    </div>
                </div>

                {isQuestionSectionOpen ? (
                    <SectionProvider>
                        <DynamicForm
                            id={activeForm?.id}
                            user_id={user?.id || 0}
                            title={activeForm?.name}
                            sections={activeForm?.sections || []}
                            titleInput={titleInput}
                            description={activeForm?.description ?? ""}
                            onSubmit={handleFormSubmission}
                        />
                    </SectionProvider>
                ) : (
                    <ResponseComponent />
                )}
            </main>
        </ErrorBoundary>
    );
}
