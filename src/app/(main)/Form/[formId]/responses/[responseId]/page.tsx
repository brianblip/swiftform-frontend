"use client";

import useSWR from "swr";
import { fetcher } from "@/utils";
import { Response, Form, Question } from "@@/types";

export default function ResponsePage({
    params,
}: {
    params: { responseId: string; formId: string };
}) {
    const { responseId, formId } = params;

    const { data: responseData } = useSWR<Response>(
        `/responses/${responseId}`,
        fetcher,
    );

    const { data: formData } = useSWR<Form>(`/forms/${formId}`, fetcher);

    if (!responseData || !formData) {
        return <div>Loading...</div>;
    }

    const getNumResponses = (question: Question) => {
        const answersForQuestion = responseData.answers.filter(
            (answer) => answer.question_id === question.id,
        );
        return answersForQuestion.length;
    };

    return (
        <div className="container mx-auto mt-24">
            <div className="border border-black p-4">
                <h2>{formData.name}</h2>
                {formData.sections.map((section) => (
                    <div key={section.id} className="mt-4">
                        <h3>{section.title}</h3>
                        {section.questions.map((question) => (
                            <div key={question.id} className="mt-8">
                                <p>{question.prompt}</p>
                                <p>{getNumResponses(question)} responses</p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
