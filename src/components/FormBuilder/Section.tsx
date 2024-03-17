import React from "react";
import { MenuItem, TextField } from "@mui/material";
import { QuestionType, Section } from "@@/types";
import useForm from "@/contexts/forms";
import { mutate } from "swr";
import QuestionComponent from "@/components/FormBuilder/Question"; // Import the QuestionComponent
import Input from "../UIComponents/Input";
import CloseIcon from "@mui/icons-material/Close";
import Button from "../UIComponents/Button";

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
            className="relative grid gap-4 rounded border border-white/50 px-4 py-6 shadow-md"
        >
            <Input
                variant="form"
                label="Section Title:"
                type="text"
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
                    handleUpdateQuestion={handleUpdateQuestion}
                    handleDeleteQuestion={handleDeleteQuestion}
                />
            ))}
            <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={createNewQuestion}
            >
                Create Question
            </Button>
            <Button
                type="button"
                variant="exit"
                size="xs"
                onClick={() => handleDeleteSection(section.id)}
            >
                <CloseIcon />
            </Button>
        </section>
    );
}
