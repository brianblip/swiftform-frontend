"use client";

import useAuth from "@/contexts/auth";
import { Edit } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import { SectionProvider } from "@/contexts/sections";
import useForm from "@/contexts/forms";
import ResponseComponent from "@/components/ResponseComponent";
import DynamicForm from "@/components/FormBuilder/DynamicForm";
import { ErrorBoundary } from "@/components";
import { useRouter } from "next/navigation";

export default function FormPage({ params }: { params: { formId: number } }) {
    const { formId } = params;
    const { user } = useAuth();
    const { isLoading, error, getForm, updateForm } = useForm();
    const router = useRouter();
    const activeForm = getForm(Number(formId));
    const [isQuestionSectionOpen, setIsQuestionSectionOpen] = useState(true);
    const [titleInput, setTitleInput] = useState<string>("");

    // Set default titleInput value when activeForm changes
    useEffect(() => {
        if (isLoading) return;

        if (!activeForm) {
            router.push("/404");
        } else {
            setTitleInput(activeForm.name);
        }
    }, [activeForm, isLoading, router]);

    const onClickOpenQuestionSection = () => {
        setIsQuestionSectionOpen(true);
    };

    const onClickOpenResponseSection = () => {
        setIsQuestionSectionOpen(false);
    };

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = event.target.value;
        setTitleInput(newTitle);
        if (activeForm) {
            const updatedForm = { ...activeForm, name: newTitle };
            updateForm(activeForm.id, updatedForm); // Update the form data
        }
    };

    const mainClassNames =
        "h-[calc(100vh-57.0667px)] w-screen p-4 pt-16 sm:p-8 sm:pt-16 md:h-screen overflow-scroll flex flex-col items-center gap-10";

    if (!activeForm) {
        return null;
    }

    return (
        <ErrorBoundary isLoading={isLoading || !activeForm} error={error}>
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
                            form={activeForm}
                            user_id={user?.id || 0}
                            updateForm={updateForm} // Pass updateForm here
                            onSubmit={(formData) =>
                                console.log("Form data submitted:", formData)
                            }
                        />
                    </SectionProvider>
                ) : (
                    <ResponseComponent />
                )}
            </main>
        </ErrorBoundary>
    );
}
