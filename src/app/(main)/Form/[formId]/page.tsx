"use client";

import { mutate } from "swr";
import { Edit } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import useForm from "@/contexts/forms";
import ResponseComponent from "@/components/ResponseComponent";
import DynamicForm from "@/components/FormBuilder/DynamicForm";
import Link from "next/link";
import { ErrorBoundary } from "@/components";
import { useRouter } from "next/navigation";
import Main from "@/components/UIComponents/Main";
import Input from "@/components/UIComponents/Input";
import ResponseList from "./responses/page";

export default function FormPage({ params }: { params: { formId: number } }) {
    const { formId } = params;
    const { isLoading, error, getForm, updateForm } = useForm();
    const router = useRouter();
    const activeForm = getForm(Number(formId));
    const [isQuestionSectionOpen, setIsQuestionSectionOpen] = useState(true);
    const [titleInput, setTitleInput] = useState<string>("");

    useEffect(() => {
        if (isLoading) return;

        if (!activeForm) {
            router.push("/");
        } else {
            setTitleInput(activeForm.name || "");
        }
    }, [activeForm, isLoading, router]);

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = event.target.value;
        setTitleInput(newTitle);
        if (activeForm) {
            const updatedForm = { ...activeForm, name: newTitle };
            updateForm(activeForm.id, updatedForm);
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
            <Main variant="form">
                <section className="flex w-full flex-col items-center gap-6">
                    <div className="relative flex w-3/4 items-center lg:w-[468px]">
                        <Input
                            variant="form"
                            id="formTitle"
                            autoFocus
                            value={titleInput}
                            onChange={handleTitleChange}
                            type="text"
                            className="pr-8 text-2xl"
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
                            type="button"
                            onClick={() => setIsQuestionSectionOpen(true)}
                            className={`border-b-2 ${isQuestionSectionOpen ? "border-b-primary-white font-bold text-white hover:text-white" : "border-b-transparent hover:text-white/75"}`}
                        >
                            Question
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsQuestionSectionOpen(false)}
                            className={`border-b-2 ${!isQuestionSectionOpen ? "border-b-primary-white font-bold text-white hover:text-white" : "border-b-transparent hover:text-white/75"}`}
                        >
                            Response
                        </button>
                    </div>
                </section>
                {isQuestionSectionOpen ? (
                    <DynamicForm form={activeForm} updateForm={updateForm} />
                ) : (
                    <ResponseList params={{ formId: formId.toString() }} />
                )}
            </Main>
        </ErrorBoundary>
    );
}
