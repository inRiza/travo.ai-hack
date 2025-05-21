'use client'
import { useState } from 'react'

const Filters = [
    {
        name: "Near me",
        image: "",
        key: "nearest"
    },
    {
        name: "Anywhere",
        image: "",
        key: "anywhere"
    },
];

const Filter = () => {
  const [activeTab, setActiveTab] = useState("nearest");

  return (
    <div className="">
        {Filters.map((filter) => {
            return (
                <button 
                    onClick={() => setActiveTab(filter.key)} 
                    className={`py-4 px-8 font-travel-body font-bold hover:bg-gray-100 rounded-xl transition ${activeTab === filter.key ? '' : 'text-gray-400 font-light'}`} 
                    key={filter.key}
                >
                    {filter.name}
                </button>
            )
        })}
    </div>
  )
}

export default Filter