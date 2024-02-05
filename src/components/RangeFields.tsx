import React, { ChangeEvent } from "react";

interface RangeFieldsProps {
    index: number;
    minimumValue: number;
    maximumValue: number;
    handleMinimumChange: (e: ChangeEvent) => void;
    handleMaximumChange: (e: ChangeEvent) => void;
}

export default function RangeFields({
    index,
    minimumValue,
    maximumValue,
    handleMinimumChange,
    handleMaximumChange,
}: RangeFieldsProps) {
    return (
        <div className="flex w-full flex-col gap-4 md:w-3/4">
            <label
                htmlFor={`fields.${index}.maximum`}
                className="flex w-full items-center gap-2"
            >
                Maximum:
                <input
                    min={Number(minimumValue) + 2}
                    max={100}
                    type="number"
                    pattern="[0-9]*"
                    defaultValue={maximumValue}
                    onChange={handleMaximumChange}
                    className="w-full rounded bg-primary-white p-2 text-primary-neutral"
                />
            </label>
            <label
                htmlFor={`fields.${index}.minimum`}
                className="flex w-full items-center gap-2"
            >
                Minimum:
                <input
                    min={1}
                    max={Number(maximumValue) - 2}
                    type="number"
                    pattern="[0-9]*"
                    defaultValue={minimumValue}
                    onChange={handleMinimumChange}
                    className="w-full rounded bg-primary-white p-2 text-primary-neutral"
                />
            </label>
        </div>
    );
}
