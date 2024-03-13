import React from 'react'
import ToggleButton from '../ui/ToggleButton'
import MoreVertIcon from '@mui/icons-material/MoreVert';
export default function FormResponseHeader() {
  return (
    <div className="my-8 grid min-h-48 w-full grid-cols-1 gap-4 rounded-md bg-[#444654] p-4 shadow-md">
      <div className="flex justify-between">
        <p className='text-lg font-bold'>999 Reponse</p>
        <div className='cursor-pointer'>
          {/* TODO: Show option */}
          <MoreVertIcon />
        </div>
      </div>
      <div className="flex items-center justify-end">
        <p id="responseStatus" className="mr-2">Accepting responses</p>
        <ToggleButton />
      </div>
      <div className="flex justify-around">
        <button className='w-full font-semibold active:text-black'>Summary</button>
        <button className='w-full font-semibold active:text-black'>Question</button>
        <button className='w-full font-semibold active:text-black'>Individual</button>
      </div>
    </div>
  )
}