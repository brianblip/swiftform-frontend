import Input from "../../../components/Input";
import React, { useRef, useState, useEffect, useCallback } from "react";
import axios from "axios";
import api from "@/services/api";

export default function ProfileInformation() {
    const formRef = useRef<HTMLFormElement | null>(null);
    const fileRef = useRef<HTMLInputElement | null>(null);
    const [imageSrc, setImageSrc] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");

    const handleFullNameChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setFullName(e.target.value);
        },
        [],
    );

    const handleFileChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];

            if (file) {
                setImageSrc(URL.createObjectURL(file));
            } else {
                setImageSrc("");
            }
        },
        [], // No dependencies for now
    );

    const backendURL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!formRef.current) return; // Check if formRef is null

        try {
            const response = await api.get("/users/me", {
                withCredentials: true,
            });
            const { name } = response.data.data;

            // Check if the name has changed before updating
            if (name !== fullName) {
                // Update name if it has changed
                const updateResponse = await api.patch(
                    "/users/me",
                    { name: fullName },
                    { withCredentials: true },
                );
                console.log("Name updated successfully");
            }

            const file = fileRef.current?.files?.[0]; // Get the selected file
            if (file) {
                const formData = new FormData(formRef.current);
                formData.append("file", file);
                const response = await api.patch("/upload", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true,
                });
                const avatar_url = response.data.avatar_url;
                if (avatar_url) {
                    setImageSrc(`${backendURL}${response.data.avatar_url}`);
                }
                console.log("Picture uploaded successfully");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/users/me", {
                    withCredentials: true,
                });
                const { name, email, avatar_url } = response.data.data;
                setFullName(name);
                setEmail(email);
                if (avatar_url) {
                    setImageSrc(`${backendURL}${avatar_url}`);
                } else {
                    setImageSrc("");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchData();
    }, []);

    console.log("Current imageSrc:", imageSrc);

    return (
        <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="grid w-full gap-4 sm:w-11/12 md:w-full lg:w-[640px]"
        >
            <p className="text-xl font-medium">Profile Information</p>
            <div className="flex items-center justify-center gap-8">
                <div
                    className="flex aspect-square h-[120px] items-center justify-center rounded-full border "
                    style={{
                        backgroundImage: `url(${imageSrc})`,
                        backgroundSize: "cover",
                    }}
                ></div>
                <input
                    type="file"
                    ref={fileRef}
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                />
                <button
                    type="button"
                    className="cursor-pointer rounded bg-primary-secondary px-4 py-2 text-center"
                    onClick={() => fileRef.current?.click()}
                >
                    Change picture
                </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1">
                <Input
                    type="Fullname"
                    placeholder="Fullname"
                    label="Fullname"
                    size="md"
                    id="fullname"
                    value={fullName}
                    onChange={handleFullNameChange}
                />
                <Input
                    type="email"
                    placeholder="Email"
                    label="Email"
                    size="md"
                    id="email"
                    value={email}
                />
            </div>
            <button
                type="submit"
                className="rounded bg-primary-secondary px-8 py-2"
            >
                Save Changes
            </button>
        </form>
    );
}
