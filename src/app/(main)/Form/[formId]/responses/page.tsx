"use client";

import useSWR from "swr";
import { fetcher } from "@/utils";
import { Response, Form, User } from "@@/types";
import Link from "next/link";
import LaunchIcon from "@mui/icons-material/Launch";
import LoadingPage from "@/components/LoadingPage";

interface ResponseItemProps {
    formId: string;
    user_id: number;
    response: Response;
}

function ResponseItem({ user_id, response, formId }: ResponseItemProps) {
    const { data: userData } = useSWR<User>(`/users/${user_id}`, fetcher);

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <li
            key={user_id}
            className="border-b border-white/50 py-4 last:border-none"
        >
            <Link
                href={`/Form/${formId}/responses/${response.id}`}
                className="grid grid-cols-2 gap-2 rounded p-2 text-white hover:bg-primary-secondary"
            >
                <div className="flex items-center gap-2">
                    <LaunchIcon fontSize="small" />
                    <p className="">Respondent: {userData.name}</p>
                </div>
                <p>Date: {response.created_at}</p>
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
        return (
            <div className="container flex flex-col items-center justify-center">
                <LoadingPage />
            </div>
        );
    }

    return (
        <div className="grid w-full gap-4 sm:w-11/12 lg:w-9/12 xl:w-[660px]">
            <div className="relative grid gap-4 rounded border border-white/50 px-4 py-6 shadow-md">
                <h2 className="text-center text-xl font-bold capitalize">
                    {formData.name} responses
                </h2>
                <ul className="flex flex-col">
                    {Array.isArray(responsesData) &&
                    responsesData.length > 0 ? (
                        responsesData.map((response) => (
                            <ResponseItem
                                key={response.id}
                                response={response}
                                user_id={response.user_id}
                                formId={formId}
                            />
                        ))
                    ) : (
                        <p className="text-center">No responses found.</p>
                    )}
                </ul>
            </div>
        </div>
    );
}
