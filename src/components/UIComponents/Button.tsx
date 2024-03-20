import cn from "@/utils/cn";
import { cva } from "cva";
import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?:
        | "primary"
        | "secondary"
        | "modal"
        | "add"
        | "exit"
        | "trash"
        | "navbar"
        | "auth"
        | "copy";
    size?: "sm" | "base" | "xs" | "navbar";
};

export default function Button({
    className,
    variant,
    size,
    ...props
}: ButtonProps) {
    const buttonVariants = cva("w-full rounded transition", {
        variants: {
            variant: {
                primary:
                    "bg-primary-secondary text-white hover:bg-primary-white/25 disabled:bg-primary-black disabled:text-primary-neutral",
                secondary:
                    "bg-white text-primary-black hover:bg-white/75 disabled:bg-white/50 disabled:text-primary-neutral",
                modal: "bg-primary-neutral hover:bg-primary-black/50 disabled:bg-primary-black disabled:text-primary-neutral",
                add: "w-fit rounded bg-lime-700 hover:bg-lime-700/75",
                exit: "absolute right-0 top-0 w-fit hover:bg-error",
                trash: "w-fit bg-error hover:bg-error/50",
                navbar: "flex gap-2 p-2 hover:bg-primary-secondary",
                auth: "bg-primary-black text-white hover:bg-primary-black/75",
                copy: "absolute right-8 top-0 w-fit hover:bg-lime-700",
            },
            size: {
                xs: "p-1",
                sm: "px-4 py-2",
                base: "px-5 py-3",
                navbar: "p-4 md:p-2",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "base",
        },
    });

    return (
        <button
            className={cn(buttonVariants({ variant, size }), className)}
            {...props}
        />
    );
}
