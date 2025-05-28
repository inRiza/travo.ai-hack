import { NextResponse } from "next/server";
import { generateTravelRecommendation } from "@/lib/gemini";

async function getPlaceImage(placeName: string, request: Request) {
    try {
        const url = new URL(request.url);
        const baseUrl = `${url.protocol}//${url.host}`;
        const response = await fetch(`${baseUrl}/api/place-image?placeName=${encodeURIComponent(placeName)}`);
        const data = await response.json();
        return {
            imageUrl: data.imageUrl,
            attribution: data.attribution
        };
    } catch (error) {
        console.error("Error fetching place image:", error);
        return null;
    }
}

export async function POST(request: Request) {
    try {
        const { prompt } = await request.json();

        if (!prompt) {
            return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
        }

        const recommendations = await generateTravelRecommendation(prompt);
        const recommendationsWithImages = await Promise.all(
            recommendations.map(async (recommendation) => {
                const placeData = await getPlaceImage(recommendation.location, request);
                return {
                    ...recommendation,
                    imageUrl: placeData?.imageUrl,
                    imageAttribution: placeData?.attribution
                };
            })
        );

        return NextResponse.json({ recommendations: recommendationsWithImages }, { status: 200 });
    } catch (error) {
        console.error("Error generating travel recommendations:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
