import useSWR, { mutate } from "swr";
import { Section } from "@@/types";
import api from "@/services/api";
import { createStore, StoreApi } from "zustand";
import { createContext, ReactNode, useContext } from "react";

type SectionState = {
    sections: Section[];
    isLoading: boolean;
    error: string | null;
    createSection: (title: string, formId: number) => Promise<Section>;
    updateSection: (sectionId: number, title: string) => Promise<Section>;
    deleteSection: (sectionId: number) => Promise<void>;
};

const useSectionStore = () => {
    const fetcher = async (url: string) => {
        const { data } = await api.get(url);
        return data.data || data;
    };

    const {
        data: sections,
        error,
        mutate: mutateSections,
    } = useSWR<Section[]>("/sections", fetcher);

    return createStore<SectionState>((set) => ({
        sections: sections || [],
        isLoading: !sections && !error,
        error: error ? "Error loading sections" : null,

        createSection: async (title: string, formId: number) => {
            try {
                const { data } = await api.post("/sections", {
                    title,
                    form_id: formId,
                });
                mutateSections([...(sections || []), data.data], false);
                return data.data;
            } catch (error) {
                console.error("Error creating section:", error);
                throw error;
            }
        },

        updateSection: async (sectionId: number, title: string) => {
            try {
                const { data } = await api.put(`/sections/${sectionId}`, {
                    title,
                });
                const updatedSections = (sections || []).map((section) =>
                    section.id === sectionId ? data.data : section,
                );
                mutateSections(updatedSections, false); // Mutate and revalidate
                return data.data;
            } catch (error) {
                console.error("Error updating section:", error);
                throw error;
            }
        },

        deleteSection: async (sectionId: number) => {
            try {
                await api.delete(`/sections/${sectionId}`);
                const updatedSections = (sections || []).filter(
                    (section) => section.id !== sectionId,
                );
                mutateSections(updatedSections, false); // Mutate and revalidate
            } catch (error) {
                console.error("Error deleting section:", error);
                throw error;
            }
        },
    }));
};


export const SectionContext = createContext<StoreApi<SectionState> | null>(
    null,
);

export function SectionProvider({ children }: { children: ReactNode }) {
    const sectionStore = useSectionStore(); // Call the useSectionStore function
    return (
        <SectionContext.Provider value={sectionStore}>
            {children}
        </SectionContext.Provider>
    );
}

const useSections = () => {
    const context = useContext(SectionContext);
    if (!context) {
        throw new Error("useSections must be used within a SectionProvider");
    }
    return context.getState();
};

export default useSections;
