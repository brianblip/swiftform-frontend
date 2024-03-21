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
import Button from "@/components/UIComponents/Button";
import Main from "@/components/UIComponents/Main";
import LoadingPage from "@/components/LoadingPage";
import { toast } from "react-toastify";

const TEMPLATES = [
    {
        title: "Event Registration Form",
        subtitle:
            "A user-friendly template for registering for events, featuring fields for personal info, preferences, and payments. Ideal for any event type.",
    },
    {
        title: "Customer Feedback",
        subtitle:
            "Designed to collect customer feedback efficiently, with sections for ratings, open-ended questions, and contact details.",
    },
    {
        title: "Employment Application Form",
        subtitle:
            "Simplifies the job application process with sections for personal details, qualifications, and experience. Customizable for any role.",
    },
    {
        title: "Efficient Service Request",
        subtitle:
            "Streamlines service requests with fields for customer information, service details, and urgency level. Perfect for service-based businesses.",
    },
];

export default function Home() {
    const [isCreatingForm, setIsCreatingForm] = useState(false);
    const router = useRouter();
    const [createFormModalOpened, setCreateFormModalOpened] = useState(false);
    const [isGeneratingForm, setIsGeneratingForm] = useState(false);
    const { mutate } = useSWRConfig();
    const { user } = useAuth();
    // let nameArray = user?.name.split("") as string[];
    // nameArray[0] = nameArray[0].toUpperCase();
    // let joinedName = nameArray.join("");

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
                return toast.error(e.response?.data.message || e.message);
            }
            toast.error("An unknown error occured");
        } finally {
            setIsGeneratingForm(false);
        }
    });

    const handleGenerateTemplate = async (formDescription: string) => {
        try {
            const response = await generateFormJson(formDescription);
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
                return toast.error(e.response?.data.message || e.message);
            }
            toast.error("An unknown error occured");
        }
    };

    if (!user)
        return (
            <div className="container flex flex-col items-center justify-center">
                <LoadingPage />
            </div>
        );

    return (
        <Main>
            <div className="flex w-full flex-col items-center gap-y-4">
                <h1 className="text-center text-2xl font-bold md:text-3xl">
                    Hello {user.name}, let&lsquo;s create your form
                </h1>
                <div className="flex w-full flex-col gap-y-8 lg:w-[720px] xl:w-[820px]">
                    <section className="flex w-full flex-col items-center gap-4">
                        <div className="grid w-11/12 grid-cols-2 gap-x-2 gap-y-4">
                            {TEMPLATES.map((template, index) => (
                                <SuggestionButton
                                    key={index}
                                    title={template.title}
                                    subtitle={template.subtitle}
                                    onClick={() =>
                                        handleGenerateTemplate(
                                            `${template.title} - ${template.subtitle}`,
                                        )
                                    }
                                />
                            ))}
                        </div>
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => setCreateFormModalOpened(true)}
                        >
                            Create new form
                        </Button>
                    </section>

                    <form
                        className="grid w-full gap-4"
                        onSubmit={handleGenerateForm}
                    >
                        <Input
                            label="Describe the form you want to generate..."
                            variant="textarea"
                            type="textarea"
                            error={generateFormErrors.description?.message}
                            {...generateFormRegister("description", {
                                required:
                                    "Please provide a description for form.",
                            })}
                        />
                        <Button type="submit" disabled={isGeneratingForm}>
                            {isGeneratingForm
                                ? "Generating..."
                                : "Generate Form"}
                        </Button>
                    </form>
                </div>
            </div>
            <Modal
                createFormModalOpened={createFormModalOpened}
                setCreateFormModalOpened={setCreateFormModalOpened}
            >
                <form className="grid w-full gap-4" onSubmit={handleCreateForm}>
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
                    <Button
                        variant="modal"
                        type="submit"
                        disabled={isCreatingForm}
                    >
                        {isCreatingForm ? "Creating..." : "Create a Form"}
                    </Button>
                </form>
            </Modal>
        </Main>
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
