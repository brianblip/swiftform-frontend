import { ReactNode, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useClickAway } from "react-use";
import Button from "./UIComponents/Button";

interface ModalProps {
    children: ReactNode;
    createFormModalOpened: boolean;
    setCreateFormModalOpened: any;
}

export default function Modal({
    children,
    createFormModalOpened,
    setCreateFormModalOpened,
}: ModalProps) {
    const ref = useRef<HTMLDivElement>(null);
    useClickAway(ref, (e: MouseEvent) => {
        if (ref.current && !ref.current.contains(e.target as Node)) {
            setCreateFormModalOpened(false);
        }
    });

    return (
        <section
            className={`fixed left-0 top-0 z-50 size-full items-center justify-center bg-primary-black/50 ${createFormModalOpened ? "flex" : "hidden"}`}
        >
            <div
                ref={ref}
                className="relative w-10/12 rounded bg-primary-secondary p-4 sm:w-[500px]"
            >
                <Button
                    variant="exit"
                    size="xs"
                    onClick={() => setCreateFormModalOpened(false)}
                >
                    <CloseIcon />
                </Button>
                {children}
            </div>
        </section>
    );
}
