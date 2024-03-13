import React, { useState } from 'react';
interface ToggleButtonProps {
    isChecked: boolean;
    handleToggle: () => void;

}

const ToggleButton: React.FC<ToggleButtonProps> = ({ isChecked, handleToggle }) => {
    return (
        <label htmlFor="toggleButton" className="flex cursor-pointer items-center">
            <div className="relative">
                <input
                    type="checkbox"
                    id="toggleButton"
                    className="sr-only"
                    checked={isChecked}
                    onChange={handleToggle}
                />
                <div className={`block h-6 w-10 rounded-full ${isChecked ? 'bg-gray-600': 'bg-red-500'}`}></div>
                <div className={`dot absolute top-1 size-4 rounded-full bg-white transition`} style={{ left: isChecked ? 'calc(100% - 1.5rem)' : '0.25rem' }}></div>
            </div>
        </label>
    )
}

export default ToggleButton;
