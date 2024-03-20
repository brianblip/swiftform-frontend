import { forwardRef } from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { InputHTMLAttributes } from "react";

interface Props extends Omit<TextFieldProps, "error" | "required"> {
    isError?: boolean;
    required?: boolean;
    readOnly?: boolean;
}

const Input = forwardRef<InputHTMLAttributes<HTMLInputElement>, Props>(
    ({ isError, required, ...props }, ref) => {
        return (
            <TextField
                size="small"
                fullWidth
                {...props}
                inputRef={ref}
                InputProps={{
                    style: {
                        backgroundColor: "#fff",
                        ...(isError && { border: "1px solid red" }), // Apply red border if isError is true
                        ...props.InputProps?.style,
                    },
                }}
                error={isError}
                helperText={isError && props.helperText} // Display helper text only if isError is true
                required={undefined} // don't use required prop because it's overlapping with react-hook-form
                label={`${props.label} ${required ? "*" : ""}`}
            />
        );
    },
);

Input.displayName = "Input";

export default Input;
