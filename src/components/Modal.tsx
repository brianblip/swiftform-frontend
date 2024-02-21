import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MuiModal, { ModalProps as MuiModalProps } from "@mui/material/Modal";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "rgb(52 53 65 / var(--tw-bg-opacity))",
    boxShadow: 24,
    p: 4,
};

interface ModalProps extends MuiModalProps {
    title?: string;
}

export default function Modal({ title, children, ...props }: ModalProps) {
    return (
        <MuiModal {...props}>
            <Box sx={style}>
                {title && (
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        {title}
                    </Typography>
                )}
                <Box sx={{ mt: 2 }}>{children}</Box>
            </Box>
        </MuiModal>
    );
}
