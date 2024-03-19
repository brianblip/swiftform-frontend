"use client";
import useSWR from "swr";
import { fetcher } from "@/utils";
import { Response, Form, Answer } from "@@/types";
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
    const getAnswersForQuestion = (questionId: number): Answer[] => {
        return responseData.answers.filter(
            (answer) => answer.question_id === questionId,
        );
    };

    const separateCheckboxValues = (text: string): string[] => {
        // Assuming the checkbox values are separated by commas within curly braces
        const regex = /{([^}]*)}/;
        const match = text.match(regex);
        if (match && match[1]) {
            return match[1].split(",").map((value) => value.trim());
        }
        return [];
    };

    return (
        <div className="container mx-auto mt-24">
            <div className="border border-black p-4">
                {formData.sections.map((section) => (
                    // section
                    <section
                        key={section.id}
                        className="mt-4 border border-white"
                    >
                        <h1>{section.title}</h1>
                        {section.questions.map((question) => (
                            <article
                                key={question.id}
                                className="mt-8 border border-white"
                            >
                                <h1>{question.prompt}</h1>
                                {getAnswersForQuestion(question.id).map(
                                    (answer) => (
                                        <div
                                            key={question.id}
                                            className="ml-4 mt-2"
                                        >
                                            {answer.text}
                                        </div>
                                    ),
                                )}
                            </article>
                        ))}
                    </section>
                ))}
            </div>
        </div>
    );
}
