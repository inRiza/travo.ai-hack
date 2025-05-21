'use client'
import { useState } from 'react'

const NavList = [
     {
        name: "Costum",
        image: "",
        key: ""
    },
    {
        name: "Beach",
        image: "",
        key: "beach"
    },
    {
        name: "Hotel",
        image: "",
        key: "hotel"
    },
    {
        name: "Park",
        image: "",
        key: "park"
    },
    {
        name: "Restaurants",
        image: "",
        key: "restaurants"
    },
];

const NavTabs = () => {
  const [activeTab, setActiveTab] = useState("");

  return (
    <div className="">
        {NavList.map((nav) => {
            return (
                <button 
                    onClick={() => setActiveTab(nav.key)} 
                    className={`py-4 px-8 font-travel-body font-bold hover:bg-gray-100 rounded-xl transition ${activeTab === nav.key ? '' : 'text-gray-400 font-light'}`} 
                    key={nav.key}
                >
                    {nav.name}
                </button>
            )
        })}
    </div>
  )
}

export default NavTabs