import React, { useState } from "react";
import { QuestionType, Choice, Question } from "@@/types";
import useForm from "@/contexts/forms";
import ChoiceComponent from "./Choice";
import { mutate } from "swr";
import Input from "../UIComponents/Input";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";

type QuestionComponentProps = {
    question: Question;
    sectionId: number
    updateQuestion: (
        questionId: number,
        type: QuestionType,
        prompt: string,
        sectionId: number
    ) => void;
    handleDeleteQuestion: (questionId: number) => void;
};

export default function QuestionComponent({
    question,
    sectionId,
    updateQuestion,
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
            className="relative grid gap-4 rounded border border-white/25 p-4 shadow-md"
        >
            <h1>Question Order: {question.order}</h1>
            <Input
                label="Question Prompt:"
                type="text"
                className="w-full rounded bg-primary-secondary px-3 py-2 text-white focus:bg-primary-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue={question.prompt}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    updateQuestion(
                        question.id,
                        question.type,
                        e.target.value,
                        sectionId
                    )
                }
            />
            <Input
                label="Question Type:"
                type="select"
                className="bg-primary-secondary p-2 text-white"
                value={question.type}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    updateQuestion(
                        question.id,
                        e.target.value as QuestionType,
                        question.prompt,
                        sectionId
                    )
                }
            >
                {questionTypes.map((questionType) => (
                    <option
                        className={`w-full font-sans`}
                        key={questionType}
                        value={questionType}
                    >
                        {questionType}
                    </option>
                ))}
            </Input>
            {["multiple_choice", "checkbox", "dropdown"].includes(
                question.type,
            ) && (
                <div className="grid gap-4 rounded bg-primary-secondary p-4 shadow-2xl">
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
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>,
                            ) => setNewChoiceText(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={handleCreateChoice}
                            className="rounded bg-lime-700 p-1 hover:bg-lime-700/75"
                        >
                            <AddIcon />
                        </button>
                    </div>
                </div>
            )}

            <button
                type="button"
                onClick={() => handleDeleteQuestion(question.id)}
                className="absolute right-0 top-0 rounded bg-error hover:bg-error/75"
            >
                <CloseIcon />
            </button>
        </div>
    );
}
