"use client";

import React from "react";
import { useForm, useFieldArray, RegisterOptions } from "react-hook-form";

interface FormData {
  fields: {
    name: string;
  }[];
}

const DynamicForm = () => {
  const { control, handleSubmit, register } = useForm<FormData>({
    defaultValues: {
      fields: [{ name: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "fields",
  });

  const registerField = (
    index: number,
    name: keyof FormData["fields"][0],
    rules?: RegisterOptions
  ) => register(`fields.${index}.${name}`, rules);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <form
        className="w-full max-w-xl bg-white shadow-md rounded px-8 pt-10 pb-4 mb-4"
        onSubmit={handleSubmit((data) => console.log(data))}
      >
        <h1 className=" flex flex-col items-center text-3xl font-bold text-slate-800 mb-4">
          Dynamic Form
        </h1>
        {fields.map((item, index) => (
          <div className="flex flex-wrap -mx-3 mb-4 items-center" key={item.id}>
            <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor={`name-${index}`}
              >
                Name
              </label>
              <input
                id={`name-${index}`}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Username"
                {...registerField(index, "name", { required: true })}
                defaultValue={item.name}
              />
            </div>

            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline ml-2 mt-7"
              type="button"
              onClick={() => remove(index)}
            >
              Remove
            </button>
          </div>
        ))}
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => append({ name: "" })}
          >
            Add Field
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default DynamicForm;
