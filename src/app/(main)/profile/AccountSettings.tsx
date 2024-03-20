import Input from "@/components/ui/Input";
import api from "@/services/api";
import React, { useState } from "react";
import { handleApiError } from "@/utils";
import { toast } from "react-toastify";

export default function AccountSettings() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [newPasswordError, setNewPasswordError] = useState(false);
    const [confirmNewPasswordError, setConfirmNewPasswordError] =
        useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleNewPasswordChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const password = e.target.value;
        setNewPassword(password);
        setNewPasswordError(password.length < 8);
    };

    const handleConfirmNewPasswordChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const confirmPassword = e.target.value;
        setConfirmNewPassword(confirmPassword);
        setConfirmNewPasswordError(confirmPassword !== newPassword);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!currentPassword || !newPassword || !confirmNewPassword) {
            toast.error("Please fill out all required fields");
            return;
        }

        if (newPasswordError || confirmNewPasswordError) {
            return;
        }

        try {
            setIsLoading(true);
            const response = await api.patch(
                "/users/me",
                {
                    current_password: currentPassword,
                    new_password: newPassword,
                },
                { withCredentials: true },
            );

            if (newPassword === currentPassword) {
                toast.error(
                    "New password cannot be the same as the current password",
                );
            } else {
                toast.success(response.data.message);
                setCurrentPassword("");
                setNewPassword("");
                setConfirmNewPassword("");
            }
        } catch (error) {
            handleApiError(error);
        } finally {
            setIsLoading(false); // Set loading state to false after API call
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="grid w-full gap-4 sm:w-11/12 md:w-full lg:w-[640px]"
        >
            <p className="text-xl font-medium">Account Setting</p>
            <Input
                type="password"
                id="currentPassword"
                label="Current Password"
                placeholder="Current Password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <div className="mb-4">
                <Input
                    label="New Password"
                    id="newPassword"
                    type="password"
                    placeholder="New Password"
                    required
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                    isError={newPasswordError}
                    helperText="The password must be at least 8 characters long"
                />
            </div>
            <div className="mb-4">
                <Input
                    label="Confirm New Password"
                    id="confirmNewPassword"
                    type="password"
                    placeholder="Confirm New Password"
                    required
                    value={confirmNewPassword}
                    onChange={handleConfirmNewPasswordChange}
                    isError={confirmNewPasswordError}
                    helperText="New password and confirm new password do not match"
                />
            </div>
            <button
                type="submit"
                className="rounded bg-primary-secondary px-8 py-2"
                disabled={isLoading}
            >
                {isLoading ? "Saving..." : "Save Changes"}
            </button>
        </form>
    );
}
