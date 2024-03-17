import React from "react"; // Ensure React is imported for using React.forwardRef
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import cn from "@/utils/cn";
import { cva } from "cva";

type InputProps = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
> &
    React.DetailedHTMLProps<
        React.TextareaHTMLAttributes<HTMLTextAreaElement>,
        HTMLTextAreaElement
    > &
    React.DetailedHTMLProps<
        React.SelectHTMLAttributes<HTMLSelectElement>,
        HTMLSelectElement
    > & {
        label?: string;
        type: "text" | "email" | "password" | "textarea" | "select" | "date";
        onChange?: any;
        error?: string;
        isPasswordVisible?: boolean;
        setIsPasswordVisible?: any;
        variant?:
            | "primary"
            | "auth"
            | "authpassword"
            | "textarea"
            | "form"
            | "formSelect";
    };

// Wrap the component function with React.forwardRef
const Input = React.forwardRef<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement,
    InputProps
>(
    (
        {
            label,
            id,
            className,
            required,
            onChange,
            type,
            error,
            variant,
            isPasswordVisible,
            setIsPasswordVisible,
            children,
            ...props
        },
        ref,
    ) => {
        // ref parameter added here
        return (
            <div className="grid w-full">
                {label && (
                    <label
                        htmlFor={id ? id : label}
                        className={`pb-1 text-sm font-medium ${error ? "text-error" : ""}`}
                    >
                        {label}
                        {required ? "*" : ""}
                    </label>
                )}
                {type === "textarea" ? (
                    <textarea
                        ref={ref as React.Ref<HTMLTextAreaElement>} // Use ref here for textarea
                        id={id ? id : label}
                        className={`${cn(error ? "border-error focus:ring-error" : " focus:ring-blue-500", inputVariants({ variant }), className)}`}
                        onChange={onChange}
                        {...props}
                    />
                ) : type === "text" ||
                  type === "email" ||
                  type === "password" ||
                  type === "date" ? (
                    <div
                        className={`${type === "password" ? "relative flex items-center" : ""}`}
                    >
                        <input
                            ref={ref as React.Ref<HTMLInputElement>} // Use ref here for input
                            type={
                                type === "text"
                                    ? "text"
                                    : type === "email"
                                      ? "email"
                                      : type === "date"
                                        ? "date"
                                        : isPasswordVisible
                                          ? "text"
                                          : "password"
                            }
                            id={id ? id : label}
                            className={`${cn(
                                error
                                    ? "border-error focus:ring-error"
                                    : "focus:ring-blue-500",
                                inputVariants({ variant }),
                                className,
                            )}`}
                            aria-invalid={error ? "true" : "false"}
                            onChange={onChange}
                            {...props}
                        />
                        {type === "password" && (
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setIsPasswordVisible(!isPasswordVisible);
                                }}
                                className="absolute right-0 mr-2 hover:text-primary-secondary"
                            >
                                {isPasswordVisible ? (
                                    <VisibilityOffIcon />
                                ) : (
                                    <VisibilityIcon />
                                )}
                            </button>
                        )}
                    </div>
                ) : type === "select" ? (
                    <select
                        id={id ? id : label}
                        className={`${cn(
                            error
                                ? "border-error focus:ring-error"
                                : "focus:ring-blue-500",
                            inputVariants({ variant }),
                            className,
                        )}`}
                        onChange={onChange}
                        {...props}
                    >
                        {children}
                    </select>
                ) : (
                    <p className="w-full">
                        Sorry, you didn&rsquo;t specify the type of the input
                    </p>
                )}
                {error && <p className="mx-2 text-xs text-error">{error}</p>}
            </div>
        );
    },
);

Input.displayName = "Input";

export default Input;

const inputVariants = cva(
    "w-full rounded border px-3 py-2 focus:outline-none focus:ring-2",
    {
        variants: {
            variant: {
                primary: "text-primary-black",
                auth: "border-primary-black text-primary-black",
                authpassword: "border-primary-black pr-9 text-primary-black",
                textarea: "max-h-40 min-h-20 text-primary-black",
                form: "border-transparent bg-primary-secondary hover:bg-primary-white/15 focus:bg-primary-white/25",
                formSelect:
                    "cursor-pointer border-transparent bg-primary-secondary",
            },
        },
        defaultVariants: {
            variant: "primary",
        },
    },
);
