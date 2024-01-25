// /src/app/api/[id]/route.ts
import { DummyFormData } from "@/app/api/DummyFormData";
import { NextResponse } from "next/server";

interface Params {
   id: string;
}

export async function GET(request: Request, { params }: { params: Params }) {
   const { id } = params;

   try {
      // Check if DummyFormData is an array
      if (!Array.isArray(DummyFormData)) {
         throw new Error("Invalid DummyFormData");
      }

      // Find the form data with the given id
      const formData = DummyFormData.find((item) => item.id.toString() === id);

      if (formData) {
         return NextResponse.json({ formData }, { status: 200 });
      } else {
         return NextResponse.json({ error: "Form not found" }, { status: 404 });
      }
   } catch (error) {
      console.error("Error:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
   }
}

export async function PATCH(
   request: Request,
   { params }: { params: { id: string } }
) {
   try {
      const { id } = params;
      const body = await request.json();

      // Find the existing form data
      const existingFormDataIndex = DummyFormData.findIndex((item) => item.id.toString() === id);

      if (existingFormDataIndex !== -1) {
         // Update the form data
         DummyFormData[existingFormDataIndex] = { id, ...body };

         return NextResponse.json({ success: true }, { status: 200 });
      } else {
         return NextResponse.json({ error: "Form not found" }, { status: 404 });
      }
   } catch (error) {
      console.error("Error:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
   }
}
