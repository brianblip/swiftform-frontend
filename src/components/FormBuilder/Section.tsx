import React from "react";
import { Button, MenuItem, TextField } from "@mui/material";
import { QuestionType, Section } from "@@/types";
import useForm from "@/contexts/forms";
import { mutate } from "swr";
import QuestionComponent from "@/components/FormBuilder/Question"; // Import the QuestionComponent
import Input from "../UIComponents/Input";
import CloseIcon from "@mui/icons-material/Close";

type SectionComponentProps = {
    section: Section;
    updateSection: (sectionId: number, value: string) => void;
    handleDeleteSection: (sectionId: number) => void;
};

export default function SectionComponent({
    section,
    updateSection,
    handleDeleteSection,
}: SectionComponentProps) {
    const defaultQuestionType: QuestionType = "multiple_choice";
    const defaultQuestionPrompt: string = "New Question";

    const { createQuestion, deleteQuestion, updateQuestion } = useForm();

    const createNewQuestion = async () => {
        const defaultQuestion = {
            prompt: defaultQuestionPrompt,
            type: defaultQuestionType,
        };

        await createQuestion(
            defaultQuestion.type,
            defaultQuestion.prompt,
            section.id,
            section.questions.length + 1,
            true,
        );

        mutate("/forms");
    };

    const handleDeleteQuestion = async (questionId: number) => {
        await deleteQuestion(questionId);
        mutate("/forms");
    };

    const handleUpdateQuestion = async (
        questionId: number,
        type: QuestionType,
        prompt: string,
    ) => {
        await updateQuestion(questionId, type, prompt, section.id, 0);
        mutate("/forms");
    };

    const sortedQuestions = [...section.questions].sort(
        (a, b) => a.order - b.order,
    );

    return (
        <section
            key={section.id}
            className="relative grid gap-4 rounded border border-white/50 p-4 shadow-md"
        >
            <Input
                label="Section Title:"
                type="text"
                className="w-full rounded bg-primary-secondary px-3 py-2 text-white focus:bg-primary-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                id={`section-title-${section.id}`}
                defaultValue={section.title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    updateSection(section.id, e.target.value)
                }
            />
            {sortedQuestions.map((question) => (
                <QuestionComponent
                    key={question.id}
                    question={question}
                    updateQuestion={handleUpdateQuestion}
                    handleDeleteQuestion={handleDeleteQuestion}
                    sectionId={section.id}
                />
            ))}
            <button
                type="button"
                onClick={createNewQuestion}
                className="rounded bg-primary-white px-4 py-2 text-black hover:bg-primary-white/75"
            >
                Create Question
            </button>
            <button
                type="button"
                onClick={() => handleDeleteSection(section.id)}
                className="absolute right-0 top-0 rounded bg-error hover:bg-error/75"
            >
                <CloseIcon />
            </button>
        </section>
    );
}
