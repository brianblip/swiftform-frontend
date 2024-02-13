// /src/app/api/[id]/route.ts

import { NextResponse } from "next/server";
import { DummyResponseData } from "@/app/api/DummyData/DummyResponseData";

interface Params {
    id: string;
}

function findResponseDataIndex(id: string): number {
    return DummyResponseData.findIndex((item) => item.id.toString() === id);
}

export async function GET(request: Request, { params }: { params: Params }) {
    const { id } = params;

    try {
        const responseData = DummyResponseData.find(
            (item) => item.id.toString() === id,
        );

        return responseData
            ? NextResponse.json({ responseData }, { status: 200 })
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

        const existingResponseDataIndex = findResponseDataIndex(id);

        if (existingResponseDataIndex !== -1) {
            // Update the response data
            DummyResponseData[existingResponseDataIndex] = {
                ...DummyResponseData[existingResponseDataIndex],
                ...body,
            };
            return NextResponse.json({ success: true }, { status: 200 });
        } else {
            return NextResponse.json(
                { error: "Form not found" },
                { status: 404 },
            );
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

        const existingResponseDataIndex = findResponseDataIndex(id);

        if (existingResponseDataIndex !== -1) {
            // Remove the response data
            DummyResponseData.splice(existingResponseDataIndex, 1);
            return NextResponse.json({ success: true }, { status: 200 });
        } else {
            return NextResponse.json(
                { error: "Form not found" },
                { status: 404 },
            );
        }
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 },
        );
    }
}
