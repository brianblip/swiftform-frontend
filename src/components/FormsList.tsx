import Link from "next/link";
import { useEffect, useState } from "react";
import { DeleteForeverOutlined, MoreHoriz } from "@mui/icons-material";

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
                const apiUrl = process.env.NEXT_PUBLIC_API_URL;
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
        <div className="h-full w-full py-4">
            {isLoadingVisible ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error fetching data: {error}</p>
            ) : (
                <ul>
                    {forms &&
                        forms.map((form) => (
                            <li key={form.id} className="flex">
                                <Link
                                    href={`/Form/${form.id}`}
                                    className={`group relative flex w-full items-center justify-between rounded p-2 transition-all ease-in-out hover:bg-primary-secondary ${form.id == formId ? "bg-primary-secondary" : ""}`}
                                >
                                    <h2 className="w-full grow overflow-hidden truncate whitespace-nowrap rounded text-sm">
                                        {form.title}
                                    </h2>
                                    <div className="h-fll absolute right-0 flex w-24 justify-end rounded opacity-0 group-hover:opacity-100">
                                        <div className="w-2/6 border-slate-50 bg-gradient-to-r from-transparent from-10% to-primary-secondary"></div>
                                        <div className="flex w-4/6 justify-end rounded-r bg-primary-secondary">
                                            <button
                                                className="text-sm-white w-fit rounded"
                                                onClick={() =>
                                                    console.log("hi")
                                                }
                                            >
                                                <MoreHoriz className="text-2xl transition-colors ease-in-out hover:text-zinc-500" />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(
                                                        form.id,
                                                        form.title,
                                                    )
                                                }
                                                className="text-sm-white w-fit rounded"
                                            >
                                                <DeleteForeverOutlined className="text-2xl transition-colors ease-in-out hover:text-red-500" />
                                            </button>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                </ul>
            )}
        </div>
    );
}
