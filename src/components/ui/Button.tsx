import { Button as MuiButton, ButtonProps } from "@mui/material";

export const Button = ({ children, ...props }: ButtonProps) => {
    return (
        <MuiButton variant="contained" {...props}>
            {children}
        </MuiButton>
    );
};
