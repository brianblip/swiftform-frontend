"use client";

import { useState, useEffect } from "react";
import RespondentForm from "@/components/AnsweringComponents/RespondentForm";
import ResponseComponent from "@/components/ResponseComponent";
import { Edit } from "@mui/icons-material";
import useUserId from "@/store/useUserId";

interface FormData {
    title: string;
    owner_id: number;
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
        const apiUrl = process.env.NEXT_PUBLIC_FRONTEND_API_URL;
        const response = await fetch(`${apiUrl}/Form/${id}`);
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
    const userId = useUserId();
    const [formData, setFormData] = useState<FormData | null>(null);
    const [isLoadingVisible, setLoadingVisible] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isAuthorized, setIsAuthorized] = useState<boolean>(true); // Add state to track authorization

    // Use titleInput state to manage the input value
    const [titleInput, setTitleInput] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchFormDataById(id);
                setFormData(data);
                setTitleInput(data?.title || ""); // Update titleInput when formData changes
                setLoadingVisible(false);
                setIsAuthorized(data?.owner_id === userId); // Check authorization
            } catch (error) {
                setLoadingVisible(false);
                setError("Error loading form data. Please try again.");
            }
        };

        fetchData();
    }, [id, userId]);

    const handleFormSubmission = async (formData: FormData) => {
        console.log("Form data submitted:", formData);
    };

    // Handle title change
    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitleInput(event.target.value);
    };

    const mainClassNames =
        "h-[calc(100vh-57.0667px)] w-screen p-4 pt-16 sm:p-8 sm:pt-16 md:h-screen overflow-scroll flex flex-col items-center gap-10";

    if (isLoadingVisible) {
        return <main className={mainClassNames}>Loading...</main>;
    }

    if (error) {
        return <main className={mainClassNames}>Error: {error}</main>;
    }

    const title = formData?.title || "Loading";

    if (!isAuthorized) {
        // Check if user is authorized
        return (
            <main className={mainClassNames}>
                You are not authorized to access this form.
            </main>
        );
    }

    return (
        <main className={mainClassNames}>
            <div className="flex w-full flex-col items-center gap-y-4">
                <div className="flex w-full items-center justify-center">
                    <h1>{title}</h1>
                </div>
                <div className="flex w-full gap-x-4 border-b border-b-primary-white">
                    <RespondentForm
                        id={params.id}
                        user_id={userId}
                        owner_id={formData?.owner_id}
                        title={title}
                        description={formData?.description}
                        fields={formData?.fields}
                        onSubmit={handleFormSubmission}
                    />
                </div>
            </div>
        </main>
    );
}
