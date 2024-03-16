import { cva } from "cva";
import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "modal" | "exit" | "navbar";
};

export default function Button(props: ButtonProps) {
    return <button {...props} />;
}
