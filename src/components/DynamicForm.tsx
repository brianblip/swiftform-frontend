"use client"
import { useForm, SubmitHandler, useFieldArray, Control } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import React from 'react';

class FormFieldModel {
   question_type: string = '';
   question: string = '';
   required_field: boolean = false;
}
interface FormDataModel {
   id: string;
   title: string;
   description: string;
   fields: FormFieldModel[];
}

interface DynamicFormProps extends FormDataModel {
   onSubmit: SubmitHandler<FormDataModel>;
}

export default function DynamicForm({ id, title, description, fields, onSubmit }: DynamicFormProps) {
   const { register, control, handleSubmit } = useForm<FormDataModel>({
      defaultValues: { id, title, description, fields: fields },
   });
   const router = useRouter();
   const { fields: formFields, append, remove } = useFieldArray<FormFieldModel>({
      control: control as Control<FormDataModel>,
      name: 'fields',
   });

   const handleFormSubmit = async (data: FormDataModel) => {
      try {
         const apiUrl = process.env.NEXT_PUBLIC_API_URL;
         const response = await axios.patch(`${apiUrl}/${id}`, data);
         console.log('Form submitted successfully:', response.data);
         window.dispatchEvent(new CustomEvent('formCreated'));
         router.push('/');
      } catch (error) {
         console.error('Error submitting form:', error);
      }
   };

   const appendNewFormField = () => {
      append(new FormFieldModel());
   };

   return (
      <form onSubmit={handleSubmit(handleFormSubmit)} className="w-1/2 h-full flex flex-col gap-3 border-slate-500">
         <label htmlFor="title">
            Title:
            <input
               defaultValue={title}
               {...register('title')}
               className="border border-slate-500 px-10 py-2 bg-slate-900 text-white"
               id="title"
            />
         </label>
         <label htmlFor="description">
            Description:
            <input
               defaultValue={description}
               {...register('description')}
               className="border border-slate-500 px-10 py-2 bg-slate-900 text-white"
               id="description"
            />
         </label>
         {formFields.map((field, index) => (
            <fieldset key={field.id} className='legend border border-slate-500 p-5 flex flex-col gap-3'>
               <legend className='mx-2 px-2'>Fieldset {index + 1}</legend>
               <label htmlFor={`fields.${index}.question_type`}>
                  Select Question Type:
                  <select
                     defaultValue={field.question_type}
                     {...register(`fields.${index}.question_type` as const)}
                     className='w-1/3 h-10 p-2 bg-slate-900 border border-slate-800 rounded'
                     id={`fields.${index}.question_type`}
                  >
                     <option value="" disabled>Select question type</option>
                     <option value="textfield">Text Field</option>
                     <option value="textarea">Text Area</option>
                     <option value="multiple_choice">Multiple Choice</option>
                     <option value="checkbox">Checkbox</option>
                     <option value="dropdown">Dropdown</option>
                     <option value="attachment">Attachment</option>
                     <option value="slider">Slider</option>
                  </select>
               </label>
               <label htmlFor={`fields.${index}.question`}>
                  Insert a question
                  <input
                     defaultValue={field.question}
                     {...register(`fields.${index}.question` as const)}
                     className='w-1/3 h-10 p-2 bg-slate-900 border border-slate-800 rounded'
                     id={`fields.${index}.question`}
                  />
               </label>
               <label htmlFor={`fields.${index}.required_field`}>
                  Checkbox:
                  <input
                     type="checkbox"
                     defaultChecked={field.required_field}
                     {...register(`fields.${index}.required_field` as const)}
                     id={`fields.${index}.required_field`}
                  />
               </label>
               {formFields.length > 1 && (
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
            onClick={appendNewFormField}
            className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
         >
            Add Fieldset
         </button>
         <button type="submit" className="bg-blue-500 font-bold text-white py-3 px-6 w-fit">Submit</button>
      </form>
   );
}

