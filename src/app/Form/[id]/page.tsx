"use client";

import { useState, useEffect } from "react";
import DynamicForm from "@/components/DynamicForm";
import QuestionComponent from "@/components/QuestionComponent";
import ResponseComponent from "@/components/ResponseComponent";
import { Edit } from "@mui/icons-material";

interface FormData {
    title: string;
    description: string;
    fields: {
        field_id: number;
        question_name: string;
        question_type: string;
        question: string;
        required_field: boolean;
        choices: string[];
        minimum: number;
        maximum: number;
    }[];
}

interface FormParam {
    id: number;
}

const fetchFormDataById = async (id: number): Promise<FormData> => {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${apiUrl}/${id}`);
        if (!response.ok) {
            throw new Error("Failed to fetch form data");
        }
        const data = await response.json();
        return data.formData;
    } catch (error) {
        console.error("Error fetching form data:", error);
        throw error; // Rethrow to handle in the component
    }
};

export default function Form({ params }: { params: FormParam }) {
    const { id } = params;
    const [isQuestionSectionOpen, setIsQuestionSectionOpen] = useState(true);
    const [formData, setFormData] = useState<FormData | null>(null);
    const [isLoadingVisible, setLoadingVisible] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Use titleInput state to manage the input value
    const [titleInput, setTitleInput] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchFormDataById(id);
                setFormData(data);
                setTitleInput(data?.title || ""); // Update titleInput when formData changes
                setLoadingVisible(false);
            } catch (error) {
                setLoadingVisible(false);
                setError("Error loading form data. Please try again.");
            }
        };

        fetchData();
    }, [id]);

    const onClickOpenQuestionSection = () => {
        setIsQuestionSectionOpen(true);
    };

    const onClickOpenResponseSection = () => {
        setIsQuestionSectionOpen(false);
    };

    const handleFormSubmission = async (formData: FormData) => {
        console.log("Form data submitted:", formData);
    };

    // Handle title change
    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitleInput(event.target.value);
    };

    if (isLoadingVisible) {
        return (
            <main
                className={`flex min-h-[calc(100vh-57.0667px)] w-dvw flex-col gap-8 px-4 py-8`}
            >
                Loading...
            </main>
        );
    }

    if (error) {
        return (
            <main
                className={`flex min-h-[calc(100vh-57.0667px)] w-dvw flex-col gap-8 px-4 py-8`}
            >
                Error: {error}
            </main>
        );
    }

    const title = formData?.title || "Loading";

    return (
        <main
            className={`flex min-h-[calc(100vh-57.0667px)] w-dvw flex-col gap-8 px-4 py-8 sm:items-center sm:px-8 sm:py-12`}
        >
            <div className="flex w-full flex-col items-center gap-y-4">
                <div className="relative flex w-3/4 flex-col items-center justify-center">
                    <input
                        autoFocus
                        value={titleInput}
                        onChange={handleTitleChange}
                        className=" w-full truncate border-none bg-transparent p-2 pr-10 text-center text-2xl"
                    />
                    <Edit className="absolute right-0 mr-2" />
                </div>
                <div className="flex w-full gap-x-4 border-b border-b-primary-white">
                    <button
                        onClick={onClickOpenQuestionSection}
                        className={`border-b-2 ${isQuestionSectionOpen ? "border-b-primary-white font-bold" : "border-b-transparent"}`}
                    >
                        Question
                    </button>
                    <button
                        onClick={onClickOpenResponseSection}
                        className={`border-b-2 ${!isQuestionSectionOpen ? "border-b-primary-white font-bold" : "border-b-transparent"}`}
                    >
                        Response
                    </button>
                </div>
            </div>

            {/* Conditional rendering based on isQuestionSectionOpen */}
            {isQuestionSectionOpen ? (
                <DynamicForm
                    id={params.id}
                    title={title}
                    titleInput={titleInput}
                    description={formData?.description}
                    fields={formData?.fields}
                    onSubmit={handleFormSubmission}
                />
            ) : (
                <ResponseComponent />
            )}
        </main>
    );
}
