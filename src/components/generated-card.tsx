
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
      <div className="p-6 rounded-xl shadow-[-5px_7px_66px_-4px_#00000024]">
        <h3 className="font-travel-heading text-xl font-bold">{recommendation.location}</h3>
        <p className="font-travel-body text-gray-600">Best time to visit: {recommendation.bestTimeToVisit}</p>
        <div className="mt-4">
          <h4 className="font-travel-body font-semibold">Key Attractions:</h4>
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