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

export default function FormPage({ params }: { params: FormParam }) {
    const { id } = params;
    const { user } = useAuth();
    const { forms, isLoading, error } = useForm();
    const [isQuestionSectionOpen, setIsQuestionSectionOpen] = useState(true);
    const [titleInput, setTitleInput] = useState<string>("");

    useEffect(() => {
        console.log("Fetched Forms Array:", forms);
        if (forms && forms.length > 0 && forms[id - 1]) {
            setTitleInput(forms[id - 1].name || "");
        }
    }, [forms, id]);

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

    if (isLoading) {
        return <main className={mainClassNames}>Loading...</main>;
    }

    if (!forms || !forms[id - 1]) {
        return <main className={mainClassNames}>No form found.</main>;
    }

    const currentForm = forms[id - 1];

    return (
        <ErrorBoundary isLoading={isLoading} error={error}>
            <FormProvider>
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
                                id={currentForm.id}
                                user_id={user?.id || 0}
                                title={currentForm.name}
                                sections={currentForm.sections}
                                titleInput={titleInput}
                                description={currentForm?.description ?? ""}
                                onSubmit={handleFormSubmission}
                            />
                        </SectionProvider>
                    ) : (
                        <ResponseComponent />
                    )}
                </main>
            </FormProvider>
        </ErrorBoundary>
    );
}
