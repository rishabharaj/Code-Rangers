"use client"

import { useState } from "react"
import { SearchIcon } from "lucide-react"

export function Search() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div
      className={`
      relative flex items-center transition-all duration-300 ease-in-out
      ${isExpanded ? "w-full md:w-80" : "w-10 h-10 md:w-64"}
    `}
    >
      <div
        className={`
        absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none
        ${isExpanded ? "opacity-100" : "opacity-0 md:opacity-100"}
      `}
      >
        <SearchIcon className="w-5 h-5 text-gray-400" />
      </div>

      <button
        onClick={() => setIsExpanded(true)}
        className={`
          md:hidden absolute inset-0 flex items-center justify-center rounded-full bg-gray-800
          ${isExpanded ? "opacity-0 pointer-events-none" : "opacity-100"}
        `}
      >
        <SearchIcon className="w-5 h-5 text-gray-400" />
      </button>

      <input
        type="search"
        className={`
          bg-gray-800 text-white rounded-full border border-gray-700 focus:ring-2 focus:ring-purple-600 focus:border-transparent
          placeholder-gray-400 pl-10 pr-4 py-2 w-full transition-all duration-300
          ${isExpanded ? "opacity-100 h-10" : "opacity-0 md:opacity-100 h-10"}
        `}
        placeholder="Search agents, tasks, or commands..."
        onBlur={() => setIsExpanded(false)}
        onFocus={() => setIsExpanded(true)}
      />
    </div>
  )
}
