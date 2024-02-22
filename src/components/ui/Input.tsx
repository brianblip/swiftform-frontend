import { forwardRef } from "react";
import { TextField, TextFieldProps } from "@mui/material";

export const Input = forwardRef<HTMLInputElement, TextFieldProps>(
    (props, ref) => {
        return (
            <TextField
                {...props}
                inputRef={ref}
                InputProps={{
                    style: {
                        backgroundColor: "#fff",
                        ...props.InputProps?.style,
                    },
                }}
                size="small"
                fullWidth
            />
        );
    },
);

Input.displayName = "Input";
