import { DummyFormData } from "./DummyData/DummyFormData";

export async function GET() {
    return new Response(JSON.stringify(DummyFormData));
}

export async function POST(request: Request) {
    try {
        const formData = await request.json();
        if (
            !formData.owner_id ||
            !formData.title ||
            !formData.description ||
            !formData.fields
        ) {
            throw new Error("Invalid form data. Missing required properties.");
        }

        const newForm = {
            id: DummyFormData.length + 1,
            owner_id: formData.owner_id,
            title: formData.title,
            description: formData.description,
            fields: formData.fields,
        };

        DummyFormData.push(newForm);

        return new Response(JSON.stringify(newForm), { status: 201 }); // Return status 201 for successful creation
    } catch (error) {
        console.error("Error creating form:", error);
        return new Response("Error creating form", { status: 400 }); // Return status 400 for bad request
    }
}
