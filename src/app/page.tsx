"use client"

import Link from "next/link";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SuggestionButton from "@/components/SuggestionButton";

export default function Home() {
   const [isLoadingVisible, setLoadingVisible] = useState(false);
   const router = useRouter();

   const handleCreateForm = async () => {
      setLoadingVisible(true);

      try {
         const apiUrl = process.env.NEXT_PUBLIC_API_URL;
         if (!apiUrl) {
            throw new Error('API URL is not defined');
         }

         const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               title: 'New Form',
               description: 'Enter Description',
               fields: [
                  {
                     question_type: '',
                     question: 'Placeholder Question',
                     required_field: true,
                  },
               ],
            }),
         });
      
         if (response.ok) {
            const formData = await response.json();
            // Refresh FormsList component after successful form creation
            router.push(`/Form/${formData.id}`);
            window.dispatchEvent(new CustomEvent('formCreated'));
         } else {
            console.error('Error creating form');
         }
      } catch (error) {
         console.error('Error creating form', error);
      } finally {
         setLoadingVisible(false);
      }
   };

   return (
      <main className="h-[calc(100dvh-57.0667px)] w-dvw p-4 grid place-items-center sm:p-8 md:h-dvh">
         <div className="w-full flex flex-col items-center gap-y-4 md:gap-y-6">
            <h1 className="text-3xl font-bold md:text-4xl">Forms</h1>
            <div className="w-full flex flex-col items-center gap-y-6 md:gap-y-9 lg:w-[720px] xl:w-[820px]">
               <div className="w-11/12 grid grid-cols-2 gap-x-2 gap-y-4">
                  <SuggestionButton />
                  <SuggestionButton />
                  <SuggestionButton />
                  <SuggestionButton />
               </div>
               <button
                  onClick={handleCreateForm}
                  className="w-full bg-primary-white text-primary-black px-2 py-3"
                  disabled={isLoadingVisible}
               >
                  {isLoadingVisible ? 'Creating...' : 'Create new form'}
               </button>
            </div>
         </div>
      </main>
   );
}
