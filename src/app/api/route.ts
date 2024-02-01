import { DummyFormData } from "./DummyFormData";

export async function GET() {
  return new Response(JSON.stringify(DummyFormData));
}

export async function POST(request: Request) {
  const formData = await request.json();

  const newForm = {
    id: DummyFormData.length + 1,
    title: formData.title || "Default Title",
    description: formData.description || "This is a sample description.",
    fields: formData.fields || [],
  };

  DummyFormData.push(newForm);

  return new Response(JSON.stringify(newForm));
}
