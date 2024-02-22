import { TextField, TextFieldProps } from "@mui/material";

export const Input = (props: TextFieldProps) => {
    return (
        <TextField
            {...props}
            style={{
                backgroundColor: "#fff",
                borderRadius: "4px",
                ...props.style,
            }}
            size="small"
            fullWidth
        />
    );
};
