// ResponseComponent.tsx
import React from "react";
import TexFieldResponse from "./FormResponseComponent/TexFieldResponse";
import FormResponseHeader from "./FormResponseComponent/FormResponseHeader";
export default function ResponseComponent() {
    return (
        <div className="flex w-full flex-col items-center gap-y-4">
            <FormResponseHeader />
            {/* TODO Loop response instead of hardcoding */}
            <TexFieldResponse />
        </div>
    );
}
