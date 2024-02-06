import { Delete, AddCircleOutlineOutlined } from "@mui/icons-material";

interface DynamicChoiceRenderProps {
    choices: string[];
    onAddChoice: () => void;
    onRemoveChoice: (index: number) => void;
    onUpdateChoice: (index: number, value: string) => void;
}

export default function DynamicChoiceRender({
    choices,
    onAddChoice,
    onRemoveChoice,
    onUpdateChoice,
}: DynamicChoiceRenderProps) {
    return (
        <div className="flex w-full flex-col gap-y-4 md:w-3/4">
            {choices.map((choice, choiceIndex) => (
                <div
                    key={choiceIndex}
                    className="flex w-full items-center gap-2"
                >
                    <label
                        htmlFor={`choices.${choiceIndex}`}
                        className="flex w-full items-center gap-2"
                    >
                        {String.fromCharCode(65 + choiceIndex)}:
                        <input
                            defaultValue={choice}
                            onChange={(e) =>
                                onUpdateChoice(choiceIndex, e.target.value)
                            }
                            className="w-full rounded bg-primary-white p-2 text-primary-neutral"
                            id={`choices.${choiceIndex}`}
                        />
                    </label>
                    <button
                        type="button"
                        onClick={() => onRemoveChoice(choiceIndex)}
                        className="hover:text-red-600"
                    >
                        <Delete titleAccess="Delete Choice" />
                    </button>
                </div>
            ))}
            <button
                type="button"
                onClick={onAddChoice}
                className="flex w-fit items-center gap-1 text-green-500 hover:text-green-600 hover:underline"
            >
                <AddCircleOutlineOutlined className="" />
                Add Choice
            </button>
        </div>
    );
}
