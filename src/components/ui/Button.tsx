import { Button as MuiButton, ButtonProps } from "@mui/material";

const Button = ({ children, ...props }: ButtonProps) => {
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

export default Button;
