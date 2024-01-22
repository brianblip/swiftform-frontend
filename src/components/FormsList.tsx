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
   }[];
}

export default function FormsList() {
   const [forms, setForms] = useState<FormData[] | null>(null);
   const [isLoading, setIsLoading] = useState<boolean>(true);
   const [error, setError] = useState<string | null>(null);



   useEffect(() => {
      const fetchData = async () => {
         setIsLoading(true);
         try {
            const response = await fetch('http://localhost:3000/api');
            if (!response.ok) {
               throw new Error(`HTTP error ${response.status}`);
            }
            const data: FormData[] = await response.json();
            setForms(data);
         } catch (error) {
            setError(String(error));
         } finally {
            setIsLoading(false);
         }
      };
   
      fetchData();
   }, []);

   return (
      <div className='w-full h-full py-4'>
         {isLoading ? (
            <p>Loading...</p>
         ) : error ? (
            <p>Error fetching data: {error}</p>
         ) : (
            <ul>
               {forms && forms.map((form) => (
                  <li key={form.id}>
                     <Link href={`/forms/${form.id}`} className='flex w-full items-center gap-x-2 rounded bg-none p-2 transition-all hover:bg-primary-secondary'>
                        <h2>{form.title}</h2>
                        {/* Optionally display description or fields */}
                     </Link>
                  </li>
               ))}
            </ul>
         )}
      </div>
   );
}