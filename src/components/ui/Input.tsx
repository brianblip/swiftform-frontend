import { forwardRef } from "react";
import { TextField, TextFieldProps } from "@mui/material";

interface Props extends Omit<TextFieldProps, "error" | "required"> {
    error?: string;
    required?: boolean;
}

export const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
    return (
        <TextField
            size="small"
            fullWidth
            {...props}
            inputRef={ref}
            InputProps={{
                style: {
                    backgroundColor: "#fff",
                    ...props.InputProps?.style,
                },
            }}
            error={!!props.error}
            helperText={props.error}
            required={undefined} // don't use required prop because it's overlapping with react-hook-form
            label={`${props.label} ${props.required ? "*" : ""}`}
        />
    );
});

Input.displayName = "Input";
