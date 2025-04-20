"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Users, MessageSquare, Image, FileText } from "lucide-react"

export default function AnalyticsPage() {
  const stats = [
    {
      title: "Total Usage",
      value: "1,247",
      description: "Total agent runs this month",
      icon: BarChart3,
      color: "text-purple-400",
    },
    {
      title: "Active Users",
      value: "24",
      description: "Users currently using agents",
      icon: Users,
      color: "text-blue-400",
    },
    {
      title: "Chat Sessions",
      value: "856",
      description: "Chat assistant interactions",
      icon: MessageSquare,
      color: "text-green-400",
    },
    {
      title: "Image Analysis",
      value: "342",
      description: "Images analyzed this month",
      icon: Image,
      color: "text-indigo-400",
    },
    {
      title: "Documents Processed",
      value: "49",
      description: "Documents analyzed by AI",
      icon: FileText,
      color: "text-amber-400",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>
          <p className="text-gray-400 mt-1">Monitor your AI agents' performance and usage</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title} className="bg-gray-800 border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <p className="text-xs text-gray-500">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Usage Trends</CardTitle>
              <CardDescription>Agent usage over the last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border border-dashed border-gray-700 rounded-lg">
                <p className="text-gray-500">Usage chart will appear here</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Agent Performance</CardTitle>
              <CardDescription>Success rates and response times</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border border-dashed border-gray-700 rounded-lg">
                <p className="text-gray-500">Performance metrics will appear here</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 