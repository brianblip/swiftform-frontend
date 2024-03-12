"use client";

import useAuth from "@/contexts/auth";
import { useRouter } from "next/navigation";
import { Form as FormType } from "@@/types";
import { CreateFormOptions } from "@/services";
import Modal from "@/components/Modal";
import Input from "@/components/UIComponents/Input";
import SuggestionButton from "@/components/SuggestionButton";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { generateFormJson, createNestedForm } from "@/services";
import { AxiosError } from "axios";
import useFormData from "@/contexts/forms";
import { useSWRConfig } from "swr";

export default function Home() {
    const [isCreatingForm, setIsCreatingForm] = useState(false);
    const router = useRouter();
    const [createFormModalOpened, setCreateFormModalOpened] = useState(false);
    const [isGeneratingForm, setIsGeneratingForm] = useState(false);
    const { mutate } = useSWRConfig();

    const { createForm } = useFormData();

    const {
        register: generateFormRegister,
        handleSubmit: generateFormHandleSubmit,
        formState: { errors: generateFormErrors },
    } = useForm<{ description: string }>();

    const {
        register: createFormRegister,
        handleSubmit: createFormHandleSubmit,
        formState: { errors: createFormErrors },
    } = useForm<CreateFormOptions>();

    const handleCreateForm = createFormHandleSubmit(async (data) => {
        try {
            setIsCreatingForm(true);

            const newForm = await createForm(data);

            router.push(`/Form/${newForm?.id}`);
        } catch (e) {
            alert(e);
        } finally {
            setIsCreatingForm(false);
        }
    });

    const handleGenerateForm = generateFormHandleSubmit(async (data) => {
        try {
            setIsGeneratingForm(true);

            // todo: add generate form to context instead
            const response = await generateFormJson(data.description);
            const generatedFormJson = response.data;

            if (!generatedFormJson) {
                throw new Error("Failed to generate form");
            }

            const nestedFormResponse =
                await createNestedForm(generatedFormJson);

            const newForm = nestedFormResponse.data;

            await mutate("/forms");

            router.push(`/Form/${newForm?.id}`);
        } catch (e) {
            if (e instanceof AxiosError) {
                return alert(e.response?.data.message || e.message);
            }
            alert(e);
        } finally {
            setIsGeneratingForm(false);
        }
    });

    return (
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
                        className="w-full bg-primary-white px-2 py-3 text-primary-black"
                    >
                        Create new form
                    </button>

                    <form
                        className="grid w-full gap-6"
                        onSubmit={handleGenerateForm}
                    >
                        <Input
                            label="Describe the form you want to generate..."
                            type="textarea"
                            error={generateFormErrors.description?.message}
                            {...generateFormRegister("description", {
                                required:
                                    "Please provide a description for form.",
                            })}
                        />
                        <button
                            className="rounded bg-primary-secondary px-5 py-3 disabled:bg-primary-black disabled:text-primary-secondary"
                            type="submit"
                            disabled={isGeneratingForm}
                        >
                            {isGeneratingForm
                                ? "Generating..."
                                : "Generate Form"}
                        </button>
                    </form>
                </div>
            </div>
            <Modal
                createFormModalOpened={createFormModalOpened}
                setCreateFormModalOpened={setCreateFormModalOpened}
            >
                <form className="grid gap-4" onSubmit={handleCreateForm}>
                    <h1 className="text-xl font-bold">Create Form</h1>
                    <fieldset className="grid gap-2">
                        <Input
                            label="Form Name"
                            required
                            type="text"
                            {...createFormRegister("name", {
                                required: "Name is required",
                            })}
                            error={createFormErrors.name?.message}
                        />
                        <Input
                            label="Description"
                            type="text"
                            {...createFormRegister("description")}
                            error={createFormErrors.description?.message}
                        />
                    </fieldset>
                    <button
                        className="rounded bg-primary-neutral px-5 py-3 disabled:bg-primary-black disabled:text-primary-neutral"
                        type="submit"
                        disabled={isCreatingForm}
                    >
                        {isCreatingForm ? "Creating..." : "Create a Form"}
                    </button>
                </form>
            </Modal>
        </main>
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
