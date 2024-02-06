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
        <div className="flex flex-col gap-3 py-5">
            {choices.map((choice, choiceIndex) => (
                <div
                    key={choiceIndex}
                    className="flex items-center justify-between gap-3"
                >
                    <label
                        htmlFor={`choices.${choiceIndex}`}
                        className="flex w-full items-center justify-start gap-3"
                    >
                        {String.fromCharCode(65 + choiceIndex)}:
                        <input
                            defaultValue={choice}
                            onChange={(e) =>
                                onUpdateChoice(choiceIndex, e.target.value)
                            }
                            className="h-10 w-full rounded bg-primary-white p-2 text-zinc-800"
                            id={`choices.${choiceIndex}`}
                        />
                    </label>
                    <button
                        type="button"
                        onClick={() => onRemoveChoice(choiceIndex)}
                        className="text-primary-white transition-colors ease-in-out hover:text-red-600"
                    >
                        <Delete titleAccess="Delete Choice" />
                    </button>
                </div>
            ))}
            <button
                type="button"
                onClick={onAddChoice}
                className="group flex w-fit items-center gap-1 text-green-500 transition-colors ease-in-out hover:text-green-600 hover:underline"
            >
                <AddCircleOutlineOutlined className="origin-center transition-all ease-in-out group-hover:rotate-90" />{" "}
                Add Choice
            </button>
        </div>
    );
}
