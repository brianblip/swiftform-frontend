import React from "react"; // Ensure React is imported for using React.forwardRef
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

interface InputProps {
    label: string;
    className?: any;
    id?: string;
    required?: boolean;
    type: "text" | "email" | "password" | "textarea" | "select";
    error?: string;
    isPasswordVisible?: boolean;
    setIsPasswordVisible?: any;
    children?: any;
}

// Wrap the component function with React.forwardRef
const Input = React.forwardRef<
    HTMLTextAreaElement | HTMLInputElement,
    InputProps
>(
    (
        {
            label,
            className,
            id,
            required,
            type,
            error,
            isPasswordVisible,
            setIsPasswordVisible,
            children,
            ...props
        },
        ref,
    ) => {
        // ref parameter added here
        return (
            <div className="grid gap-1">
                <label
                    htmlFor={label}
                    className={`text-sm font-medium ${error ? "text-error" : ""}`}
                >
                    {label}
                    {required ? "*" : ""}
                </label>
                {type === "textarea" ? (
                    <textarea
                        ref={ref as React.Ref<HTMLTextAreaElement>} // Use ref here for textarea
                        id={label}
                        className={`max-h-40 min-h-20 w-full rounded border-2 px-3 py-2 text-primary-black focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? "border-error focus:ring-error" : "border-transparent"}`}
                        {...props}
                    />
                ) : type === "text" ||
                  type === "email" ||
                  type === "password" ? (
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
                                      : isPasswordVisible
                                        ? "text"
                                        : "password"
                            }
                            id={label}
                            className={`w-full rounded border border-primary-black px-3 py-2 text-primary-black focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? "border-error focus:ring-error" : ""}`}
                            aria-invalid={error ? "true" : "false"}
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
