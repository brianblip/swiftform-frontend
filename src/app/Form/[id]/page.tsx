"use client"

import { useState, useEffect } from 'react';
import DynamicForm from '@/components/DynamicForm';
import QuestionComponent from '@/components/QuestionComponent';
import ResponseComponent from '@/components/ResponseComponent';

interface FormData {
   title: string;
   description: string;
   fields: {
      question_type: string;
      question: string;
      required_field: boolean;
   }[];
} 

interface FormParams {
   id: string;
}

const fetchFormDataById = async (id: string): Promise<FormData> => {
   try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/${id}`);
      if (!response.ok) {
         throw new Error('Failed to fetch form data');
      }
      const data = await response.json();
      return data.formData;
   } catch (error) {
      console.error('Error fetching form data:', error);
      throw error; // Rethrow to handle in the component
   }
};

export default function Form({ params }: { params: FormParams }) {
   const { id } = params;
   const [isQuestionSectionOpen, setIsQuestionSectionOpen] = useState(true);
   const [formData, setFormData] = useState<DynamicFormData | null>(null);
   const [isLoadingVisible, setLoadingVisible] = useState(true);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const data = await fetchFormDataById(id);
            setFormData(data);
            setLoadingVisible(false);
         } catch (error) {
            setLoadingVisible(false);
            setError('Error loading form data. Please try again.');
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

   const handleFormSubmission = async (formData: DynamicFormData) => {
      console.log('Form data submitted:', formData);
   };

   const mainClassNames = "h-[calc(100vh-57.0667px)] w-screen p-4 pt-16 sm:p-8 sm:pt-16 md:h-screen overflow-scroll";

   if (isLoadingVisible) {
      return <main className={mainClassNames}>Loading...</main>;
   }

   if (error) {
      return <main className={mainClassNames}>Error: {error}</main>;
   }

   const title = formData?.title || 'Loading';

   return (
      <main className={mainClassNames}>
         <div className="flex flex-col items-center gap-y-4 w-full">
            <h1 className="text-3xl font-bold">{title}</h1>

            <div className="flex w-full gap-x-4 border-b border-b-primary-white">
               <button onClick={onClickOpenQuestionSection} className={`border-b-2 ${isQuestionSectionOpen ? 'border-b-primary-white font-bold' : 'border-b-transparent'}`}>
                  Question
               </button>
               <button onClick={onClickOpenResponseSection} className={`border-b-2 ${!isQuestionSectionOpen ? 'border-b-primary-white font-bold' : 'border-b-transparent'}`}>
                  Response
               </button>
            </div>
         </div>

         {/* Conditional rendering based on isQuestionSectionOpen */}
         {isQuestionSectionOpen ? (
            <DynamicForm id={params.id} title={formData?.title} description={formData?.description} fields={formData?.fields} onSubmit={handleFormSubmission} />
         ) : (
            <ResponseComponent />
         )}
      </main>
   );
}
