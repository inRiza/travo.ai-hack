import { motion } from 'framer-motion';

interface RecommendationCardProps {
    recommendation: {
      location: string;
      bestTimeToVisit: string;
      keyAttractions: string[];
      budgetRange: string;
      localTips: string[];
      ranking: number;
      imageUrl?: string;
      imageAttribution?: {
        photographer: string;
        photographerUrl: string;
      };
    };
    index: number;
  }

export default function RecommendationCard({ recommendation, index }: RecommendationCardProps) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 50, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 15,
          mass: 1,
          delay: index * 0.15
        }}
        className="p-6 rounded-xl bg-gradient-card shadow-custom hover:shadow-lg transition-shadow duration-300"
      >
        {recommendation.imageUrl && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 100,
              damping: 15,
              delay: index * 0.15 + 0.1 
            }}
            className="relative w-full h-48 mb-4 rounded-lg overflow-hidden"
          >
            <img 
              src={recommendation.imageUrl} 
              alt={recommendation.location}
              className="w-full h-full object-cover"
            />
            {recommendation.imageAttribution && (
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-2">
                Photo by{' '}
                <a 
                  href={recommendation.imageAttribution.photographerUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="underline hover:text-gray-300"
                >
                  {recommendation.imageAttribution.photographer}
                </a>
                {' '}on Pexels
              </div>
            )}
          </motion.div>
        )}
        <motion.h3 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 100,
            damping: 15,
            delay: index * 0.15 + 0.2 
          }}
          className="font-travel-heading text-xl font-bold text-primary"
        >
          {recommendation.location}
        </motion.h3>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 100,
            damping: 15,
            delay: index * 0.15 + 0.3 
          }}
          className="font-travel-body text-secondary"
        >
          Best time to visit: {recommendation.bestTimeToVisit}
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 100,
            damping: 15,
            delay: index * 0.15 + 0.4 
          }}
          className="mt-4"
        >
          <h4 className="font-travel-body font-semibold text-primary">Key Attractions:</h4>
          <ul className="list-disc list-inside text-secondary">
            {recommendation.keyAttractions.map((attraction, index) => (
              <li key={index}>{attraction}</li>
            ))}
          </ul>
        </motion.div>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 100,
            damping: 15,
            delay: index * 0.15 + 0.5 
          }}
          className="mt-2 text-secondary"
        >
          Budget: {recommendation.budgetRange}
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 100,
            damping: 15,
            delay: index * 0.15 + 0.6 
          }}
          className="mt-4"
        >
          <h4 className="font-semibold text-primary">Local Tips:</h4>
          <ul className="list-disc list-inside text-secondary">
            {recommendation.localTips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    );
  }