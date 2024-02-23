"use client";

import useForm from "@/contexts/singleForm";
import useAuth from "@/contexts/auth";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import SuggestionButton from "@/components/SuggestionButton";
import { Form } from "@@/types";

export default function Home() {
    const [isLoadingVisible, setLoadingVisible] = useState(false);
    const router = useRouter();
    const { user } = useAuth();
    const { createForm } = useForm(0);

    const handleCreateForm = async () => {
        setLoadingVisible(true);
        try {
            const newForm: Form = {
                id: 0,
                name: `${user?.name}'s Form`,
                description: "Write your description",
                user_id: user?.id || null,
                sections: [],
            };
            const createdForm = await createForm(newForm); // Capture the newly created form
            router.push(`/Form/${createdForm.id}`); // Redirect to the newly created form's ID
        } catch (error) {
            console.error("Error creating form", error);
        } finally {
            setLoadingVisible(false);
        }
    };

    return (
        <main className="grid h-[calc(100dvh-57.0667px)] w-dvw place-items-center p-4 sm:p-8 md:h-dvh">
            <div className="flex w-full flex-col items-center gap-y-4 md:gap-y-6">
                <h1 className="text-3xl font-bold md:text-4xl">Forms</h1>
                <div className="flex w-full flex-col items-center gap-y-6 md:gap-y-9 lg:w-[720px] xl:w-[820px]">
                    <div className="grid w-11/12 grid-cols-2 gap-x-2 gap-y-4">
                        <SuggestionButton />
                        <SuggestionButton />
                        <SuggestionButton />
                        <SuggestionButton />
                    </div>
                    <button
                        onClick={handleCreateForm}
                        className="w-full bg-primary-white px-2 py-3 text-primary-black"
                        disabled={isLoadingVisible}
                    >
                        {isLoadingVisible ? "Creating..." : "Create new form"}
                    </button>
                </div>
            </div>
        </main>
    );
}
