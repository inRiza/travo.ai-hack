import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const placeName = searchParams.get('placeName');

    if (!placeName) {
        return NextResponse.json({ error: "Place name is required" }, { status: 400 });
    }

    if (!process.env.PEXELS_API_KEY) {
        return NextResponse.json({ error: "Pexels API key is not configured" }, { status: 500 });
    }

    try {
        const searchUrl = `https://api.pexels.com/v1/search?query=${encodeURIComponent(placeName + ' travel destination')}&orientation=landscape&per_page=1`;
        const response = await fetch(searchUrl, {
            headers: {
                'Authorization': process.env.PEXELS_API_KEY
            }
        });
        
        const data = await response.json();
        
        if (!data.photos || data.photos.length === 0) {
            return NextResponse.json({ error: "No images found for this place" }, { status: 404 });
        }

        const imageUrl = data.photos[0].src.large;
        const photographer = data.photos[0].photographer;
        const photographerUrl = data.photos[0].photographer_url;

        return NextResponse.json({ 
            imageUrl,
            attribution: {
                photographer,
                photographerUrl
            }
        });
    } catch (error) {
        console.error("Error fetching place image:", error);
        return NextResponse.json({ error: "Failed to fetch place image" }, { status: 500 });
    }
} 