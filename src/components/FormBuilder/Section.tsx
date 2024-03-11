import React from "react";
import { Button, MenuItem, TextField } from "@mui/material";
import { QuestionType, Section } from "@@/types";
import useForm from "@/contexts/forms";
import { mutate } from "swr";
import QuestionComponent from "@/components/FormBuilder/Question"; // Import the QuestionComponent

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
    const defaultQuestionType: QuestionType = QuestionType.MULTIPLE_CHOICE;
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
        <section key={section.id} className="mb-4">
            <TextField
                fullWidth
                color="info"
                id={`section-title-${section.id}`}
                name={`section-title-${section.id}`}
                label="Section title"
                variant="filled"
                defaultValue={section.title}
                onChange={(e) => updateSection(section.id, e.target.value)}
            />
            {sortedQuestions.map((question) => (
                <QuestionComponent
                    key={question.id}
                    question={question}
                    handleUpdateQuestion={handleUpdateQuestion}
                    handleDeleteQuestion={handleDeleteQuestion}
                />
            ))}
            <div className="mt-4">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={createNewQuestion}
                    className="mt-2"
                >
                    Create Question
                </Button>
            </div>
            <Button
                onClick={() => handleDeleteSection(section.id)}
                variant="outlined"
                color="secondary"
            >
                Delete Section
            </Button>
        </section>
    );
}