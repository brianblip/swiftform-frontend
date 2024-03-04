"use client";

import { mutate } from "swr";
import { Section } from "@@/types";
import React, { useState } from "react";
import useSections from "@/contexts/formSection";
import { Button, TextField } from "@mui/material";
import useForm, { FormContext } from "@/contexts/singleForm";

type DynamicFormProps = {
    id: number;
    user_id: number;
    title: string | undefined;
    sections: Section[];
    titleInput: string;
    description: string;
    onSubmit: (formData: any) => void;
};

export default function DynamicForm({
    id,
    user_id,
    title,
    sections,
    titleInput,
    description,
    onSubmit,
}: DynamicFormProps) {
    const [formData, setFormData] = useState<any>({});
    const { createSection } = useSections();
    const { fetchForm } = useForm(id);

    const handleChange = (fieldId: string, value: string) => {
        setFormData((prevData: any) => ({
            ...prevData,
            [fieldId]: value,
        }));
    };

    const handleCreateSection = async () => {
        try {
            const newSection = await createSection("New Section", id);
            console.log("New Section:", newSection);
            mutateNewSection(newSection);
        } catch (error) {
            console.error("Error creating section:", error);
        }
    };

    const mutateNewSection = (newSection: Section) => {
        const updatedSections = [...sections, newSection];
        const updatedFormData = {
            ...formData,
            sections: updatedSections,
        };
        setFormData(updatedFormData);
        fetchForm(id);
        mutate(`/forms/${id}`, updatedFormData, false);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-lg">
            <div className="mb-4">
                <TextField
                    fullWidth
                    id="titleInput"
                    name="titleInput"
                    label="Title"
                    variant="outlined"
                    value={titleInput}
                    onChange={(e) => handleChange("titleInput", e.target.value)}
                />
            </div>
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
                    onChange={(e) => handleChange("description", e.target.value)}
                />
            </div>
            {sections.map((section: Section) => (
                <section key={section.id} className="mb-4">
                    <h2>{section.title}</h2>
                    <p>Form ID: {id}</p>
                    <p>Section FormId:{section.form_id}</p>
                </section>
            ))}
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
