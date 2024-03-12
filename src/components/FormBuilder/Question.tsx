import React from "react";
import { Button, MenuItem, TextField } from "@mui/material";
import { Question, QuestionType } from "@@/types";

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
    return (
        <div key={question.id} className="flex items-center">
            <div className="mr-4">
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
                    {Object.values(QuestionType).map((type) => (
                        <MenuItem key={type} value={type}>
                            {type}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
            <Button
                onClick={() => handleDeleteQuestion(question.id)}
                variant="outlined"
                color="secondary"
            >
                Delete Question
            </Button>
        </div>
    );
}
