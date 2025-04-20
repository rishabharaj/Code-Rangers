"use client"

import { Card } from "@/components/ui/card"
import { Code, ArrowLeft, Clock, CheckCircle, XCircle, GitBranch } from "lucide-react"
import Link from "next/link"

export default function AnalyticsPage() {
  const metrics = [
    {
      title: "Total Sessions",
      value: "324",
      change: "+12%",
      description: "vs. last month"
    },
    {
      title: "Code Reviews",
      value: "156",
      change: "+8%",
      description: "vs. last month"
    },
    {
      title: "Debug Sessions",
      value: "89",
      change: "+15%",
      description: "vs. last month"
    },
    {
      title: "Code Generated",
      value: "79",
      change: "+20%",
      description: "vs. last month"
    }
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
            <h1 className="text-2xl font-bold text-white">Analytics</h1>
            <p className="text-gray-400">
              Performance metrics and usage statistics
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-6">
        {metrics.map((metric) => (
          <Card key={metric.title} className="bg-black/60 backdrop-blur-md border-gray-700 p-6">
            <h3 className="text-sm font-medium text-gray-400">{metric.title}</h3>
            <div className="mt-2 flex items-baseline">
              <p className="text-2xl font-semibold text-white">{metric.value}</p>
              <p className="ml-2 flex items-baseline text-sm font-semibold text-green-400">
                {metric.change}
              </p>
            </div>
            <p className="mt-1 text-xs text-gray-500">{metric.description}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 mb-6">
        <Card className="bg-black/60 backdrop-blur-md border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Response Time Analysis</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-gray-300">Average Response Time</span>
              </div>
              <span className="font-semibold text-white">0.8s</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                <span className="text-gray-300">Successful Responses</span>
              </div>
              <span className="font-semibold text-white">96%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <XCircle className="h-4 w-4 text-red-400 mr-2" />
                <span className="text-gray-300">Failed Responses</span>
              </div>
              <span className="font-semibold text-white">4%</span>
            </div>
          </div>
        </Card>

        <Card className="bg-black/60 backdrop-blur-md border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Language Distribution</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <GitBranch className="h-4 w-4 text-blue-400 mr-2" />
                <span className="text-gray-300">JavaScript/TypeScript</span>
              </div>
              <span className="font-semibold text-white">45%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <GitBranch className="h-4 w-4 text-green-400 mr-2" />
                <span className="text-gray-300">Python</span>
              </div>
              <span className="font-semibold text-white">30%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <GitBranch className="h-4 w-4 text-purple-400 mr-2" />
                <span className="text-gray-300">Other Languages</span>
              </div>
              <span className="font-semibold text-white">25%</span>
            </div>
          </div>
        </Card>
      </div>

      <Card className="bg-black/60 backdrop-blur-md border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Usage Trends</h3>
        <div className="h-[300px] flex items-center justify-center border border-gray-700 rounded-lg">
          <p className="text-gray-400">Usage trend chart will appear here</p>
        </div>
      </Card>
    </div>
  )
} 