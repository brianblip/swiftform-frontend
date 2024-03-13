// DynamicForm.tsx
"use client";

import { mutate } from "swr";
import { Form, Section } from "@@/types";
import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import SectionComponent from "./Section";
import useForm from "@/contexts/forms";
import Input from "../UIComponents/Input";

type DynamicFormProps = {
    form: Form;
    onSubmit: (formData: any) => void;
    updateForm: (formId: number, updatedForm: Form) => void;
};

export default function DynamicForm({
    form,
    onSubmit,
    updateForm,
}: DynamicFormProps) {
    const [description, setDescription] = useState<string>(
        form.description || "",
    );
    const { createSection, updateSection, deleteSection } = useForm();

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

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const updatedForm = { ...form, description };
        updateForm(form.id, updatedForm);
        onSubmit(updatedForm);
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-lg">
            <Input
                label="Description:"
                type="textarea"
                defaultValue={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            {/* <TextField
                    fullWidth
                    id="description"
                    name="description"
                    label="Description"
                    multiline
                    rows={4}
                    variant="outlined"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                /> */}
            {Array.isArray(form.sections) && form.sections.length > 0 ? (
                form.sections
                    .sort((a, b) => a.id - b.id)
                    .map((section: Section) => (
                        <SectionComponent
                            key={section.id}
                            section={section}
                            updateSection={updateSection}
                            handleDeleteSection={handleDeleteSection}
                        />
                    ))
            ) : (
                <p>No sections found.</p>
            )}

            <button
                onClick={handleCreateSection}
                className="mb-4 rounded bg-primary-secondary px-4 py-2 hover:bg-primary-white/25 disabled:bg-primary-black disabled:text-primary-neutral"
            >
                Add New Section
            </button>

            <button
                type="submit"
                className="rounded bg-primary-white px-4 py-2 text-black hover:bg-primary-white/70 disabled:bg-primary-black disabled:text-primary-neutral"
            >
                Submit
            </button>
        </form>
    );
}
