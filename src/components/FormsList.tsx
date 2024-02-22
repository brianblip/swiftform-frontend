import Link from "next/link";
import useForm from "@/contexts/allForms";
import { useEffect, useState } from "react";
import ErrorPage from "@/components/ErrorPage";
import { DeleteForeverOutlined, MoreHoriz } from "@mui/icons-material";

interface FormListID {
    formId: number;
}

export default function FormsList({ formId }: FormListID) {
    const { forms, isLoading, error, fetchForms, deleteForm } = useForm();
    

    useEffect(() => {
        fetchForms();
    }, [fetchForms]);

    const handleDelete = async (id: number, title: string) => {
        const isConfirmed = window.confirm(
            `Are you sure you want to delete the form "${title}"?`,
        );

        if (!isConfirmed) {
            return;
        }

        try {
            await deleteForm(id);
            // Trigger a refetch after deletion
            window.dispatchEvent(new CustomEvent("formCreated"));
        } catch (error) {
            console.error("Error deleting form:", error);
        }
    };

    return (
        <>
            {isLoading ? (
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
                                    href={`/Form/${form.id}`}
                                    className={`group relative flex items-center rounded p-2 hover:bg-primary-secondary ${form.id == formId ? "bg-primary-secondary" : ""}`}
                                >
                                    <h2 className="truncate whitespace-nowrap rounded text-sm">
                                        {form.name}
                                    </h2>
                                    <div className="absolute right-0 hidden rounded pr-2 group-hover:flex">
                                        <button
                                            onClick={() => console.log("hi")}
                                        >
                                            <MoreHoriz className="text-2xl hover:text-zinc-500" />
                                        </button>
                                        <button
                                        onClick={() =>
                                            handleDelete(form.id, form.name)
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
