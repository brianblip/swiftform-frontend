import React from 'react'

export default function DateResponse() {
    const sampleDateData = [
        { month: "January", year: 2024, date: 15 },
        { month: "February", year: 2024, date: 20 },
        { month: "March", year: 2024, date: 25 }
    ];
    return (
        <div className="my-8 grid min-h-48 w-full grid-cols-1 gap-4 bg-[#444654] p-4 shadow-md">
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem itaque magnam nostrum delectus, consequuntur cum et culpa quasi obcaecati modi veritatis tempora minus laborum ab, sequi distinctio est officia. Quisquam.</p>
            <p className='font-extralight'>{sampleDateData.length} response</p>
            {sampleDateData.map((date, index) => (
                    <p key={index}>{date.month} {date.year} | {date.date}</p>
            ))}
        </div>
    )
}
