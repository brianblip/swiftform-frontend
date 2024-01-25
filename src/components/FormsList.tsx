import Link from 'next/link';
import { useEffect, useState } from 'react';

interface FormData {
   id: number;
   title: string;
   description: string;
   fields: {
      name: string;
      type: string;
      label: string;
      placeholder?: string;
      required?: boolean;
      options?: string[];
      min?: number;
      max?: number;
      maxLength?: number;
   };
}

interface FormListID {
   formId: number;
}

export default function FormsList({ formId }: FormListID) {
   const [forms, setForms] = useState<FormData[] | null>(null);
   const [isLoadingVisible, setLoadingVisible] = useState<boolean>(true);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      const fetchData = async () => {
         setLoadingVisible(true);
         try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            if (!apiUrl) {
               throw new Error('API URL is not defined');
            }
            const response = await fetch(apiUrl);
            if (!response.ok) {
               throw new Error(`HTTP error ${response.status}`);
            }
            const data: FormData[] = await response.json();
            setForms(data);
         } catch (error) {
            setError(String(error));
         } finally {
            setLoadingVisible(false);
         }
      };

      fetchData();

      window.addEventListener('formCreated', fetchData);

      return () => {
         window.removeEventListener('formCreated', fetchData);
      };
   }, []);

   return (
      <div className='w-full h-full py-4'>
         {isLoadingVisible ? (
            <p>Loading...</p>
         ) : error ? (
            <p>Error fetching data: {error}</p>
         ) : (
            <ul>
               {forms &&
                  forms.map((form) => (
                     <li key={form.id}>
                        <Link
                           href={`/Form/${form.id}`}
                           className={`flex w-full items-center gap-x-2 rounded bg-transparent p-2 transition-all hover:bg-primary-secondary ${form.id == formId ? 'text-green-500' : ''}`}
                        >
                           <h2>{form.title}</h2>
                        </Link>
                     </li>
                  ))}
            </ul>
         )}
      </div>
   );
}
