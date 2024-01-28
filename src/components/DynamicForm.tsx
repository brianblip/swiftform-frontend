"use client"

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
   useForm,
   Control,
   SubmitHandler,
   useFieldArray,
} from 'react-hook-form';
import {
   Delete,
   CopyAllOutlined,
   ArrowUpwardRounded,
   ArrowDownwardRounded
} from '@mui/icons-material';

class FormFieldModel {
   question_name = '';
   question_type = '';
   question = '';
   required_field = false;
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
   const { register, control, handleSubmit, setValue } = useForm<FormDataModel>({
      defaultValues: { id, title, description, fields },
   });
   const router = useRouter();
   const { fields: formFields, append, remove } = useFieldArray<FormFieldModel>({
      control: control as Control<FormDataModel>,
      name: 'fields',
   });

   const [tempValues, setTempValues] = useState<FormFieldModel[]>([]);

   const handleFormSubmit = async (data: FormDataModel) => {
      try {
         const apiUrl = process.env.NEXT_PUBLIC_API_URL;
         // Filter out empty question_name values before submitting
         data.fields = data.fields.filter(field => field.question_name.trim() !== '');
         const response = await axios.patch(`${apiUrl}/${id}`, data);
         console.log('Form submitted successfully:', response.data);
         window.dispatchEvent(new CustomEvent('formCreated'));
         router.push('/');
      } catch (error) {
         console.error('Error submitting form:', error);
      }
   };

   const moveField = (fromIndex: number, toIndex: number) => {
      formFields.splice(toIndex, 0, formFields.splice(fromIndex, 1)[0]);
      const movedField = document.getElementById(`fieldset-${toIndex}`);
      if (movedField) {
         movedField.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
   };

   const appendNewFormField = () => {
      const newField = new FormFieldModel();
      append(newField);
      setTempValues([...tempValues, { ...newField }]);
   };

   useEffect(() => {
      setValue('title', title);
   }, [title, setValue]);

   return (
      <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col items-center w-3/4 gap-3 p-10 border border-zinc-500">
         {/* Description */}
         <div className="flex flex-col items-center w-4/5 gap-3 p-5">
            <label htmlFor="description" className='flex flex-col items-center justify-center w-4/5 gap-3'>
               <textarea
                  defaultValue={description}
                  {...register('description')}
                  className="w-full p-2 text-white rounded min-h-40 max-h-80 bg-primary-secondary"
                  id="description"
               ></textarea>
               Description:
            </label>
         </div>

         {/* Form Fields */}
         {formFields.map((field, index) => (
            <fieldset
               key={field.id}
               id={`fieldset-${index}`}
               className='flex flex-col w-4/5 gap-5 border rounded-md shadow-xl border-zinc-500 p-7'
            >
               <legend className='px-3 mx-5 w-64'>
                  <label htmlFor={`fields.${index}.question_name`} className='w-full flex text-xs items-center justify-between gap-3'>
                     Item Name:
                     <input
                        defaultValue={field.question_name}
                        {...register(`fields.${index}.question_name` as const)}
                        className='w-3/5 p-2 text-primary-white rounded bg-primary-secondary'
                        id={`fields.${index}.question_name`}
                     />
                  </label>
               </legend>
               <div className="flex justify-between w-full">
                  {/* Question Type */}
                  <label htmlFor={`fields.${index}.question_type`} className='flex flex-col items-start w-3/4 gap-3'>
                     Type:
                     <select
                        defaultValue={field.question_type}
                        {...register(`fields.${index}.question_type` as const)}
                        className='w-1/2 h-10 p-2 rounded bg-primary-secondary'
                        id={`fields.${index}.question_type`}
                     >
                        <option value="" disabled>Select question type</option>
                        <optgroup label='Text Input Fields'>
                           <option value="text">Text</option>
                           <option value="email">Email</option>
                           <option value="password">Password</option>
                           <option value="textarea">Paragraph</option>
                        </optgroup>
                        <optgroup label='Numbers'>
                           <option value="number">Number</option>
                           <option value="tel">Phone Number</option>
                        </optgroup>
                        <optgroup label='Multiple Choice'>
                           <option value="select">Dropdown</option>
                           <option value="checkbox">Checkbox</option>
                           <option value="radio">Radio Button</option>
                        </optgroup>
                        <optgroup label='Slider'>
                           <option value="range">Slider</option>
                        </optgroup>
                        <optgroup label='Date & Time'>
                           <option value="time">Time</option>
                           <option value="date">Date</option>
                           <option value="datetime-local">Date and Time</option>
                        </optgroup>
                     </select>
                  </label>

                  <div className="flex items-start justify-between w-1/4 gap-5 h-fit">

                     {/* Duplicate Buttons */}
                     <button type="button" onClick={() => append({ ...field })} className="ml-2 w-7 h-7 place-content-center">
                        <CopyAllOutlined className={`w-full h-full text-white hover:text-blue-600 transition-colors duration-300`} />
                     </button>

                     {/* Delete Buttons */}
                     {formFields.length > 1 && (
                        <button type="button" onClick={() => remove(index)} className="w-7 h-7 place-content-center">
                           <Delete className={`w-full h-full text-white hover:text-red-600 transition-colors duration-300`} />
                        </button>
                     )}

                     {/* Move Field Up and Down Buttons */}
                     <button
                        type="button"
                        onClick={() => {
                           if (index > 0) {
                              moveField(index, index - 1);
                              setValue('fields', [...formFields]); // Update formFields in react-hook-form
                           }
                        }}
                        className="ml-2 w-7 h-7 place-content-center"
                        disabled={index === 0}
                     >
                        <ArrowUpwardRounded className={`w-full h-full text-white hover:text-green-600 transition-colors duration-300`} />
                     </button>

                     <button
                        type="button"
                        onClick={() => {
                           if (index < formFields.length - 1) {
                              moveField(index, index + 1);
                              setValue('fields', [...formFields]); // Update formFields in react-hook-form
                           }
                        }}
                        className="ml-2 w-7 h-7 place-content-center"
                        disabled={index === formFields.length - 1}
                     >
                        <ArrowDownwardRounded className={`w-full h-full text-white hover:text-green-600 transition-colors duration-300`} />
                     </button>
                  </div>

               </div>

               {/* Question */}
               <label htmlFor={`fields.${index}.question`} className='flex flex-col items-start justify-center gap-3'>
                  Question:
                  <textarea
                     defaultValue={field.question}
                     {...register(`fields.${index}.question` as const)}
                     className='w-full p-2 text-black rounded min-h-40 max-h-80 bg-primary-white'
                     id={`fields.${index}.question`}
                  ></textarea>
               </label>

               {/* Required Field Checkbox */}
               <label htmlFor={`fields.${index}.required_field`} className='flex items-center gap-3'>
                  <input
                     type="checkbox"
                     defaultChecked={field.required_field}
                     {...register(`fields.${index}.required_field` as const)}
                     id={`fields.${index}.required_field`}
                  />
                  Required:
               </label>
            </fieldset>
         ))}

         {/* Add Fieldset and Submit Buttons */}
         <button type="button" onClick={appendNewFormField} className="px-6 py-3 font-bold text-white bg-green-600 w-fit">
            Add Fieldset
         </button>
         <button type="submit" className="px-6 py-3 font-bold text-white bg-blue-500 w-fit">Submit</button>
      </form>
   );
}
