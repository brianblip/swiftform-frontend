"use client";

import useAuth from "@/store/useAuth";
import { useRouter } from "next/navigation";
import SuggestionButton from "@/components/SuggestionButton";
import { useState } from "react";
import useUserId from "@/store/useUserId";
import useUserData from "@/store/useUserData";

export default function Home() {
    const [isLoadingVisible, setLoadingVisible] = useState(false);
    const router = useRouter();
    const userId = useUserId();
    const userData = useUserData();

    const handleCreateForm = async () => {
        setLoadingVisible(true);

        try {
            if (!userId || userId === 0) {
                console.error("User not authenticated or invalid userId.");
                return;
            }

            const apiUrl = process.env.NEXT_PUBLIC_FRONTEND_API_URL;
            if (!apiUrl) {
                throw new Error("You need to set PUBLIC_API_URL first.");
            }
            const formData = {
                owner_id: userId,
                title: "Write your form title",
                description: "Write your description",
                fields: [
                    {
                        field_id: 1,
                        question_name: "",
                        question_type: "",
                        question: "",
                        required_field: false,
                    },
                ],
            };

            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const responseData = await response.json();
                window.dispatchEvent(new CustomEvent("formCreated"));
                router.push(`/Form/${responseData.id}`);
            } else {
                console.error("Error creating form");
            }
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
