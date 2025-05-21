import { NextResponse } from "next/server";
import { generateTravelRecommendation } from "@/lib/gemini";

export async function POST(request: Request) {
    try {
        const { prompt } = await request.json();

        if (!prompt) {
            return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
        }

        const recommendations = await generateTravelRecommendation(prompt);
        return NextResponse.json({ recommendations }, { status: 200 });
    } catch (error) {
        console.error("Error generating travel recommendations:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
