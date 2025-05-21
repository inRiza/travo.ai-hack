'use client'
import Search from '../components/search'
import NavTabs from '../components/nav-tabs'
import Filter from '../components/filter'
import RecommendationCard from '../components/generated-card'
import { useState } from 'react'

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

  return (
    <div className='flex flex-col justify-between mt-18 min-h-screen'>
      <div className='flex flex-col items-center w-full'>
        <h1 className='font-travel-heading font-travel-heading-extrabold text-8xl'>Travo.ai</h1>
        <span className='font-travel-body text-gray-400 text-lg mt-3'>Make your destination traveling choice easy!</span>
        <span className='font-travel-body text-gray-400 text-lg mb-10'>Only using a single prompt.</span>
        {/* <NavTabs/>
        <Filter/> */}
        <div className='mt-5'>
            <Search onRecommendationsGenerated={handleRecommendationsGenerated}/>
        </div>
        <div className='mt-22 mb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl'>
          {recommendations && recommendations.length > 0 ? (
            recommendations.map((recommendation, index) => (
              <RecommendationCard key={index} recommendation={recommendation} />
            ))
          ) : '' }
        </div>
      </div>
    </div>
  )
}

export default LandingPage