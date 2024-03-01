import CloseIcon from "@mui/icons-material/Close";


export default function Modal() {
    return (
        <section
            className={`fixed left-0 top-0 z-50 h-dvh w-dvw place-items-center bg-primary-black/50`}
        >
            <div className="relative w-10/12 rounded bg-primary-secondary p-4 sm:w-[500px]">
                <button className="absolute right-0 top-0 rounded hover:bg-primary-neutral">
                    <CloseIcon />
                </button>
            Modal
            </div>
        </section>
    );
}

// import * as React from "react";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";

// import {
//     Modal as MuiModal,
//     ModalProps as MuiModalProps,
//     BoxProps,
// } from "@mui/material";
// import { ReactNode } from "react";

// const style = {
//     position: "absolute" as "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     width: 400,
//     bgcolor: "rgb(52 53 65 / var(--tw-bg-opacity))",
//     boxShadow: 24,
//     p: 4,
// };

// interface ModalProps extends Omit<MuiModalProps, "children"> {
//     children: ReactNode | ReactNode[];
// }

// export default function Modal({ children, ...props }: ModalProps) {
//     return (
//         <MuiModal {...props}>
//             <Box sx={style}>{children}</Box>
//         </MuiModal>
//     );
// }

// function Title({ children }: { children: ReactNode }) {
//     return (
//         <Typography id="modal-modal-title" variant="h6" component="h2">
//             {children}
//         </Typography>
//     );
// }

// function Section({ children, ...props }: BoxProps) {
//     return (
//         <Box sx={{ my: 4 }} {...props}>
//             {children}
//         </Box>
//     );
// }

// function Footer({ children, ...props }: BoxProps) {
//     return (
//         <Box sx={{ display: "flex", justifyContent: "flex-end" }} {...props}>
//             {children}
//         </Box>
//     );
// }

// Modal.Title = Title;
// Modal.Section = Section;
// Modal.Footer = Footer;
