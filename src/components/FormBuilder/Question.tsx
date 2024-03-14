import React, { useState } from "react";
import { Button, MenuItem, TextField } from "@mui/material";
import { QuestionType, Choice, Question } from "@@/types";
import useForm from "@/contexts/forms";
import ChoiceComponent from "./Choice";
import { mutate } from "swr";
import Input from "../UIComponents/Input";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";

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

    return (
        <div
            key={question.id}
            className="relative grid gap-4 rounded border border-white/25 p-4 shadow-md"
        >
            {/* <h1>Question ID: {question.id}</h1> */}
            <h1>Question Order: {question.order}</h1>
            <Input
                label="Question Prompt:"
                type="text"
                className="w-full rounded bg-primary-secondary px-3 py-2 text-white focus:bg-primary-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue={question.prompt}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleUpdateQuestion(
                        question.id,
                        question.type,
                        e.target.value,
                    )
                }
            />
            {/* <TextField
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
                /> */}
            <div className="grid gap-2">
                <Input
                    label="Question Type:"
                    type="select"
                    className="bg-primary-secondary p-2 text-white"
                    defaultValue={question.type}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        handleUpdateQuestion(
                            question.id,
                            e.target.value as QuestionType,
                            question.prompt,
                        )
                    }
                >
                    {Object.values(QuestionType).map((type) => (
                        <option
                            className={`w-full font-sans`}
                            key={type}
                            value={type}
                        >
                            {type}
                        </option>
                    ))}
                </Input>
                {/* <TextField
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
                    </TextField> */}
                {[
                    QuestionType.MULTIPLE_CHOICE,
                    QuestionType.CHECKBOX,
                    QuestionType.DROPDOWN,
                ].includes(question.type) && (
                    <div className="grid gap-4 rounded bg-primary-secondary p-4 shadow-2xl">
                        {/* <h2>Choices:</h2> */}
                        {sortedChoices.map((choice) => (
                            <ChoiceComponent
                                key={choice.id}
                                choice={choice}
                                handleUpdateChoice={handleUpdateChoice}
                                handleDeleteChoice={handleDeleteChoice}
                            />
                        ))}
                        <div className="flex items-center gap-3">
                            <Input
                                label="New Choice:"
                                type="text"
                                value={newChoiceText}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setNewChoiceText(e.target.value)
                                }
                            />
                            {/* <TextField
                                label="New Choice"
                                variant="filled"
                                value={newChoiceText}
                                onChange={(e) => setNewChoiceText(e.target.value)}
                            /> */}
                            <button
                                onClick={handleCreateChoice}
                                className="rounded bg-lime-700 p-1 hover:bg-lime-700/75"
                            >
                                <AddIcon />
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <button
                onClick={() => handleDeleteQuestion(question.id)}
                className="absolute right-0 top-0 rounded bg-error hover:bg-error/75"
            >
                <CloseIcon />
            </button>
        </div>
    );
}
