"use client"

import { useState } from "react"
import { Upload, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Message {
  role: "user" | "assistant"
  content: string
  imageUrl?: string
}

export function ImageAnalyzer() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        setSelectedImage(base64String)
        // Add a message to show the uploaded image
        setMessages(prev => [...prev, {
          role: "user",
          content: "I've uploaded an image for analysis",
          imageUrl: base64String
        }])
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSend = async () => {
    if (!input.trim() || !selectedImage) return

    const userMessage: Message = { 
      role: "user", 
      content: input,
      imageUrl: selectedImage
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/image-analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          message: input,
          image: selectedImage
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const data = await response.json()
      const assistantMessage: Message = {
        role: "assistant",
        content: data.content || "Sorry, I couldn't analyze the image."
      }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error:", error)
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, there was an error processing your request." }
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-[600px] bg-gray-800 rounded-lg overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-700 text-gray-200"
              }`}
            >
              {message.imageUrl && (
                <div className="mb-2">
                  <img 
                    src={message.imageUrl} 
                    alt="Uploaded" 
                    className="max-w-full h-auto rounded-lg"
                  />
                </div>
              )}
              <p>{message.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-700 text-gray-200 rounded-lg p-3">
              Analyzing image...
            </div>
          </div>
        )}
      </div>
      <div className="border-t border-gray-700 p-4">
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <label className="flex-1">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <Button
                variant="outline"
                className="w-full bg-gray-700 border-gray-600 text-white"
                onClick={() => document.getElementById('image-upload')?.click()}
              >
                <Upload className="mr-2 h-4 w-4" />
                {selectedImage ? "Change Image" : "Upload Image"}
              </Button>
            </label>
          </div>
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about the image..."
              className="flex-1 bg-gray-700 border-gray-600 text-white"
              disabled={!selectedImage}
            />
            <Button 
              onClick={handleSend} 
              disabled={isLoading || !selectedImage || !input.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 