import React from 'react'
import PieChart from '../UIComponents/PieChart';
export default function CheckboxResponse() {
    // dummy data only
    const data = [
        { value: 30, color: '#FF0000' },
        { value: 50, color: '#00FF00' },
        { value: 20, color: '#0000FF' },
        { value: 20, color: '#FFFFFF' },
        { value: 20, color: '#000000' },

    ];
    return (
        <div className="my-8 grid min-h-48 w-full grid-cols-1 gap-4 bg-[#444654] p-4 shadow-md">
            <div>questio Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo distinctio repellat quas accusantium numquam magnam illum provident fuga necessitatibus aliquam sunt ipsam placeat officia dolor veritatis, maiores dicta aspernatur quasi!</div>
            <div className='flex items-center justify-around'>
                <PieChart data={data} />
                {/* TODO: LOOP ANSWERS */}
                <ul className="my-4 space-y-2 py-2">
                    <li className="text-lg">answers</li>
                    <li className="text-lg">answers</li>
                    <li className="text-lg">answers</li>
                </ul>
            </div>
        </div>
    )
}
