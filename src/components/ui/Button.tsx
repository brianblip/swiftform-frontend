import { Button as MuiButton, ButtonProps } from "@mui/material";

export const Button = ({ children, ...props }: ButtonProps) => {
    return (
        <MuiButton
            variant="contained"
            size="large"
            {...props}
            style={{
                textTransform: "none",
                ...props.style,
            }}
        >
            {children}
        </MuiButton>
    );
};
