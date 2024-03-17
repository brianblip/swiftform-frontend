import cn from "@/utils/cn";
import { cva } from "cva";
import React from "react";

type MainProps = React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
> & {
    variant?: "primary" | "form" | "auth";
};

export default function Main({ className, variant, ...props }: MainProps) {
    return (
        <main {...props} className={cn(mainVariants({ variant }), className)} />
    );
}

const mainVariants = cva("flex h-dvh w-dvw items-center justify-center", {
    variants: {
        variant: {
            primary: "h-[calc(100dvh-57.0667px)] p-4 sm:p-8 md:h-dvh xl:px-16",
            form: "h-[calc(100vh-57.0667px)] flex-col justify-start gap-8 overflow-scroll px-4 py-10 sm:px-8 md:h-dvh md:py-16 xl:p-16",
            auth: "p-4",
        },
    },
    defaultVariants: {
        variant: "primary",
    },
});
