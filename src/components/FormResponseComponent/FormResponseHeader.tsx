import React, { useState } from 'react'
import ToggleButton from '../UIComponents/ToggleButton'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Select from '../UIComponents/Select';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
export default function FormResponseHeader() {
  const [activeButton, setActiveButton] = useState('Summary');
  const [isChecked, setIsChecked] = useState(false);
  const options = ['question 1', 'question 2', 'question 3']; //dummy data
  const dummyEmail = ['lorem@gmail.com', 'neo@gmail.com', 'zxcv@gmail.com']; //dummy data

  const buttons = [
    { label: 'Summary', key: 'Summary' },
    { label: 'Question', key: 'Question' },
    { label: 'Individual', key: 'Individual' }
  ];
  const handleToggle = () => {
    setIsChecked(!isChecked);
  };
  return (
    <>
      <div className="grid min-h-48 w-full grid-cols-1 rounded-md bg-[#444654] p-4 shadow-md">
        <div className="flex justify-between">
          <p className='text-lg font-bold'>999 Reponse</p>
          <div className='cursor-pointer'>
            {/* TODO: Show option */}
            <MoreVertIcon />
          </div>
        </div>
        <div className="flex items-center justify-end">
          <p id="responseStatus" className="mr-2">{isChecked ? 'Accepting responses' : 'Not accepting responses'}</p>
          <ToggleButton isChecked={isChecked} handleToggle={handleToggle} />
        </div>
        <div className="flex justify-around">
          {buttons.map(button => (
            <button
              key={button.key}
              className={`relative w-full font-semibold ${button.key === activeButton ? 'active:text-black' : ''}`}
              onClick={() => setActiveButton(button.key)}
            >
              {button.label}
              {button.key === activeButton && <span className="absolute bottom-0 left-0 h-1 w-full bg-black"></span>}
            </button>
          ))}
        </div>
      </div>
      {activeButton === "Question" &&
        <div className="grid min-h-28 w-full grid-cols-1 items-center rounded-md bg-[#444654] p-4 shadow-md">
          <Select options={options} size="sm" />
        </div>
      }
      {activeButton === "Individual" &&
        <div className="grid min-h-28 w-full grid-cols-2 items-center rounded-md bg-[#444654] p-4 shadow-md">
          <Select options={dummyEmail} size="md" />
          <div className="flex justify-end">
            <DeleteForeverIcon fontSize='large' className="cursor-pointer"/>
          </div>
        </div>
      }
    </>
  )
}