import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLButtonElement> {
    title: string;
    subtitle: string;
}

export default function SuggestionButton({ title, subtitle, ...props }: Props) {
    return (
        <button
            className="flex flex-col gap-1 rounded bg-primary-secondary px-2 py-3 text-left"
            {...props}
        >
            <h1 className="font-semibold">{title}</h1>
            <p className="text-sm">{subtitle}</p>
        </button>
    );
}
