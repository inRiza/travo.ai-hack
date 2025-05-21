# Travo - AI-Powered Travel Recommendation Platform

Travo is a modern travel recommendation platform that uses AI to provide personalized travel suggestions based on user prompts. Simply describe your dream destination, and Travo will generate comprehensive recommendations from best to least suitable options.

## 🌟 Features

- **Single Prompt Interface**: Describe your travel desires in natural language
- **AI-Powered Recommendations**: Get personalized travel suggestions using Google's Gemini AI
- **Smart Filtering**: Filter recommendations by:
  - Location type (Beach, Hotel, Park, Restaurants)
  - Budget range
  - Travel preferences
  - Season/Weather
- **Detailed Insights**: Each recommendation includes:
  - Best time to visit
  - Local attractions
  - Cultural highlights
  - Budget considerations
  - Safety tips
  - Local customs

## 🛠️ Tech Stack

- **Frontend**:
  - Next.js 14 (React)
  - Tailwind CSS
  - TypeScript
  - Custom Fonts (Plus Jakarta Sans & Outfit)

- **AI Integration**:
  - Google Gemini API (Free tier)
  - Natural Language Processing
  - Context-aware recommendations

- **Styling**:
  - Modern UI/UX design
  - Responsive layout
  - Interactive components
  - Smooth animations

## 🚀 Getting Started

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/travo.git
cd travo
```

2. **Install dependencies**
```bash
npm install
npm install @google/generative-ai
```

3. **Set up environment variables**
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
```

4. **Run the development server**
```bash
npm run dev
```

## 📝 Project Structure

```
travo/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Landing page
│   │   └── layout.tsx        # Root layout
│   ├── components/
│   │   ├── search.tsx        # Search component
│   │   ├── nav-tabs.tsx      # Navigation tabs
│   │   └── filter.tsx        # Filter component
│   └── lib/
│       └── gemini.ts         # Gemini AI integration
├── public/
│   └── assets/              # Static assets
└── styles/
    └── globals.css          # Global styles
```

## 🤖 Detailed AI Integration Guide

### 1. Setup Gemini API

1. **Get API Key**:
   - Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Sign in with your Google account
   - Click "Create API Key"
   - Copy your API key

2. **Create Gemini Configuration**
Create `src/lib/gemini.ts`:
```typescript
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

// Create a model instance
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// Type for travel recommendations
interface TravelRecommendation {
  location: string;
  bestTimeToVisit: string;
  keyAttractions: string[];
  budgetRange: string;
  localTips: string[];
  ranking: number;
}

// Function to generate travel recommendations
export async function generateTravelRecommendations(prompt: string): Promise<TravelRecommendation[]> {
  try {
    const result = await model.generateContent({
      contents: [{
        parts: [{
          text: `As a travel expert, analyze this travel request: "${prompt}". 
          Provide 3 recommendations in this exact JSON format:
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
    return JSON.parse(text);
  } catch (error) {
    console.error('Error generating recommendations:', error);
    throw error;
  }
}
```

### 2. Create API Route

Create `src/app/api/recommendations/route.ts`:
```typescript
import { NextResponse } from 'next/server';
import { generateTravelRecommendations } from '@/lib/gemini';

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();
    
    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    const recommendations = await generateTravelRecommendations(prompt);
    return NextResponse.json({ recommendations });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate recommendations' },
      { status: 500 }
    );
  }
}
```

### 3. Implement in Search Component

Update `src/components/search.tsx`:
```typescript
'use client';
import { useState } from 'react';

export default function Search() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      setRecommendations(data.recommendations);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe your dream destination..."
        className="bg-transparent outline-none placeholder:text-sm"
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Generating...' : 'Find Now'}
      </button>
    </form>
  );
}
```

### 4. Create Recommendation Display Component

Create `src/components/recommendation-card.tsx`:
```typescript
interface RecommendationCardProps {
  recommendation: {
    location: string;
    bestTimeToVisit: string;
    keyAttractions: string[];
    budgetRange: string;
    localTips: string[];
    ranking: number;
  };
}

export default function RecommendationCard({ recommendation }: RecommendationCardProps) {
  return (
    <div className="p-6 border rounded-lg shadow-lg">
      <h3 className="text-xl font-bold">{recommendation.location}</h3>
      <p className="text-gray-600">Best time to visit: {recommendation.bestTimeToVisit}</p>
      <div className="mt-4">
        <h4 className="font-semibold">Key Attractions:</h4>
        <ul className="list-disc list-inside">
          {recommendation.keyAttractions.map((attraction, index) => (
            <li key={index}>{attraction}</li>
          ))}
        </ul>
      </div>
      <p className="mt-2">Budget: {recommendation.budgetRange}</p>
      <div className="mt-4">
        <h4 className="font-semibold">Local Tips:</h4>
        <ul className="list-disc list-inside">
          {recommendation.localTips.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
```

## 🎯 Future Enhancements

1. **User Features**
- User accounts and saved preferences
- Travel history
- Social sharing
- Reviews and ratings

2. **AI Improvements**
- Image recognition for location suggestions
- Weather integration
- Real-time travel alerts
- Multi-language support

3. **Content**
- Travel guides
- Local experiences
- Cultural insights
- Budget calculators

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google Gemini AI for powering our recommendations
- Next.js team for the amazing framework
- All contributors and supporters

## 📞 Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter)
Project Link: [https://github.com/yourusername/travo](https://github.com/yourusername/travo)
