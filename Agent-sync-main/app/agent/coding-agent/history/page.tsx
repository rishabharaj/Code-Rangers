"use client"

import { Card } from "@/components/ui/card"
import { Code, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function HistoryPage() {
  const historyItems = [
    {
      id: 1,
      type: "Code Review",
      timestamp: "2 hours ago",
      description: "Reviewed React component for performance optimization",
      status: "Completed",
    },
    {
      id: 2,
      type: "Debugging",
      timestamp: "5 hours ago",
      description: "Fixed authentication error in API route",
      status: "Completed",
    },
    {
      id: 3,
      type: "Code Generation",
      timestamp: "1 day ago",
      description: "Generated TypeScript interfaces for database models",
      status: "Completed",
    },
    {
      id: 4,
      type: "Integration",
      timestamp: "2 days ago",
      description: "Helped with third-party API integration",
      status: "Completed",
    },
  ]

  return (
    <div className="flex-1 bg-gradient-to-br from-gray-900 to-gray-800 p-8 pt-6">
      <div className="mb-6">
        <Link href="/agent/coding-agent" className="text-sm text-gray-400 hover:text-white flex items-center">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Coding Assistant
        </Link>
      </div>

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="bg-blue-500 p-3 rounded-lg">
            <Code className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Activity History</h1>
            <p className="text-gray-400">
              Recent coding assistant activities and interactions
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {historyItems.map((item) => (
          <Card key={item.id} className="bg-black/60 backdrop-blur-md border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-500/20 p-2 rounded-lg">
                  <Code className="h-4 w-4 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-medium text-white">{item.type}</h3>
                  <p className="text-sm text-gray-400">{item.description}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm text-gray-500">{item.timestamp}</span>
                <div className="text-sm text-green-400 mt-1">{item.status}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
} 