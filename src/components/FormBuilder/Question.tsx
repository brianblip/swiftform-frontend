import React, { useState } from "react";
import { QuestionType, Choice, Question } from "@@/types";
import useForm from "@/contexts/forms";
import ChoiceComponent from "./Choice";
import { mutate } from "swr";
import Input from "../UIComponents/Input";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import Button from "../UIComponents/Button";

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
            className="relative grid gap-4 rounded border border-white/25 p-4 shadow-md"
        >
            <h1>Question Order: {question.order}</h1>
            <Input
                variant="form"
                label="Question Prompt:"
                id={`Question_Prompt_${question.id}`}
                type="text"
                defaultValue={question.prompt}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleUpdateQuestion(
                        question.id,
                        question.type,
                        e.target.value,
                    )
                }
            />

            <Input
                label="Question Type:"
                id={`Question_Type_${question.id}`}
                type="select"
                variant="formSelect"
                value={question.type}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    handleUpdateQuestion(
                        question.id,
                        e.target.value as QuestionType,
                        question.prompt,
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
                        <Button
                            type="button"
                            variant="add"
                            size="xs"
                            onClick={handleCreateChoice}
                        >
                            <AddIcon />
                        </Button>
                    </div>
                </div>
            )}

            <Button
                variant="exit"
                size="xs"
                onClick={() => handleDeleteQuestion(question.id)}
            >
                <CloseIcon />
            </Button>
        </div>
    );
}
