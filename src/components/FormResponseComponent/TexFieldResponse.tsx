// same with textarea
import React from 'react'
export default function TexFieldResponse() {
    return (
        <div className="my-8 grid min-h-48 w-full grid-cols-1 gap-4 bg-[#444654] p-4 shadow-md">
            <p>corporis, nemo facere tempore debitis pariatur quaerat, maiores aliquid laborum non quam nihil cumque distinctio nobis? Iusto cum rerum fugit.</p>
            <p className='font-extralight'>999 response</p>
            {/* TODO: loop answers instead of hardcoding */}
            <p>answers...</p>
            <p>answers...</p>
            <p>answers...</p>
            <p>answers...</p>
            <p>answers...</p>
        </div>
    )
}