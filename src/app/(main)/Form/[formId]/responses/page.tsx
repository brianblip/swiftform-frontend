"use client";

import useSWR from "swr";
import { fetcher } from "@/utils";
import { Response, Form, User } from "@@/types";
import Link from "next/link";

interface ResponseItemProps {
    response: Response;
    formId: string;
}

function ResponseItem({ response, formId }: ResponseItemProps) {
    const { data: userData } = useSWR<User>(
        `/users/me?user_id=${response.user_id}`,
        fetcher,
    );

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <li key={response.id} className="py-2">
            <Link
                href={`/Form/${formId}/responses/${response.id}`}
                className="text-blue-500 hover:text-blue-700"
            >
                {userData.name} - {response.created_at}
            </Link>
        </li>
    );
}

export default function ResponseList({
    params,
}: {
    params: { formId: string };
}) {
    const { formId } = params;

    const { data: formData } = useSWR<Form>(`/forms/${formId}`, fetcher);
    const { data: responsesData } = useSWR<Response[]>(
        `/responses?form_id=${formId}`,
        fetcher,
    );

    if (!formData || !responsesData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto mt-5">
            <div className="border border-black p-4">
                <h2 className="text-xl font-bold">{formData.name}</h2>
                <ul className="mt-4">
                    {responsesData.map((response) => (
                        <ResponseItem
                            key={response.id}
                            response={response}
                            formId={formId}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
}
