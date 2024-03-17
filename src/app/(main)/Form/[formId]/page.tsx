"use client";

import { mutate } from "swr";
import { Edit } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import useForm from "@/contexts/forms";
import ResponseComponent from "@/components/ResponseComponent";
import DynamicForm from "@/components/FormBuilder/DynamicForm";
import { ErrorBoundary } from "@/components";
import { useRouter } from "next/navigation";

export default function FormPage({ params }: { params: { formId: number } }) {
    const { formId } = params;
    const { isLoading, error, getForm, updateForm } = useForm();
    const router = useRouter();
    const activeForm = getForm(Number(formId));
    const [isQuestionSectionOpen, setIsQuestionSectionOpen] = useState(true);
    const [titleInput, setTitleInput] = useState<string>("");

    // Set default titleInput value when activeForm changes
    useEffect(() => {
        if (isLoading) return;

        if (!activeForm) {
            router.push("/");
        } else {
            setTitleInput(activeForm.name || ""); // Initialize with activeForm.name or ""
        }
    }, [activeForm, isLoading, router]);

    // Change handleTitleChange function to update the state
    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = event.target.value;
        setTitleInput(newTitle);
        if (activeForm) {
            const updatedForm = { ...activeForm, name: newTitle };
            updateForm(activeForm.id, updatedForm); // Update the form data
        }
        mutate("/forms");
    };
    const handleRedirectToShared = () => {
        router.push(`/Form/${formId}/shared`);
    };

    if (!activeForm) {
        return null;
    }

    return (
        <ErrorBoundary isLoading={isLoading || !activeForm} error={error}>
            <main
                className={`flex h-[calc(100vh-57.0667px)] w-dvw flex-col items-center gap-8  overflow-scroll px-4 py-10 pb-20 sm:px-8 md:min-h-dvh md:py-16 md:pb-28 lg:px-20 `}
            >
                <section className="flex w-full flex-col items-center gap-6">
                    <div className="relative flex w-3/4 items-center lg:w-[468px]">
                        <input
                            id="formTitle"
                            autoFocus
                            value={titleInput}
                            onChange={handleTitleChange}
                            className="w-full rounded bg-primary-secondary px-3 py-2 pr-8 text-2xl text-primary-white hover:bg-primary-white/15 focus:bg-primary-white/25 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <label
                            htmlFor="formTitle"
                            className="absolute right-0 cursor-pointer pr-1"
                        >
                            <Edit />
                        </label>
                    </div>
                    <div className="flex w-full gap-4 border-b border-b-primary-white">
                        <button
                            onClick={() => setIsQuestionSectionOpen(true)}
                            className={`border-b-2 hover:text-white/75 ${isQuestionSectionOpen ? "border-b-primary-white font-bold text-white hover:text-white" : "border-b-transparent"}`}
                        >
                            Question
                        </button>
                        <button
                            onClick={() => setIsQuestionSectionOpen(false)}
                            className={`border-b-2 hover:text-white/75 ${!isQuestionSectionOpen ? "border-b-primary-white font-bold text-white hover:text-white" : "border-b-transparent"}`}
                        >
                            Response
                        </button>
                    </div>
                </section>

                {isQuestionSectionOpen ? (
                    <DynamicForm form={activeForm} updateForm={updateForm} />
                ) : (
                    <ResponseComponent />
                )}

                <button
                    onClick={handleRedirectToShared}
                    className="rounded bg-primary-white px-4 py-2 text-black hover:bg-primary-white/70 "
                >
                    Share
                </button>
            </main>
        </ErrorBoundary>
    );
}
