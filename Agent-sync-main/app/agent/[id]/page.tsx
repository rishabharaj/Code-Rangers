"use client"

import Link from "next/link"
import { notFound, useParams } from "next/navigation"
import { useState, useEffect } from "react"
import {
  ArrowLeft,
  Mail,
  Calendar,
  Youtube,
  MessageSquare,
  Twitter,
  FileText,
  Settings,
  BarChart3,
  Play,
  X,
  Image,
  Heart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChatInterface } from "@/components/chat-interface"
import { ImageAnalyzer } from "@/components/image-analyzer"

// This would typically come from your MongoDB database
const getAgentData = (id: string) => {
  const agents = {
    "email-agent": {
      id: "email-agent",
      name: "Email Assistant",
      description: "Summarize, plan and respond to your emails automatically",
      icon: Mail,
      color: "bg-blue-500",
      status: "active",
    },
    "calendar-agent": {
      id: "calendar-agent",
      name: "Calendar Planner",
      description: "Organize your schedule and get smart meeting suggestions",
      icon: Calendar,
      color: "bg-green-500",
      status: "active",
    },
    "health-agent": {
      id: "health-agent",
      name: "Health Assistant",
      description: "Get personalized health advice and wellness recommendations",
      icon: Heart,
      color: "bg-red-500",
      status: "active",
    },
    "chat-agent": {
      id: "chat-agent",
      name: "Chat Assistant",
      description: "Your personal AI assistant for any questions",
      icon: MessageSquare,
      color: "bg-purple-500",
      status: "active",
    },
    "image-agent": {
      id: "image-agent",
      name: "Image Analyzer",
      description: "Analyze and describe images with AI",
      icon: Image,
      color: "bg-indigo-500",
      status: "active",
    },
    "twitter-agent": {
      id: "twitter-agent",
      name: "Twitter Analyzer",
      description: "Track trends and summarize your Twitter feed",
      icon: Twitter,
      color: "bg-sky-500",
      status: "development",
    },
    "custom-agent": {
      id: "custom-agent",
      name: "Customized Agent",
      description: "Create and customize your own AI agent for specific tasks",
      icon: Settings,
      color: "bg-pink-500",
      status: "active",
    },
    "document-agent": {
      id: "document-agent",
      name: "Document Analyzer",
      description: "Extract insights and summaries from your documents",
      icon: FileText,
      color: "bg-amber-500",
      status: "development",
    },
  }

  return agents[id as keyof typeof agents]
}

export default function AgentPage() {
  const params = useParams()
  const [agent, setAgent] = useState<any>(null)
  const [showChat, setShowChat] = useState(false)

  useEffect(() => {
    if (params?.id) {
      const agentData = getAgentData(params.id as string)
      setAgent(agentData)
    }
  }, [params?.id])

  if (!agent) {
    return null
  }

  const AgentIcon = agent.icon

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center">
              <div className={`${agent.color} p-3 rounded-lg mr-4`}>
                <AgentIcon className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">{agent.name}</h1>
                <p className="text-gray-400">{agent.description}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Settings className="mr-2 h-4 w-4" />
                Configure
              </Button>
              <Button size="sm" onClick={() => setShowChat(true)}>
                <Play className="mr-2 h-4 w-4" />
                Run Agent
              </Button>
            </div>
          </div>
        </div>

        {showChat && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-[#1B2B4B] rounded-lg w-full max-w-3xl mx-4 overflow-hidden shadow-xl">
              <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <div className="flex items-center gap-3">
                  <div className={`${agent.color} p-2 rounded-lg`}>
                    <AgentIcon className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold text-white">Chat with {agent.name}</h2>
                </div>
                <Button
                  variant="ghost"
                  className="text-gray-400 hover:text-white"
                  onClick={() => setShowChat(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="h-[600px] w-full">
                <iframe 
                  src={
                    agent.id === "health-agent" 
                      ? "https://cdn.botpress.cloud/webchat/v2.3/shareable.html?configUrl=https://files.bpcontent.cloud/2025/04/20/02/20250420023541-2UTCDJ99.json"
                      : agent.id === "custom-agent"
                      ? "https://cdn.botpress.cloud/webchat/v2.3/shareable.html?configUrl=https://files.bpcontent.cloud/2025/04/19/07/20250419075918-DBSB5EXA.json"
                      : "https://cdn.botpress.cloud/webchat/v2.3/shareable.html?configUrl=https://files.bpcontent.cloud/2025/04/19/07/20250419070954-WSPDASZV.json"
                  }
                  className="w-full h-full border-0"
                  allow="microphone; geolocation"
                />
              </div>
            </div>
          </div>
        )}

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-4 w-full max-w-md mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Status</CardTitle>
                  <CardDescription>Current agent status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <div
                      className={`w-3 h-3 rounded-full ${agent.status === "active" ? "bg-green-500" : "bg-amber-500"} mr-2`}
                    ></div>
                    <span className="text-lg font-medium">
                      {agent.status === "active" ? "Active" : "In Development"}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Usage</CardTitle>
                  <CardDescription>Agent usage statistics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">247</div>
                  <p className="text-sm text-gray-500">Total runs this month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance</CardTitle>
                  <CardDescription>Response time and accuracy</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold">98%</div>
                      <p className="text-sm text-gray-500">Accuracy rate</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">1.2s</div>
                      <p className="text-sm text-gray-500">Avg. response time</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Agent Description</CardTitle>
                <CardDescription>How this agent works and what it can do</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  The {agent.name} is designed to help you manage and interact with your {agent.id.split("-")[0]}{" "}
                  content efficiently. It uses advanced AI algorithms to understand context, extract information, and
                  provide meaningful insights.
                </p>
                <h3 className="text-lg font-medium mt-4">Capabilities:</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Analyze and summarize {agent.id.split("-")[0]} content automatically</li>
                  <li>Generate smart responses based on context and history</li>
                  <li>Identify important information and prioritize accordingly</li>
                  <li>Integrate with your existing workflow and tools</li>
                  <li>Learn from your preferences to improve over time</li>
                </ul>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common tasks for this agent</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Play className="mr-2 h-4 w-4" />
                    Run with default settings
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="mr-2 h-4 w-4" />
                    Configure parameters
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    View detailed analytics
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Integration</CardTitle>
                  <CardDescription>Connect with other services</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">This agent can be integrated with:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {["Google Workspace", "Microsoft 365", "Slack", "Notion"].map((service) => (
                      <div key={service} className="flex items-center p-2 border rounded-md">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-sm">{service}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest agent runs and interactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="flex items-start gap-4 p-3 rounded-lg border border-gray-800 hover:bg-gray-800/50 transition-colors duration-200"
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${agent.color}`}>
                        <AgentIcon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium text-white">
                            {agent.name} processed {i} item{i > 1 ? "s" : ""}
                          </h3>
                          <span className="text-sm text-gray-500">
                            {i} day{i > 1 ? "s" : ""} ago
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm mt-1">
                          {agent.id.includes("email")
                            ? "Summarized emails from your inbox"
                            : agent.id.includes("calendar")
                              ? "Suggested optimal meeting times"
                              : agent.id.includes("youtube")
                                ? "Generated video summaries"
                                : agent.id.includes("chat")
                                  ? "Answered user queries"
                                  : agent.id.includes("twitter")
                                    ? "Analyzed Twitter trends"
                                    : agent.id.includes("custom")
                                      ? "Customized tasks"
                                      : "Processed documents and extracted insights"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Agent Configuration</CardTitle>
                <CardDescription>Customize how this agent works</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Agent Name</label>
                  <input
                    type="text"
                    className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 text-white"
                    defaultValue={agent.name}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <textarea
                    className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 text-white min-h-[100px]"
                    defaultValue={agent.description}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Status</label>
                    <select 
                      className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 text-white"
                      defaultValue={agent.status}
                    >
                      <option value="active">Active</option>
                      <option value="development">In Development</option>
                      <option value="disabled">Disabled</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Color Theme</label>
                    <div className="grid grid-cols-5 gap-2">
                      {["bg-blue-500", "bg-green-500", "bg-red-500", "bg-purple-500", "bg-amber-500"].map((color) => (
                        <button
                          key={color}
                          className={`w-8 h-8 rounded-full ${color} ${agent.color === color ? "ring-2 ring-white" : ""}`}
                          aria-label={`Select ${color} theme`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Performance Analytics</CardTitle>
                <CardDescription>Usage statistics and performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center border border-dashed border-gray-700 rounded-lg mb-6">
                  <p className="text-gray-500">Analytics visualization would appear here</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-400 mb-1">Total Runs</h3>
                    <div className="text-2xl font-bold">1,247</div>
                    <p className="text-xs text-green-400 mt-1">↑ 12% from last month</p>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-400 mb-1">Avg. Processing Time</h3>
                    <div className="text-2xl font-bold">1.2s</div>
                    <p className="text-xs text-green-400 mt-1">↓ 0.3s from last month</p>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-400 mb-1">Success Rate</h3>
                    <div className="text-2xl font-bold">98.7%</div>
                    <p className="text-xs text-green-400 mt-1">↑ 1.2% from last month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
