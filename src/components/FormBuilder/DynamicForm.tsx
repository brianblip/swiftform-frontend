// DynamicForm.tsx
"use client";

import { mutate } from "swr";
import { Form, Section } from "@@/types";
import React, { useState, useEffect } from "react";
import SectionComponent from "./Section";
import useForm, { FormState } from "@/contexts/forms";
import Input from "../UIComponents/Input";
import { toast } from "react-toastify";
import { handleApiError } from "@/utils";
import Button from "../UIComponents/Button";
import { useRouter } from "next/navigation";

type DynamicFormProps = {
    form: Form;
    updateForm: FormState["updateForm"];
};

export default function DynamicForm({ form, updateForm }: DynamicFormProps) {
    const [description, setDescription] = useState<string>(
        form.description || "",
    );
    const router = useRouter();
    const {
        createSection,
        updateSection,
        deleteSection,
        createQuestion,
        createChoice,
    } = useForm();
    const [isUpdatingForm, setIsUpdatingForm] = useState(false);

    useEffect(() => {
        setDescription(form.description || "");
    }, [form.description]);

    const handleCreateSection = async () => {
        try {
            await createSection("New Section", form.id);
            mutate("/forms");
        } catch (error) {
            console.error("Error creating section:", error);
        }
    };

    const handleDeleteSection = async (sectionId: number) => {
        try {
            await deleteSection(sectionId);
            mutate("/forms");
        } catch (error) {
            console.error("Error deleting section:", error);
        }
    };

    const handleDuplicateSection = async (sectionId: number) => {
        try {
            const sectionToDuplicate = form.sections.find(
                (section) => section.id === sectionId,
            );

            if (!sectionToDuplicate) {
                console.error(`Section with ID ${sectionId} not found`);
                return;
            }

            const newSection = await createSection(
                sectionToDuplicate.title,
                form.id,
            );

            for (const question of sectionToDuplicate.questions) {
                const newQuestion = await createQuestion(
                    question.type,
                    question.prompt,
                    newSection.id,
                    question.order,
                    question.is_required,
                );

                for (const choice of question.choices) {
                    await createChoice(
                        choice.text,
                        newQuestion.id,
                        choice.order,
                    );
                }
            }

            mutate("/forms");
        } catch (error) {
            console.error("Error duplicating section:", error);
        }
    };

    const handleNavigateSharedForm = () => {
        router.push(`/Form/${form.id}/shared`);
    };
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            setIsUpdatingForm(true);
            const updatedForm = { ...form, description };
            await updateForm(form.id, updatedForm);
            toast.success("Saved changes.");
        } catch (e) {
            handleApiError(e);
        } finally {
            setIsUpdatingForm(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="grid w-full gap-4 sm:w-11/12 lg:w-9/12 xl:w-[660px]"
        >
            <Input
                variant="textarea"
                label="Description:"
                type="textarea"
                defaultValue={description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setDescription(e.target.value)
                }
            />
            {Array.isArray(form.sections) && form.sections.length > 0 ? (
                form.sections
                    .sort((a, b) => a.id - b.id)
                    .map((section: Section) => (
                        <SectionComponent
                            key={section.id}
                            section={section}
                            updateSection={updateSection}
                            handleDeleteSection={handleDeleteSection}
                            handleDuplicateSection={handleDuplicateSection}
                        />
                    ))
            ) : (
                <p>No sections found.</p>
            )}

            <Button
                type="button"
                className="mb-4"
                onClick={handleCreateSection}
            >
                Add New Section
            </Button>

            <Button type="submit" variant="secondary" className="mb-10">
                {isUpdatingForm ? "Saving..." : "Save Changes"}
            </Button>

            <Button
                type="button"
                variant="secondary"
                className="mb-10"
                onClick={handleNavigateSharedForm}
            >
                Share
            </Button>
        </form>
    );
}
