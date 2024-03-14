import React, { useState } from 'react';

interface SelectProps {
  options: string[],
  size: String
}
/*
* size default is sm
*/
const Select: React.FC<SelectProps> = ({ options, size = "sm" }) => {
  // TODO: move functions and states to the parent component
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: any) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  /*
  * custom sizes
  */
  let widthClass = "w-full";
  if (size === "sm") {
    widthClass = "w-1/3";
  } else if (size === "md") {
    widthClass = "w-1/2";
  } else if (size === "lg") {
    widthClass = "w-full";
  }
  
  return (
    <div className={`relative ${widthClass}`}>
      <div
        className="flex cursor-pointer items-center justify-between rounded-md border border-gray-300 px-4 py-2"
        onClick={handleToggle}
      >
        <span>{selectedOption || 'Select an option'}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="ml-2 size-4"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      {isOpen && options && (
        <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-300 bg-white shadow-lg">
          {options.map((option, index) => (
            <div
              key={index}
              className="cursor-pointer px-4 py-2 text-black hover:bg-gray-100"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
