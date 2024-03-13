import React, { useState } from 'react'
import ToggleButton from '../ui/ToggleButton'
import MoreVertIcon from '@mui/icons-material/MoreVert';
export default function FormResponseHeader() {
  const [activeButton, setActiveButton] = useState('Summary');
  const [isChecked, setIsChecked] = useState(false);

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
      <div className="my-8 grid min-h-48 w-full grid-cols-1 gap-4 rounded-md bg-[#444654] p-4 shadow-md">
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
    </>
  )
}