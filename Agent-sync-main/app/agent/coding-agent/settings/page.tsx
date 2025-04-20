"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Code, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function SettingsPage() {
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
            <h1 className="text-2xl font-bold text-white">Settings</h1>
            <p className="text-gray-400">
              Configure your coding assistant preferences
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        <Card className="bg-black/60 backdrop-blur-md border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Language Preferences</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-300">Primary Programming Language</label>
              <select className="w-full mt-1 rounded-md border border-gray-700 bg-black text-white px-3 py-2">
                <option>JavaScript/TypeScript</option>
                <option>Python</option>
                <option>Java</option>
                <option>C++</option>
                <option>Go</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300">Framework Preferences</label>
              <select className="w-full mt-1 rounded-md border border-gray-700 bg-black text-white px-3 py-2">
                <option>React</option>
                <option>Next.js</option>
                <option>Vue</option>
                <option>Angular</option>
                <option>Django</option>
              </select>
            </div>
          </div>
        </Card>

        <Card className="bg-black/60 backdrop-blur-md border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Code Style Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-300">Code Formatting Style</label>
              <select className="w-full mt-1 rounded-md border border-gray-700 bg-black text-white px-3 py-2">
                <option>Standard</option>
                <option>Google Style</option>
                <option>Airbnb Style</option>
                <option>Custom</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300">Indentation</label>
              <select className="w-full mt-1 rounded-md border border-gray-700 bg-black text-white px-3 py-2">
                <option>2 spaces</option>
                <option>4 spaces</option>
                <option>Tab</option>
              </select>
            </div>
          </div>
        </Card>

        <Card className="bg-black/60 backdrop-blur-md border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Integration Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-300">GitHub Integration</label>
              <Input type="text" placeholder="GitHub Personal Access Token" className="bg-black border-gray-700 text-white" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300">IDE Integration</label>
              <select className="w-full mt-1 rounded-md border border-gray-700 bg-black text-white px-3 py-2">
                <option>VS Code</option>
                <option>IntelliJ IDEA</option>
                <option>Sublime Text</option>
                <option>Atom</option>
              </select>
            </div>
          </div>
        </Card>

        <div className="flex justify-end space-x-4">
          <Button variant="outline" className="border-gray-700 text-gray-400 hover:text-white">Reset to Defaults</Button>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white">Save Changes</Button>
        </div>
      </div>
    </div>
  )
} 