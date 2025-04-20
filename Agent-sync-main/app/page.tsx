"use client"

import { Card } from "@/components/ui/card"
import { Brain, Code, Calendar, Youtube, MessageSquare, Twitter, Instagram, FileText, PlusCircle, Image, Heart, Settings as SettingsIcon } from "lucide-react"
import Link from "next/link"
import { Sidebar } from "@/components/sidebar"
import { Search } from "@/components/search"

const agents = [
  {
    id: "coding-agent",
    name: "Coding Assistant",
    description: "Get help with coding, debugging, and code reviews",
    icon: Code,
    color: "bg-blue-500",
    status: "active",
  },
  {
    id: "image-agent",
    name: "Image Analyzer",
    description: "Analyze and describe images with AI",
    icon: Image,
    color: "bg-indigo-500",
    status: "active",
  },
  {
    id: "calendar-agent",
    name: "Calendar Planner",
    description: "Organize your schedule and get smart meeting suggestions",
    icon: Calendar,
    color: "bg-green-500",
    status: "active",
  },
  {
    id: "health-agent",
    name: "Health Assistant",
    description: "Get personalized health advice and wellness recommendations",
    icon: Heart,
    color: "bg-red-500",
    status: "active",
  },
  {
    id: "chat-agent",
    name: "Chat Assistant",
    description: "Your personal AI assistant for any questions",
    icon: MessageSquare,
    color: "bg-purple-500",
    status: "active",
  },
  {
    id: "twitter-agent",
    name: "Twitter Analyzer",
    description: "Track trends and summarize your Twitter feed",
    icon: Twitter,
    color: "bg-sky-500",
    status: "in-development",
  },
  {
    id: "custom-agent",
    name: "Customized Agent",
    description: "Create and customize your own AI agent for specific tasks",
    icon: SettingsIcon,
    color: "bg-pink-500",
    status: "active",
  },
  {
    id: "document-agent",
    name: "Document Analyzer",
    description: "Extract insights from documents and files",
    icon: FileText,
    color: "bg-yellow-500",
    status: "in-development",
  },
]

export default function Home() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 pl-72">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">AI Multi-Agent Dashboard</h1>
            <p className="text-gray-500 mt-1">Access your intelligent agents for various tasks</p>
          </div>
          <Search />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <Link key={agent.id} href={`/agent/${agent.id}`}>
              <Card className="relative overflow-hidden transition-all hover:shadow-lg">
                <div className={`absolute inset-0 opacity-10 ${agent.color}`} />
                <div className="relative p-6">
                  <div className="flex items-center justify-between">
                    <agent.icon className={`h-10 w-10 ${agent.color} rounded-lg p-2 text-white`} />
                    <span className={`rounded-full px-2 py-1 text-xs ${
                      agent.status === "active" 
                        ? "bg-purple-100 text-purple-600" 
                        : "bg-gray-100 text-gray-600"
                    }`}>
                      {agent.status === "active" ? "Active" : "In Development"}
                    </span>
                  </div>
                  <h3 className="mt-4 text-xl font-medium">{agent.name}</h3>
                  <p className="mt-2 text-sm text-gray-600">{agent.description}</p>
                  <div className="mt-4 flex items-center text-sm text-gray-500">
                    Click to access
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-2 h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </Card>
            </Link>
          ))}

          <Link href="/create-agent">
            <Card className="relative h-full hover:shadow-lg transition-all">
              <div className="p-6 flex flex-col items-center justify-center h-full text-center">
                <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center mb-4">
                  <PlusCircle className="h-6 w-6 text-gray-600" />
                </div>
                <h3 className="text-xl font-medium">Create New Agent</h3>
                <p className="mt-2 text-sm text-gray-600">Add a custom agent for your specific needs</p>
              </div>
            </Card>
          </Link>
        </div>
      </main>
    </div>
  )
}
