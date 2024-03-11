// DynamicForm.tsx
"use client";

import { mutate } from "swr";
import { Form, Section } from "@@/types";
import React, { useState, useEffect } from "react";
import useSections from "@/contexts/sections";
import { Button, TextField } from "@mui/material";
import SectionComponent from "./Section"; // Import the SectionComponent
import { QuestionProvider } from "@/contexts/questions";

type DynamicFormProps = {
    form: Form;
    user_id: number;
    onSubmit: (formData: any) => void;
    updateForm: (formId: number, updatedForm: Form) => void;
};

export default function DynamicForm({
    form,
    user_id,
    onSubmit,
    updateForm,
}: DynamicFormProps) {
    const [description, setDescription] = useState<string>(
        form.description || "",
    );
    const { createSection, updateSection, deleteSection } = useSections();

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
            <div className="mb-4">
                <TextField
                    fullWidth
                    id="description"
                    name="description"
                    label="Description"
                    multiline
                    rows={4}
                    variant="outlined"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <QuestionProvider>
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
            </QuestionProvider>
            <Button
                onClick={handleCreateSection}
                variant="contained"
                color="primary"
                className="mb-4"
            >
                Add New Section
            </Button>

            <Button type="submit" variant="contained" color="primary">
                Submit
            </Button>
        </form>
    );
}
