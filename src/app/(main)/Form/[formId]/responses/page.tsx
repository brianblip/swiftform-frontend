"use client";

import useSWR from "swr";
import { fetcher } from "@/utils";
import { Response, Form, User } from "@@/types";
import Link from "next/link";
import LaunchIcon from '@mui/icons-material/Launch';

interface ResponseItemProps {
    response: Response;
    formId: string;
}

function ResponseItem({ response, formId }: ResponseItemProps) {
    console.log(response)
    const { data: userData } = useSWR<User>(
        `/users/me?user_id=${response.user_id}`,
        fetcher,
    );

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <li key={response.id} className="border-b border-white/50 py-2">
            <Link
                href={`/Form/${formId}/responses/${response.id}`}
                className="flex justify-around text-white hover:text-blue-700"
            >
                <p className="w-1/2 text-center"><LaunchIcon fontSize="small"/> Respondent: {userData.name}</p>
                <p className="w-1/2 text-start">Date: {response.created_at}</p>
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

            <div className="relative grid gap-4 rounded border border-white/50 px-4 py-6 shadow-md">
                <h2 className="text-center text-xl font-bold capitalize">{formData.name} responses</h2>
                <ul className="mt-4">
                    {responsesData
                        .sort((a, b) => {
                            const dateA: Date = new Date(a.created_at);
                            const dateB: Date = new Date(b.created_at);
                            return dateB.getTime() - dateA.getTime();
                        })
                        .map((response) => (
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
