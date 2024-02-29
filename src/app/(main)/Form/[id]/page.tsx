"use client";

import { FormParam } from "@@/types";
import useAuth from "@/contexts/auth";
import { Edit } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import { SectionProvider } from "@/contexts/formSection";
import useForm, { FormProvider } from "@/contexts/singleForm";
import ResponseComponent from "@/components/ResponseComponent";
import DynamicForm from "@/components/FormBuilder/DynamicForm";
import { ErrorBoundary } from "@/components";

export default function FormPage({ params }: { params: FormParam }) {
    const { id } = params;
    const { user } = useAuth();
    const { form, isLoading, error, fetchForm } = useForm(id);
    const [isQuestionSectionOpen, setIsQuestionSectionOpen] = useState(true);
    const [titleInput, setTitleInput] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchForm(id);
            } catch (error) {
                console.error("Error fetching form data:", error);
            }
        };

        fetchData();
    }, [fetchForm, id]);

    useEffect(() => {
        if (form) {
            setTitleInput(form.name || "");
        }
    }, [form]);

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

    if (!form) {
        return <main className={mainClassNames}>No form found.</main>;
    }

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
                                id={params.id}
                                user_id={user?.id || 0}
                                title={form.name}
                                sections={form.sections}
                                titleInput={titleInput}
                                description={form?.description ?? ""}
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
