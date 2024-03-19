"use client";
import useSWR from "swr";
import { fetcher } from "@/utils";
import { Response, Form, Answer } from "@@/types";
import Main from "@/components/UIComponents/Main";
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
        <Main variant="form">
            <div className="flex w-full flex-col items-center gap-8 sm:w-11/12 lg:w-9/12 xl:w-[660px]">
                <h1 className="w-full text-left text-2xl font-bold">
                    {formData.name}
                </h1>
                <div className="grid w-full gap-4">
                    {formData.sections.map((section) => (
                        // section
                        <section
                            key={section.id}
                            className="grid gap-4 rounded border border-white/50 p-4 shadow-md"
                        >
                            <h1 className="text-xl font-semibold">
                                {section.title}
                            </h1>
                            {section.questions.map((question) => (
                                <div
                                    key={question.id}
                                    className="relative ml-5 grid items-center gap-1 rounded border border-white/25 p-2 shadow-md before:absolute before:right-[calc(100%+8px)] before:size-3 before:rounded-full before:bg-white"
                                >
                                    <h1>{question.prompt}</h1>
                                    {getAnswersForQuestion(question.id).map(
                                        (answer) => (
                                            <div key={question.id}>
                                                <p className="flex flex-col gap-1">
                                                    <span className="italic">
                                                        Answer:
                                                    </span>
                                                    {answer.text}
                                                </p>
                                            </div>
                                        ),
                                    )}
                                </div>
                            ))}
                        </section>
                    ))}
                </div>
            </div>
        </Main>
    );
}
