import { ReactNode } from "react";
import CloseIcon from "@mui/icons-material/Close";

interface ModalProps {
    children: ReactNode;
    createFormModalOpened: boolean;
    modalRef: any;
    setCreateFormModalOpened: any;
}

export default function Modal({
    children,
    createFormModalOpened,
    modalRef,
    setCreateFormModalOpened,
}: ModalProps) {
    return (
        <section
            className={`fixed left-0 top-0 z-50 h-dvh w-dvw place-items-center bg-primary-black/50 ${createFormModalOpened ? "grid" : "hidden"}`}
        >
            <div
                ref={modalRef}
                className="relative w-10/12 rounded bg-primary-secondary p-4 sm:w-[500px]"
            >
                <button
                    className="absolute right-0 top-0 rounded hover:bg-primary-neutral"
                    onClick={() => setCreateFormModalOpened(false)}
                >
                    <CloseIcon />
                </button>
            {children}
            </div>
        </section>
    );
}
