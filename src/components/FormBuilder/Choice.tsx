import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { Choice } from "@@/types";
import Input from "../UIComponents/Input";
import DeleteIcon from "@mui/icons-material/Delete";

type ChoiceComponentProps = {
    choice: Choice;
    handleUpdateChoice: (choiceId: number, updatedChoice: string) => void;
    handleDeleteChoice: (choiceId: number) => void;
};

export default function ChoiceComponent({
    choice,
    handleUpdateChoice,
    handleDeleteChoice,
}: ChoiceComponentProps) {
    const [editedText, setEditedText] = useState(choice.text);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newText = e.target.value;
        setEditedText(newText);
        handleUpdateChoice(choice.id, newText); // Pass choice id and updated text
    };

    const handleDelete = () => {
        handleDeleteChoice(choice.id);
    };

    return (
        <div className="flex items-center gap-3">
            <TextField
                label="Choice Text"
                variant="filled"
                value={editedText}
                onChange={handleChange}
                fullWidth
                className="mb-2"
            /> */}

            <button
                onClick={handleDelete}
                className="rounded bg-error p-1 hover:bg-error/50"
            >
                <DeleteIcon />
            </button>
        </div>
    );
}
