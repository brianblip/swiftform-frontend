"use client";

import useSWR from "swr";
import { fetcher } from "@/utils";
import { Response, Form } from "@@/types";
import Link from "next/link";

export default function ResponseList({
    params,
}: {
    params: { formId: string };
}) {
    const { formId } = params;

    const { data: formData } = useSWR<Form>(`/forms/${formId}`, fetcher);
    const { data: responsesData } = useSWR<Response[]>(
        `/responses?formId=${formId}`,
        fetcher,
    );

    if (!formData || !responsesData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto mt-24">
            <div className="border border-black p-4">
                <h2>{formData.name}</h2>
                <ul>
                    {responsesData.map((response) => (
                        <li key={response.id}>
                            <Link
                                href={`/Form/${formId}/responses/${response.id}`}
                            >
                                Response #{response.id}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
