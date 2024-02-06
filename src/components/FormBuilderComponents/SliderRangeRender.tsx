import React, { ChangeEvent } from "react";

interface SliderRangeRenderProps {
    index: number;
    minimumValue: number;
    maximumValue: number;
    handleMinimumChange: (e: ChangeEvent) => void;
    handleMaximumChange: (e: ChangeEvent) => void;
}

export default function SliderRangeRender({
    index,
    minimumValue,
    maximumValue,
    handleMinimumChange,
    handleMaximumChange,
}: SliderRangeRenderProps) {
    return (
        <div className="flex flex-col gap-3">
            <label
                htmlFor={`fields.${index}.maximum`}
                className="flex w-fit flex-col items-start gap-3"
            >
                Maximum:
                <input
                    min={Number(minimumValue) + 2}
                    max={100}
                    required
                    type="number"
                    pattern="[0-9]*"
                    defaultValue={maximumValue}
                    onChange={handleMaximumChange}
                    placeholder="Set a range of 1-100"
                    className="w-full rounded bg-primary-white p-2 text-black"
                />
            </label>
            <label
                htmlFor={`fields.${index}.minimum`}
                className="flex w-fit flex-col items-start gap-3"
            >
                Minimum:
                <input
                    min={1}
                    max={Number(maximumValue) - 2}
                    required
                    type="number"
                    pattern="[0-9]*"
                    defaultValue={minimumValue}
                    onChange={handleMinimumChange}
                    placeholder="Set a range of 1-100"
                    className="w-full rounded bg-primary-white p-2 text-black"
                />
            </label>
        </div>
    );
}
