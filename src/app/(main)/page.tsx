"use client";

import useForm from "@/contexts/singleForm";
import useAuth from "@/contexts/auth";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import SuggestionButton from "@/components/SuggestionButton";
import { Form } from "@@/types";
import { CreateFormData } from "@/contexts/singleForm";
import useSWR from "swr";
import { fetcher } from "@/utils";
import ErrorBoundary from "@/components/ErrorBoundary";
import { Form as FormType } from "@@/types";
import api from "@/services/api";
import { createForm, CreateFormOptions } from "@/services";
import Modal from "@/components/Modal";
import { Input, Button } from "@/components";
import SuggestionButton from "@/components/SuggestionButton";
import { useForm } from "react-hook-form";

export default function Home() {
    const [isCreatingForm, setIsCreatingForm] = useState(false);
    const router = useRouter();
    const [createFormModalOpened, setCreateFormModalOpened] = useState(false);

    const {
        register: createFormRegister,
        handleSubmit: createFormHandleSubmit,
        formState: { errors: createFormErrors },
    } = useForm<CreateFormOptions>();

    const {
        data: forms,
        isLoading: isFormsLoading,
        error: formsError,
    } = useSWR<FormType[]>(`/forms`, fetcher);

    const handleCreateForm = createFormHandleSubmit(async (data) => {
        console.log(data);
        return;
        try {
            setIsCreatingForm(true);
        } catch (e) {
            alert(e);
        } finally {
            setIsCreatingForm(false);
        }
    });

    return (
        <ErrorBoundary isLoading={isFormsLoading} error={formsError}>
            <main className="grid h-[calc(100dvh-57.0667px)] w-dvw place-items-center p-4 sm:p-8 md:h-dvh">
                <div className="flex w-full flex-col items-center gap-y-4 md:gap-y-6">
                    <h1 className="text-3xl font-bold md:text-4xl">Forms</h1>
                    <div className="flex w-full flex-col items-center gap-y-6 md:gap-y-9 lg:w-[720px] xl:w-[820px]">
                        <div className="grid w-11/12 grid-cols-2 gap-x-2 gap-y-4">
                            <SuggestionButton />
                            <SuggestionButton />
                            <SuggestionButton />
                            <SuggestionButton />
                        </div>
                        <button
                            onClick={() => setCreateFormModalOpened(true)}
                            // onClick={handleCreateForm}
                            className="w-full bg-primary-white px-2 py-3 text-primary-black"
                            // disabled={isCreatingForm}
                        >
                            {isCreatingForm ? "Creating..." : "Create new form"}
                        </button>
                    </div>
                </div>

                <Modal
                    open={createFormModalOpened}
                    onClose={() => setCreateFormModalOpened(false)}
                >
                    <form onSubmit={handleCreateForm}>
                        <Modal.Title>Create Form</Modal.Title>
                        <Modal.Section>
                            <Input
                                label="Form Name"
                                required
                                {...createFormRegister("name", {
                                    required: "Name is required",
                                })}
                                error={createFormErrors.name?.message}
                            />

                            <Input
                                label="Description"
                                sx={{
                                    mt: 4,
                                }}
                                {...createFormRegister("description")}
                                error={createFormErrors.description?.message}
                            />
                        </Modal.Section>
                        <Modal.Footer>
                            <Button type="submit" disabled={isCreatingForm}>
                                Create a Form
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </main>
        </ErrorBoundary>
    );
}

interface FormProps {
    form: FormType;
}

function Form({ form }: FormProps) {
    return (
        <button className="bg-primary-secondary px-2 py-3">
            <h1 className="font-semibold">{form.name}</h1>
            <p>{form.description || "No description"}</p>
        </button>
    );
}
