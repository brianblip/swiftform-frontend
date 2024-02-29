"use client";

import useAuth from "@/contexts/auth";
import { useRouter } from "next/navigation";
import { Form as FormType, ApiResponse } from "@@/types";
import api from "@/services/api";
import { CreateFormOptions } from "@/services";
import Modal from "@/components/Modal";
import { Input, Button } from "@/components";
import SuggestionButton from "@/components/SuggestionButton";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { generateFormJson, createNestedForm } from "@/services";

export default function Home() {
    const [isCreatingForm, setIsCreatingForm] = useState(false);
    const router = useRouter();
    const [createFormModalOpened, setCreateFormModalOpened] = useState(false);
    const [isGeneratingForm, setIsGeneratingForm] = useState(false);

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

            const response = await api.post<ApiResponse<FormType>>(
                `/forms`,
                data,
            );

            const newForm = response.data.data;

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

            const response = await generateFormJson(data.description);
            const generatedFormJson = response.data;

            if (!generatedFormJson) {
                throw new Error("Failed to generate form");
            }

            const nestedFormResponse =
                await createNestedForm(generatedFormJson);

            const newForm = nestedFormResponse.data;

            router.push(`/Form/${newForm?.id}`);
        } catch (e) {
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

                    <form onSubmit={handleGenerateForm}>
                        <Input
                            label="Describe the form you want to generate..."
                            multiline
                            minRows={4}
                            error={generateFormErrors.description?.message}
                            {...generateFormRegister("description", {
                                required:
                                    "Please provide a description for form.",
                            })}
                        />
                        <Button className="mt-4" type="submit">
                            {isGeneratingForm
                                ? "Generating..."
                                : "Generate Form"}
                        </Button>
                    </form>
                </div>
            </div>

            {createFormModalOpened && (
                <section>
                    <div>
                        <button onClick={() => setCreateFormModalOpened(false)}>
                            <CloseIcon />
                        </button>
                        <form onSubmit={handleCreateForm}>
                            <h1>Create Form</h1>
                            <fieldset>
                                <div>
                                    <label htmlFor="form Name">Form Name</label>
                                    <input
                                        id="form Name"
                                        type="text"
                                        {...createFormRegister("name", {
                                            required: "Name is required",
                                        })}
                                    />
                                    {createFormErrors.name && (
                                        <p>
                                            {createFormErrors.name.message}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="Description">
                                        Description
                                    </label>
                                    <input
                                        id="Description"
                                        type="text"
                                        {...createFormRegister("description")}
                                    />
                                </div>
                            </fieldset>
                            <button
                                type="submit"
                                disabled={isCreatingForm}
                            >
                                Create a Form
                            </button>
                        </form>
                    </div>
                </section>
            )}

            {/* <Modal
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
            </Modal> */}
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
