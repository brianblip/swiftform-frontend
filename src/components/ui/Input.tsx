import { forwardRef } from "react";
import { TextField, TextFieldProps } from "@mui/material";

export const Input = forwardRef<HTMLInputElement, TextFieldProps>(
    (props, ref) => {
        return (
            <TextField
                {...props}
                inputRef={ref}
                style={{
                    backgroundColor: "#fff",
                    borderRadius: "4px",
                    ...props.style,
                }}
                size="small"
                fullWidth
            />
        );
    },
);

Input.displayName = "Input";
