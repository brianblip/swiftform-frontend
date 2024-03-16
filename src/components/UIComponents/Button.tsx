import cn from "@/utils/cn";
import { cva } from "cva";
import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "modal" | "exit" | "navbar";
};

export default function Button({ variant, ...props }: ButtonProps) {
    return (
        <button
            {...props}
            className={buttonVariants({ variant })}
        />
    );
}

const buttonVariants = cva("w-full rounded px-5 py-3 transition", {
    variants: {
        variant: {
            primary:
                "bg-primary-secondary text-white hover:bg-primary-white/25 disabled:bg-primary-black disabled:text-primary-neutral",
            secondary:
                "bg-white text-primary-black hover:bg-white/75 disabled:bg-white/50 disabled:text-primary-neutral",
            modal: "bg-primary-neutral hover:bg-primary-black/50 disabled:bg-primary-black disabled:text-primary-neutral",
            exit: "absolute right-0 top-0 w-fit p-0 hover:bg-error",
            navbar: "flex gap-2 rounded p-2 hover:bg-primary-secondary",
        },
    },
    defaultVariants: {
        variant: "primary",
    },
});
