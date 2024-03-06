import Input from "../../../components/Input";
import React, { useRef, useState } from "react";
import axios from "axios";
import { useEffect } from "react";

export default function ProfileInformation() {
    const formRef = useRef<HTMLFormElement | null>(null);
    const fileRef = useRef<HTMLInputElement | null>(null);
    const [imageSrc, setImageSrc] = useState("");

    console.log("Initial imageSrc:", imageSrc);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            setImageSrc(URL.createObjectURL(file));
        } else {
            setImageSrc("");
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!formRef.current) return; // Check if formRef is null
        const formData = new FormData(formRef.current);
        const file = fileRef.current?.files?.[0]; // Get the selected file
        if (file) formData.append("file", file);

        try {
            const response = await axios.patch(
                "http://localhost:5000/api/v1/upload",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true,
                },
            );
            const avatar_url = response.data.avatar_url;
            if (avatar_url) {
                setImageSrc(`http://localhost:5000${response.data.avatar_url}`);
            }
            console.log("Success:");
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const fetchUserProfile = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/v1/users/me",
                {
                    withCredentials: true,
                },
            );
            const avatarUrl = response.data.data.avatar_url;
            if (avatarUrl) {
                setImageSrc(`http://localhost:5000${avatarUrl}`);
            } else {
                setImageSrc("");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        fetchUserProfile();
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
                    style={{ display: "none" }} // Hide the file input
                />
                <button
                    type="button"
                    className="cursor-pointer rounded bg-primary-secondary px-4 py-2 text-center"
                    onClick={() => fileRef.current?.click()}
                >
                    Change picture
                </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
                <Input
                    type="name"
                    placeholder="First name"
                    label="First name"
                    size="md"
                    id="firstName"
                />
                <Input
                    type="name"
                    placeholder="Last name"
                    label="Last name"
                    size="md"
                    id="lastName"
                />
            </div>
            <div className="mb-4">
                <Input
                    type="email"
                    placeholder="Email"
                    label="Email"
                    size="full"
                    id="email"
                />
            </div>
            <button className="rounded bg-primary-secondary px-8 py-2">
                Save Changes
            </button>
        </form>
    );
}
