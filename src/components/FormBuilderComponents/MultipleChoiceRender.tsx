import React from "react";
import { Delete, AddCircleOutlineOutlined } from "@mui/icons-material";

interface MultipleChoiceRenderProps {
  choices: string[];
  onAddChoice: () => void;
  onRemoveChoice: (index: number) => void; // Accept choiceIndex as a parameter
  onUpdateChoice: (index: number, value: string) => void;
}

export default function MultipleChoiceRender({
  choices,
  onAddChoice,
  onRemoveChoice,
  onUpdateChoice,
}: MultipleChoiceRenderProps) {
  return (
    <div className="flex flex-col gap-3 py-5">
      {choices.map((choice, choiceIndex) => (
        <div
          key={choiceIndex}
          className="flex items-center justify-between gap-3"
        >
          <label
            htmlFor={`choices.${choiceIndex}`}
            className="flex items-center justify-start w-full gap-3"
          >
            {String.fromCharCode(65 + choiceIndex)}:
            <input
              required
              defaultValue={choice}
              onChange={(e) => onUpdateChoice(choiceIndex, e.target.value)}
              className="w-full h-10 p-2 rounded bg-primary-white text-zinc-800"
              id={`choices.${choiceIndex}`}
            />
          </label>
          {choices.length > 1 && ( // Only show delete button when there is more than one choice
            <button
              type="button"
              onClick={() => onRemoveChoice(choiceIndex)}
              className="transition-colors ease-in-out text-primary-white hover:text-red-600"
            >
              <Delete titleAccess="Delete Choice" />
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={onAddChoice}
        className="flex items-center gap-1 text-green-500 transition-colors ease-in-out group hover:text-green-600 hover:underline w-fit"
      >
        <AddCircleOutlineOutlined className="transition-all ease-in-out origin-center group-hover:rotate-90" />{" "}
        Add Choice
      </button>
    </div>
  );
}
