// SectionComponent.tsx
import React from "react";
import { Button, TextField } from "@mui/material";
import { Question, Section } from "@@/types";

type SectionComponentProps = {
    section: Section;
    updateSection: (sectionId: number, value: string) => void;
    handleDeleteSection: (sectionId: number) => void;
};

const SectionComponent: React.FC<SectionComponentProps> = ({
    section,
    updateSection,
    handleDeleteSection,
}) => {
    
    return (
        <section key={section.id} className="mb-4">
            <TextField
                fullWidth
                color="info"
                id={`section-title-${section.id}`}
                name={`section-title-${section.id}`}
                label="Section title"
                variant="filled"
                defaultValue={section.title}
                onChange={(e) => updateSection(section.id, e.target.value)}
            />
            {Array.isArray(section.questions) &&
            section.questions.length > 0 ? (
                section.questions
                    .sort((a, b) => a.id - b.id)
                    .map((question: Question) => (
                        <div key={question.id}>
                            <h1>{question.id}.</h1>
                            <h1>{question.type}</h1>
                            <h1>{question.prompt}</h1>
                        </div>
                    ))
            ) : (
                <p>No Questions found.</p>
            )}

            <Button
                onClick={() => handleDeleteSection(section.id)}
                variant="outlined"
                color="secondary"
            >
                Delete Section
            </Button>
        </section>
    );
};

export default SectionComponent;
