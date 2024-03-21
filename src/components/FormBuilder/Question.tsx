import React, { useEffect, useState, useRef } from "react";
import { QuestionType, QuestionComponentProps, Question } from "@@/types";
import useForm from "@/contexts/forms";
import ChoiceComponent from "./Choice";
import { mutate } from "swr";
import Input from "../UIComponents/Input";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import Button from "../UIComponents/Button";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { CopyAll } from "@mui/icons-material";

export default function QuestionComponent({
    question,
    sectionId,
    sortedQuestions,
    updateQuestion,
    moveQuestionUp,
    moveQuestionDown,
    handleDeleteQuestion,
    handleDuplicateQuestion,
}: QuestionComponentProps) {
    const questionRef = useRef<HTMLDivElement>(null);
    const { createChoice, updateChoice, deleteChoice } = useForm();
    const [newChoiceText, setNewChoiceText] = useState("");

    const sortedChoices = [...question.choices].sort(
        (a, b) => a.order - b.order,
    );

    useEffect(() => {
        if (questionRef.current) {
            const questionElement = questionRef.current;
            const { y } = questionElement.getBoundingClientRect();
            const scrollOffset =
                y - window.innerHeight / 2 + questionElement.offsetHeight / 2;
            window.scrollTo({
                top: window.pageYOffset + scrollOffset,
                behavior: "smooth",
            });
        }
    }, [question.order]);

    const handleCreateChoice = async () => {
        if (newChoiceText.trim()) {
            const newChoice = await createChoice(
                newChoiceText,
                question.id,
                question.choices.length + 1,
            );
            mutate("/forms");
            setNewChoiceText("");
        }
    };

    const handleUpdateChoice = async (
        choiceId: number,
        updatedChoice: string,
        order: number
    ) => {
        await updateChoice(choiceId, updatedChoice, order);
        mutate("/forms");
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
            ref={questionRef}
            className="relative grid gap-4 rounded border border-white/25 p-4 shadow-md"
        >
            <h1>Question #{question.order}:</h1>
            <Input
                variant="form"
                label="Prompt:"
                id={`Question_Prompt_${question.id}`}
                type="text"
                defaultValue={question.prompt}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    updateQuestion(
                        question.id,
                        question.type,
                        e.target.value,
                        sectionId,
                        question.order,
                    )
                }
            />
            <Input
                label="Type:"
                id={`Question_Type_${question.id}`}
                type="select"
                variant="formSelect"
                value={question.type}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    updateQuestion(
                        question.id,
                        e.target.value as QuestionType,
                        question.prompt,
                        sectionId,
                        question.order,
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
                            className="my-1 self-end"
                            size="xs"
                            onClick={handleCreateChoice}
                        >
                            <AddIcon />
                        </Button>
                    </div>
                </div>
            )}
            <div className="absolute right-0 flex">
                <Button
                    type="button"
                    variant="arrows"
                    size="xs"
                    onClick={() => moveQuestionUp(question.id)}
                    disabled={question.order === 1}
                >
                    <ArrowUpwardIcon />
                </Button>
                <Button
                    type="button"
                    variant="arrows"
                    size="xs"
                    onClick={() => moveQuestionDown(question.id)}
                    disabled={question.order === sortedQuestions.length}
                >
                    <ArrowDownwardIcon />
                </Button>
                <Button
                    type="button"
                    variant="copy"
                    size="xs"
                    onClick={() => handleDuplicateQuestion(question.id)}
                >
                    <CopyAll />
                </Button>
                <Button
                    type="button"
                    variant="exit"
                    size="xs"
                    onClick={() => handleDeleteQuestion(question.id)}
                >
                    <CloseIcon />
                </Button>
            </div>
        </div>
    );
}
