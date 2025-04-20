"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Brain, Mail, Calendar, Youtube, MessageSquare, Twitter, Instagram, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function CreateAgentPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const agentTypes = [
    { id: "email", name: "Email Assistant", icon: Mail, color: "bg-blue-500" },
    { id: "calendar", name: "Calendar Planner", icon: Calendar, color: "bg-green-500" },
    { id: "youtube", name: "YouTube Summarizer", icon: Youtube, color: "bg-red-500" },
    { id: "chat", name: "Chat Assistant", icon: MessageSquare, color: "bg-purple-500" },
    { id: "twitter", name: "Twitter Analyzer", icon: Twitter, color: "bg-sky-500" },
    { id: "instagram", name: "Instagram Helper", icon: Instagram, color: "bg-pink-500" },
    { id: "document", name: "Document Analyzer", icon: FileText, color: "bg-amber-500" },
    { id: "custom", name: "Custom Agent", icon: Brain, color: "bg-gray-500" },
  ]

  const [selectedType, setSelectedType] = useState("custom")
  const [selectedColor, setSelectedColor] = useState("bg-purple-500")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.target as HTMLFormElement)
    const agentData = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      type: selectedType,
      color: selectedColor,
      status: "development",
    }

    try {
      // This would typically send data to your MongoDB backend
      // const response = await fetch("/api/agents", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(agentData),
      // });

      // if (!response.ok) throw new Error("Failed to create agent");

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirect to home page after successful creation
      router.push("/")
    } catch (error) {
      console.error("Error creating agent:", error)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Create New Agent</CardTitle>
            <CardDescription>Configure a new AI agent for your specific needs</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Agent Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter agent name"
                  required
                  className="bg-gray-800 border-gray-700"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="What does this agent do?"
                  required
                  className="bg-gray-800 border-gray-700 min-h-[100px]"
                />
              </div>

              <div className="space-y-3">
                <Label>Agent Type</Label>
                <RadioGroup
                  defaultValue={selectedType}
                  onValueChange={setSelectedType}
                  className="grid grid-cols-2 gap-4"
                >
                  {agentTypes.map((type) => {
                    const Icon = type.icon
                    return (
                      <div key={type.id} className="relative">
                        <RadioGroupItem value={type.id} id={`type-${type.id}`} className="peer sr-only" />
                        <Label
                          htmlFor={`type-${type.id}`}
                          className="flex items-center gap-3 p-4 rounded-lg border border-gray-700 bg-gray-800 hover:bg-gray-700/50 peer-data-[state=checked]:border-purple-500 peer-data-[state=checked]:bg-purple-900/20 transition-colors cursor-pointer"
                        >
                          <div className={`${type.color} p-2 rounded-md`}>
                            <Icon className="h-5 w-5 text-white" />
                          </div>
                          <span>{type.name}</span>
                        </Label>
                      </div>
                    )
                  })}
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label>Color Theme</Label>
                <div className="flex gap-3">
                  {[
                    "bg-blue-500",
                    "bg-green-500",
                    "bg-red-500",
                    "bg-purple-500",
                    "bg-pink-500",
                    "bg-amber-500",
                    "bg-sky-500",
                    "bg-gray-500",
                  ].map((color) => (
                    <button
                      key={color}
                      type="button"
                      className={`w-10 h-10 rounded-full ${color} ${selectedColor === color ? "ring-2 ring-offset-2 ring-offset-gray-800 ring-white" : ""}`}
                      onClick={() => setSelectedColor(color)}
                      aria-label={`Select ${color} theme`}
                    />
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Creating..." : "Create Agent"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
