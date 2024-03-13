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
            <Input
                label="Choice Text:"
                type="text"
                defaultValue={editedText}
                onchange={handleChange}
            />
            {/* <TextField
                label="Choice Text"
                variant="filled"
                value={editedText}
                onChange={handleChange}
                fullWidth
                className="mb-2"
            /> */}
            <div className="mt-2">
                <Button
                    onClick={handleDelete}
                    variant="outlined"
                    color="secondary"
                >
                    Delete
                </Button>
            </div>
        </div>
    );
}
