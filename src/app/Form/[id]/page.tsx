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
    question_name: string;
    question_type: string;
    question: string;
    choices: string[]; // Choices should be an array of strings
    required_field: boolean;
  }[];
}

interface FormParam {
  id: string;
}

const fetchFormDataById = async (id: string): Promise<FormData> => {
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

  const mainClassNames =
    "h-[calc(100vh-57.0667px)] w-screen p-4 pt-16 sm:p-8 sm:pt-16 md:h-screen overflow-scroll flex flex-col items-center gap-10";

  if (isLoadingVisible) {
    return <main className={mainClassNames}>Loading...</main>;
  }

  if (error) {
    return <main className={mainClassNames}>Error: {error}</main>;
  }

  const title = formData?.title || "Loading";

  return (
    <main className={mainClassNames}>
      <div className="flex flex-col items-center w-full gap-y-4">
        <div className="flex items-center justify-center w-full">
          <input
            autoFocus
            value={titleInput}
            onChange={handleTitleChange}
            className="w-1/4 p-2 text-3xl text-center bg-transparent border-none"
          />
          <Edit className="text-3xl" />
        </div>
        <div className="flex w-full border-b gap-x-4 border-b-primary-white">
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
          title={titleInput} // Pass the modified title to DynamicForm
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
