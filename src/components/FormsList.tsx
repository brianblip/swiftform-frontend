import Link from "next/link";
import { useEffect, useState } from "react";
import { DeleteForeverOutlined, MoreHoriz } from "@mui/icons-material";
import ErrorPage from "@/components/ErrorPage";

interface FormData {
    id: number;
    title: string;
}

interface FormListID {
    formId: number;
}

export default function FormsList({ formId }: FormListID) {
    const [forms, setForms] = useState<FormData[] | null>(null);
    const [isLoadingVisible, setLoadingVisible] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoadingVisible(true);
            try {
                const apiUrl = process.env.NEXT_PUBLIC_FRONTEND_API_URL;
                if (!apiUrl) {
                    throw new Error("API URL is not defined");
                }
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error(`HTTP error ${response.status}`);
                }
                const data: FormData[] = await response.json();
                setForms(data);
            } catch (error) {
                setError(String(error));
            } finally {
                setLoadingVisible(false);
            }
        };

        fetchData();

        window.addEventListener("formCreated", fetchData);

        return () => {
            window.removeEventListener("formCreated", fetchData);
        };
    }, []);

    const handleDelete = async (id: number, title: string) => {
        const isConfirmed = window.confirm(
            `Are you sure you want to delete the form "${title}"?`,
        );

        if (!isConfirmed) {
            return;
        }

        try {
            const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/${id}`;
            const response = await fetch(apiUrl, { method: "DELETE" });

            if (!response.ok) {
                throw new Error(`HTTP error ${response.status}`);
            }

            // Trigger a refetch after deletion
            window.dispatchEvent(new CustomEvent("formCreated"));
        } catch (error) {
            console.error("Error deleting form:", error);
        }
    };

    return (
        <>
            {isLoadingVisible ? (
                <section className="flex size-full animate-pulse flex-col gap-2 overflow-y-auto py-4">
                    {Array.from({ length: 3 }, (_, i) => (
                        <div
                            key={i}
                            className="m-2 h-8 rounded bg-primary-secondary/75"
                        ></div>
                    ))}
                </section>
            ) : error ? (
                <ErrorPage />
            ) : (
                <ul className="flex size-full flex-col gap-2 overflow-y-auto py-4">
                    {forms &&
                        forms.map((form) => (
                            <li key={form.id}>
                                <Link
                                    href={`/form/${form.id}`}
                                    className={`group relative flex items-center rounded p-2 hover:bg-primary-secondary ${form.id == formId ? "bg-primary-secondary" : ""}`}
                                >
                                    <h2 className="truncate whitespace-nowrap rounded text-sm">
                                        {form.title}
                                    </h2>
                                    <div className="absolute right-0 hidden rounded pr-2 group-hover:flex">
                                        <button
                                            onClick={() => console.log("hi")}
                                        >
                                            <MoreHoriz className="text-2xl hover:text-zinc-500" />
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(
                                                    form.id,
                                                    form.title,
                                                )
                                            }
                                        >
                                            <DeleteForeverOutlined className="text-2xl hover:text-red-500" />
                                        </button>
                                    </div>
                                </Link>
                            </li>
                        ))}
                </ul>
            )}
        </>
    );
}
