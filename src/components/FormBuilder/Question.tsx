import React, { useState } from "react";
import { Button, MenuItem, TextField } from "@mui/material";
import { QuestionType, Choice, Question } from "@@/types";
import useForm from "@/contexts/forms";
import ChoiceComponent from "./Choice";
import { mutate } from "swr";

type QuestionComponentProps = {
    question: Question;
    handleUpdateQuestion: (
        questionId: number,
        type: QuestionType,
        prompt: string,
    ) => void;
    handleDeleteQuestion: (questionId: number) => void;
};

export default function QuestionComponent({
    question,
    handleUpdateQuestion,
    handleDeleteQuestion,
}: QuestionComponentProps) {
    const { createChoice, updateChoice, deleteChoice } = useForm();
    const [newChoiceText, setNewChoiceText] = useState("");

    const handleCreateChoice = async () => {
        if (newChoiceText.trim()) {
            const newChoice = await createChoice(
                newChoiceText,
                question.id,
                question.choices.length + 1,
            );
            setNewChoiceText("");
        }
    };

    const sortedChoices = [...question.choices].sort(
        (a, b) => a.order - b.order,
    );

    const handleUpdateChoice = async (
        choiceId: number,
        updatedChoice: string,
    ) => {
        await updateChoice(choiceId, updatedChoice);
    };

    const handleDeleteChoice = async (choiceId: number) => {
        await deleteChoice(choiceId);
        mutate("/forms");
    };

    const questionTypes: QuestionType[] = [
        "textfield",
        "textarea",
        "multiple_choice",
        "checkbox",
        "dropdown",
        "attachment",
        "date",
    ];

    return (
        <div
            key={question.id}
            className="flex flex-col items-start border border-white"
        >
            <div className="mb-4 mr-4">
                <h1>Question ID: {question.id}</h1>
                <h1>Question Order: {question.order}</h1>
                <TextField
                    fullWidth
                    label="Question Prompt"
                    variant="filled"
                    defaultValue={question.prompt}
                    onChange={(e) =>
                        handleUpdateQuestion(
                            question.id,
                            question.type,
                            e.target.value,
                        )
                    }
                />
                <TextField
                    fullWidth
                    select
                    label="Question Type"
                    value={question.type}
                    onChange={(e) =>
                        handleUpdateQuestion(
                            question.id,
                            e.target.value as QuestionType,
                            question.prompt,
                        )
                    }
                    variant="filled"
                    className="mt-2"
                >
                    {questionTypes.map((questionType) => (
                        <MenuItem key={questionType} value={questionType}>
                            {questionType}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
            {["multiple_choice", "checkbox", "dropdown"].includes(
                question.type,
            ) && (
                <div className="flex flex-col items-start">
                    <h2>Choices:</h2>
                    {sortedChoices.map((choice) => (
                        <ChoiceComponent
                            key={choice.id}
                            choice={choice}
                            handleUpdateChoice={handleUpdateChoice}
                            handleDeleteChoice={handleDeleteChoice}
                        />
                    ))}
                    <div className="mt-2 flex items-center">
                        <TextField
                            label="New Choice"
                            variant="filled"
                            value={newChoiceText}
                            onChange={(e) => setNewChoiceText(e.target.value)}
                        />
                        <Button
                            onClick={handleCreateChoice}
                            variant="contained"
                            color="primary"
                            className="ml-2"
                        >
                            Add Choice
                        </Button>
                    </div>
                </div>
            )}
            <Button
                onClick={() => handleDeleteQuestion(question.id)}
                variant="outlined"
                color="secondary"
                className="mt-4"
            >
                Delete Question
            </Button>
        </div>
    );
}
