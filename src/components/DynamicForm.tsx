"use client"
// src/app/components/DynamicForm.tsx
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface FormFields {
   question_type: string;
   question: string;
   required_field: boolean;
}

interface FormData {
   title: string;
   description: string;
   fields: FormFields[];
}

export default function DynamicForm() {
   const { register, control, handleSubmit } = useForm<FormData>();
   const { fields, append, remove } = useFieldArray<FormFields>({
      control,
      name: 'fields', // Updated to match the change in the FormData interface
   });
   const router = useRouter();

   // Ensure at least one fieldset is present on load
   if (fields.length === 0) {
      append({ question_type: '', question: '', required_field: false });
   }

   const onSubmit: SubmitHandler<FormData> = async (data) => {
      try {
         // Make POST request using Axios
         const response = await axios.post('http://localhost:3000/api', data);

         console.log('Form submitted successfully:', response.data);
         router.refresh();
         router.push(`/`);
      } catch (error) {
         console.error('Error submitting form:', error);
      }
   };

   return (

         <form onSubmit={handleSubmit(onSubmit)} className="w-1/2 h-full flex flex-col gap-3 border-slate-500">
            <label>
               Title:
               <input
                  {...register('title')}
                  className="border border-slate-500 px-10 py-2 bg-slate-900 text-white"
               />
            </label>
            <label>
               Description:
               <input
                  {...register('description')}
                  className="border border-slate-500 px-10 py-2 bg-slate-900 text-white"
               />
            </label>
            {fields.map((field, index) => (
               <fieldset key={field.id} className='legend border border-slate-500 p-5 flex flex-col gap-3'>
                  <legend className='mx-2 px-2'>Fieldset {index + 1}</legend>
                  <label>
                     Select Question Type:
                     <select
                        {...register(`fields.${index}.question_type` as const)}
                        className='w-1/3 h-10 p-2 bg-slate-900 border border-slate-800 rounded'
                     >
                        <option value="" disabled>Select question type</option>
                        <option value="TEXTFIELD">Text Field</option>
                        <option value="TEXTAREA">Text Area</option>
                        <option value="MULTIPLE_CHOICE">Multiple Choice</option>
                        <option value="CHECKBOX">Checkbox</option>
                        <option value="DROPDOWN">Dropdown</option>
                        <option value="ATTACHMENT">Attachment</option>
                        <option value="SLIDER">Slider</option>
                     </select>
                  </label>
                  <label>
                     Insert a question
                     <input
                        {...register(`fields.${index}.question` as const)}
                        className='w-1/3 h-10 p-2 bg-slate-900 border border-slate-800 rounded'
                     />
                  </label>
                  <label>
                     Checkbox:
                     <input
                        type="checkbox"
                        {...register(`fields.${index}.required_field` as const, { valueAsNumber: true })}
                     />
                  </label>
                  {fields.length > 1 && (
                     <button
                        type="button"
                        onClick={() => remove(index)}
                        className="bg-red-600 text-white py-2 px-4 w-1/6"
                     >
                        Remove Fieldset
                     </button>
                  )}
               </fieldset>
            ))}
            <button
               type="button"
               onClick={() => append({ question_type: '', question: '', required_field: false })}
               className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
            >
               Add Fieldset
            </button>
            <button type="submit" className="bg-blue-500 font-bold text-white py-3 px-6 w-fit">Submit</button>
         </form>

   );
}