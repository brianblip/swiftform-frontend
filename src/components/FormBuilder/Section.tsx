import React, { useState, useEffect, useRef } from "react";
import { MenuItem, TextField } from "@mui/material";
import { Question, QuestionType, Section, SectionComponentProps } from "@@/types";
import useForm from "@/contexts/forms";
import { mutate } from "swr";
import QuestionComponent from "@/components/FormBuilder/Question";
import Input from "../UIComponents/Input";
import CloseIcon from "@mui/icons-material/Close";
import Button from "../UIComponents/Button";
import { CopyAll } from "@mui/icons-material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

export default function SectionComponent({
    section,
    sortedSections,
    updateSection,
    moveSectionUp,
    moveSectionDown,
    handleDeleteSection,
    handleDuplicateSection,
}: SectionComponentProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const defaultQuestionType: QuestionType = "multiple_choice";
    const defaultQuestionPrompt: string = "New Question";

    const [sortedQuestions, setSortedQuestions] = useState<Question[]>([]);

    useEffect(() => {
        setSortedQuestions(
            [...section.questions].sort((a, b) => a.order - b.order),
        );
    }, [section.questions]);

    const { createQuestion, deleteQuestion, updateQuestion, createChoice } =
        useForm();

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

        mutate("/forms"); // Update cache
    };

    const handleUpdateQuestion = async (
        questionId: number,
        type: QuestionType,
        prompt: string,
        sectionId: number,
        questionOrder: number,
    ) => {
        await updateQuestion(
            questionId,
            type,
            prompt,
            section.id,
            questionOrder,
        );
        mutate("/forms"); // This should trigger a re-fetch of forms data
    };

    const moveQuestionUp = (questionId: number) => {
        const updatedQuestions = [...sortedQuestions];
        const questionIndex = updatedQuestions.findIndex(
            (q) => q.id === questionId,
        );
    
        if (questionIndex > 0) {
            const prevQuestion = updatedQuestions[questionIndex - 1];
            const currentQuestion = updatedQuestions[questionIndex];
    
            prevQuestion.order = currentQuestion.order;
            currentQuestion.order = prevQuestion.order - 1;
    
            updateMultipleQuestions(updatedQuestions);
            scrollToQuestion(questionId);
        }
    };
    
    const moveQuestionDown = (questionId: number) => {
        const updatedQuestions = [...sortedQuestions];
        const questionIndex = updatedQuestions.findIndex(
            (q) => q.id === questionId,
        );
    
        if (questionIndex < updatedQuestions.length - 1) {
            const nextQuestion = updatedQuestions[questionIndex + 1];
            const currentQuestion = updatedQuestions[questionIndex];
    
            nextQuestion.order = currentQuestion.order;
            currentQuestion.order = nextQuestion.order + 1;
    
            updateMultipleQuestions(updatedQuestions);
            scrollToQuestion(questionId);
        }
    };
    
    const scrollToQuestion = (questionId: number) => {
        const questionElement = document.getElementById(`question_${questionId}`);
        if (questionElement) {
            const { y } = questionElement.getBoundingClientRect();
            const scrollOffset =
                y - window.innerHeight / 2 + questionElement.offsetHeight / 2;
            window.scrollTo({
                top: window.pageYOffset + scrollOffset,
                behavior: "smooth",
            });
        }
    };
    
    const handleDuplicateQuestion = async (questionId: number) => {
        try {
            const questionToDuplicate = section.questions.find(
                (question) => question.id === questionId,
            );

            if (!questionToDuplicate) {
                console.error(`Question with ID ${questionId} not found`);
                return;
            }

            const newQuestion = await createQuestion(
                questionToDuplicate.type,
                questionToDuplicate.prompt,
                section.id,
                section.questions.length + 1,
                questionToDuplicate.is_required,
            );

            for (const choice of questionToDuplicate.choices) {
                await createChoice(choice.text, newQuestion.id, choice.order);
                mutate("/forms");
            }

            const updatedQuestions = [
                ...sortedQuestions,
                { ...newQuestion, choices: [...questionToDuplicate.choices] },
            ];

            updateMultipleQuestions(updatedQuestions);

            if (newQuestion.id) {
                const questionElement = document.getElementById(
                    `question_${newQuestion.id}`,
                );
                if (questionElement) {
                    const { y } = questionElement.getBoundingClientRect();
                    const scrollOffset =
                        y -
                        window.innerHeight / 2 +
                        questionElement.offsetHeight / 2;
                    window.scrollTo({
                        top: window.pageYOffset + scrollOffset,
                        behavior: "smooth",
                    });
                }
            }
        } catch (error) {
            console.error("Error duplicating question:", error);
        }
    };

    const updateMultipleQuestions = async (updatedQuestions: Question[]) => {
        const promises = updatedQuestions.map((question) => {
            return updateQuestion(
                question.id,
                question.type,
                question.prompt,
                section.id,
                question.order,
                question.is_required,
            );
        });

        await Promise.all(promises);
        mutate("/forms");
        setSortedQuestions(updatedQuestions.sort((a, b) => a.order - b.order));
    };

    const handleDeleteQuestion = async (questionId: number) => {
        await deleteQuestion(questionId);
        mutate("/forms");
    };

    return (
        <section
            key={section.id}
            ref={sectionRef}
            className="relative grid gap-4 rounded border border-white/50 px-4 py-6 shadow-md"
        >
            <p>Section #{section.order}</p>
            <Input
                variant="form"
                label="Section Title:"
                type="text"
                id={`section-title-${section.id}`}
                defaultValue={section.title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    updateSection(section.id, e.target.value, section.order)
                }
            />
            {sortedQuestions.map((question) => (
                <QuestionComponent
                    key={question.id}
                    question={question}
                    sectionId={section.id}
                    sortedQuestions={sortedQuestions}
                    updateQuestion={handleUpdateQuestion}
                    handleDeleteQuestion={handleDeleteQuestion}
                    moveQuestionUp={moveQuestionUp}
                    moveQuestionDown={moveQuestionDown}
                    handleDuplicateQuestion={handleDuplicateQuestion}
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
            <div className="flex justify-end gap-2">
                <Button
                    type="button"
                    variant="secondary"
                    size="xs"
                    onClick={() => moveSectionUp(section.id)}
                    disabled={section.order === 1}
                >
                    <ArrowUpwardIcon />
                </Button>
                <Button
                    type="button"
                    variant="secondary"
                    size="xs"
                    onClick={() => moveSectionDown(section.id)}
                    disabled={section.order === sortedSections.length}
                >
                    <ArrowDownwardIcon />
                </Button>
            </div>
            <Button
                type="button"
                variant="copy"
                size="xs"
                onClick={() => handleDuplicateSection(section.id)}
            >
                <CopyAll />
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
