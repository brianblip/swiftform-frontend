// /src/app/api/[id]/route.ts
import { DummyFormData } from "@/app/api/DummyFormData";
import { NextResponse } from "next/server";

interface Params {
  id: string;
}

function findFormDataIndex(id: string): number {
  return DummyFormData.findIndex((item) => item.id.toString() === id);
}

export async function GET(request: Request, { params }: { params: Params }) {
  const { id } = params;

  try {
    const formData = DummyFormData.find((item) => item.id.toString() === id);

    return formData
      ? NextResponse.json({ formData }, { status: 200 })
      : NextResponse.json({ error: "Form not found" }, { status: 404 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    const body = await request.json();

    const existingFormDataIndex = findFormDataIndex(id);

    if (existingFormDataIndex !== -1) {
      DummyFormData[existingFormDataIndex] = { id, ...body };
      return NextResponse.json({ success: true }, { status: 200 });
    } else {
      return NextResponse.json({ error: "Form not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request, { params }: { params: Params }) {
  try {
    const { id } = params;

    const existingFormDataIndex = findFormDataIndex(id);

    if (existingFormDataIndex !== -1) {
      DummyFormData.splice(existingFormDataIndex, 1);
      return NextResponse.json({ success: true }, { status: 200 });
    } else {
      return NextResponse.json({ error: "Form not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
