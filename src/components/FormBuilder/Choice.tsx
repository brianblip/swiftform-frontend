import React, { useState } from "react";
import { ChoiceComponentProps } from "@@/types";
import Input from "../UIComponents/Input";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "../UIComponents/Button";

export default function ChoiceComponent({
    choice,
    handleUpdateChoice,
    handleDeleteChoice,
}: ChoiceComponentProps) {
    const [editedText, setEditedText] = useState(choice.text);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newText = e.target.value;
        setEditedText(newText);
        handleUpdateChoice(choice.id, newText, choice.order); // Pass choice id and updated text
    };

    const handleDelete = () => {
        handleDeleteChoice(choice.id);
    };

    return (
        <div className="flex items-center gap-3">
            <Input
                label="Choice Text:"
                id={`${choice.id}`}
                type="text"
                defaultValue={editedText}
                onChange={handleChange}
            />

            <Button
                onClick={handleDelete}
                className="my-1 self-end"
                variant="trash"
                size="xs"
            >
                <DeleteIcon />
            </Button>
        </div>
    );
}
