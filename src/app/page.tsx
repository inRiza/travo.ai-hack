'use client'
import Search from '../components/search'
import NavTabs from '../components/nav-tabs'
import Filter from '../components/filter'
import RecommendationCard from '../components/generated-card'
import { AttentionButton } from '../components/attention'
import { useState } from 'react'
import { motion } from 'framer-motion'

interface TravelRecommendation {
  location: string;
  bestTimeToVisit: string;
  keyAttractions: string[];
  budgetRange: string;
  localTips: string[];
  ranking: number;
}

const LandingPage = () => {
  const [recommendations, setRecommendations] = useState<TravelRecommendation[]>([])

  const handleRecommendationsGenerated = (newRecommendations: TravelRecommendation[]) => {
    console.log('Page received recommendations:', newRecommendations);
    setRecommendations(newRecommendations);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.21, 0.47, 0.32, 0.98]
      }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className='flex flex-col justify-between min-h-screen bg-gradient-primary'
    >
      <div className='flex flex-col items-center w-full py-12'>
        <motion.h1 
          variants={itemVariants}
          className='font-travel-heading font-travel-heading-extrabold text-8xl text-primary bg-clip-text text-transparent bg-gradient-to-r from-accent-color to-accent-hover'
        >
          Travo.<span className='text-green-600'>ai</span>
        </motion.h1>
        <motion.span 
          variants={itemVariants}
          className='font-travel-body text-secondary text-lg mt-3'
        >
          Make your destination traveling choice easy!
        </motion.span>
        <motion.span 
          variants={itemVariants}
          className='font-travel-body text-secondary text-lg mb-10'
        >
          Only using a single prompt.
        </motion.span>
        {/* <NavTabs/>
        <Filter/> */}
        <motion.div 
          variants={itemVariants}
          className='mt-5 w-full max-w-3xl'
        >
          <Search onRecommendationsGenerated={handleRecommendationsGenerated}/>
        </motion.div>
        <motion.div 
          variants={itemVariants}
          className='mt-22 mb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl px-4'
        >
          {recommendations && recommendations.length > 0 ? (
            recommendations.map((recommendation, index) => (
              <RecommendationCard 
                key={index} 
                recommendation={recommendation} 
                index={index}
              />
            ))
          ) : '' }
        </motion.div>
      </div>
      <AttentionButton/>
    </motion.div>
  )
}

export default LandingPage