// ResponseComponent.tsx
import React from "react";

export interface ResponseProps {
    user_id: number;
    owner_id: number;
}

export default function ResponseComponent({
    user_id,
    owner_id,
}: ResponseProps) {
    if (user_id !== owner_id) {
        return <p>You are not authorized to access this form.</p>;
    }
    return (
        <div>
            <h2>Response Section</h2>
            {/* You can now access user_id and titleInput in this component */}
            <p>User ID: {user_id}</p>
        </div>
    );
}
