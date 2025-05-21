import { GoogleGenerativeAI} from '@google/generative-ai'

if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
    throw new Error('Missing NEXT_PUBLIC_GEMINI_API_KEY environment variable');
}

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY)

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

interface TravelReccomendation {
    location: string;
    bestTimeToVisit: string;
    keyAttractions: string[];
    budgetRange: string;
    localTips: string[];
    ranking: number;
}

export async function generateTravelRecommendation(prompt: string): Promise<TravelReccomendation[]> {
    try {
        const result = await model.generateContent({
            contents: [{
                role: "user",
                parts: [{
                    text: `As a travel expert, analyze this travel request: "${prompt}".
                    Provide 3 reccomendations in this exact JSON format: 
                    [
                    {
                        "location": "Place name",
                        "bestTimeToVisit": "Best months/season",
                        "keyAttractions": ["Attraction 1", "Attraction 2"],
                        "budgetRange": "Budget estimate",
                        "localTips": ["Tip 1", "Tip 2"],
                        "ranking": 1
                    }
                    ]
                    Rank from best (1) to least suitable (3).`
                }]
            }]
        });

        const response = await result.response;
        const text = response.text();
        // Extract JSON from the response text
        const jsonMatch = text.match(/\[[\s\S]*\]/);
        if (!jsonMatch) {
            throw new Error('No valid JSON found in response');
        }
        return JSON.parse(jsonMatch[0]);
    } catch (error) {
        console.error("Error generating travel reccomendation:", error);
        throw error;
    }
}
