import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLButtonElement> {
    title: string;
    subtitle: string;
}

export default function SuggestionButton({ title, subtitle, ...props }: Props) {
    return (
        <button className="bg-primary-secondary px-2 py-3" {...props}>
            <h1 className="font-semibold">{title}</h1>
            <p>{subtitle}</p>
        </button>
    );
}
