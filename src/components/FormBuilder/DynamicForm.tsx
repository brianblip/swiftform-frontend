"use client";

import { mutate } from "swr";
import { toast } from "react-toastify";
import useForm from "@/contexts/forms";
import { handleApiError } from "@/utils";
import SectionComponent from "./Section";
import Input from "../UIComponents/Input";
import Button from "../UIComponents/Button";
import { usePathname } from "next/navigation";
import { Form, Section, FormState } from "@@/types";
import React, { useState, useEffect, useRef } from "react";

type DynamicFormProps = {
    form: Form;
    updateForm: FormState["updateForm"];
};

export default function DynamicForm({ form, updateForm }: DynamicFormProps) {
    const pathname = usePathname();
    const formRef = useRef<HTMLFormElement>(null);
    const [description, setDescription] = useState<string>(
        form.description || "",
    );
    const {
        createSection,
        updateSection,
        deleteSection,
        createQuestion,
        createChoice,
    } = useForm();
    const [isUpdatingForm, setIsUpdatingForm] = useState(false);
    const [sortedSections, setSortedSections] = useState<Section[]>([]);

    useEffect(() => {
        setSortedSections([...form.sections].sort((a, b) => a.order - b.order));
    }, [form.sections]);

    useEffect(() => {
        setDescription(form.description || "");
    }, [form.description]);

    const handleCreateSection = async () => {
        try {
            await createSection(
                "New Section",
                form.id,
                form.sections.length + 1,
            );
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
                form.sections.length + 1,
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

    const updateSortedSections = (updatedSections: Section[]) => {
        setSortedSections(updatedSections.sort((a, b) => a.order - b.order));
    };

    const moveSectionUp = (sectionId: number) => {
        const updatedSections = [...sortedSections];
        const sectionIndex = updatedSections.findIndex(
            (q) => q.id === sectionId,
        );

        if (sectionIndex > 0) {
            const prevSection = updatedSections[sectionIndex - 1];
            const currentSection = updatedSections[sectionIndex];

            prevSection.order = currentSection.order;
            currentSection.order = prevSection.order - 1;

            updateMultipleSections(updatedSections, updateSortedSections);
            scrollToSection(sectionId);
        }
    };

    const moveSectionDown = (sectionId: number) => {
        const updatedSections = [...sortedSections];
        const sectionIndex = updatedSections.findIndex(
            (q) => q.id === sectionId,
        );

        if (sectionIndex < updatedSections.length - 1) {
            const nextSection = updatedSections[sectionIndex + 1];
            const currentSection = updatedSections[sectionIndex];

            nextSection.order = currentSection.order;
            currentSection.order = nextSection.order + 1;

            updateMultipleSections(updatedSections, updateSortedSections);
            scrollToSection(sectionId);
        }
    };

    const scrollToSection = (sectionId: number) => {
        const sectionElement = document.getElementById(`section_${sectionId}`);
        if (sectionElement && formRef.current) {
            const { y } = sectionElement.getBoundingClientRect();
            const scrollOffset =
                y -
                formRef.current.offsetHeight / 2 +
                sectionElement.offsetHeight / 2;
            window.scrollTo({
                top: window.pageYOffset + scrollOffset,
                behavior: "smooth",
            });
        }
    };

    const updateMultipleSections = async (
        updatedSections: Section[],
        updateSortedSections: (updatedSections: Section[]) => void,
    ) => {
        const promises = updatedSections.map((section) => {
            return updateSection(section.id, section.title, section.order);
        });

        await Promise.all(promises);
        mutate("/forms");
        updateSortedSections(updatedSections.sort((a, b) => a.order - b.order));
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

    const handleShareForm = () => {
        const shareLink = `https://swiftform.boomtech.co${pathname}/shared`;
        navigator.clipboard.writeText(shareLink);
        toast.success("Copied form link to clipboard!");
    };

    return (
        <form
            onSubmit={handleSubmit}
            ref={formRef}
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
            {sortedSections.length ? (
                sortedSections.map((section: Section) => (
                    <SectionComponent
                        key={section.id}
                        section={section}
                        sortedSections={sortedSections}
                        updateSection={updateSection}
                        moveSectionUp={moveSectionUp}
                        moveSectionDown={moveSectionDown}
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

            <Button
                disabled={isUpdatingForm}
                type="submit"
                variant="secondary"
                className="mb-10"
            >
                {isUpdatingForm ? "Saving..." : "Save Changes"}
            </Button>

            <Button type="button" className="mb-4" onClick={handleShareForm}>
                Share Form to Respondents
            </Button>
        </form>
    );
}
