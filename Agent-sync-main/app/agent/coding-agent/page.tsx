"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Code, ArrowLeft, Settings, Play, History, BarChart3, GitBranch, Bug, FileCode, Link as LinkIcon, Clock, CheckCircle, XCircle, X, MessageSquare, Bot, Send } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"

export default function CodingAgentPage() {
  const [isRunning, setIsRunning] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [message, setMessage] = useState("")
  const [activeTab, setActiveTab] = useState('overview')
  const router = useRouter()

  const handleRunAgent = () => {
    console.log('Running agent...')
    setIsRunning(true)
    setShowChat(true)
  }

  const handleCloseChat = () => {
    setShowChat(false)
    setIsRunning(false)
  }

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle message sending
      setMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const quickActions = [
    {
      title: "Code Analysis",
      description: "Get instant code reviews and suggestions",
      icon: Code,
      color: "bg-blue-500",
    },
    {
      title: "Debugging Help",
      description: "Find and fix bugs in your code",
      icon: Bug,
      color: "bg-red-500",
    },
    {
      title: "Code Generation",
      description: "Generate code snippets and boilerplate",
      icon: FileCode,
      color: "bg-green-500",
    },
    {
      title: "Integration",
      description: "Help with API and service integration",
      icon: LinkIcon,
      color: "bg-purple-500",
    },
  ]

  const handleNavigation = (path: string) => {
    router.push(path)
  }

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

  useEffect(() => {
    if (showChat) {
      console.log('Initializing chat...')
      try {
        // Remove any existing script to avoid duplicates
        const existingScript = document.getElementById('botpress-script')
        if (existingScript) {
          document.body.removeChild(existingScript)
        }

        const script = document.createElement('script')
        script.id = 'botpress-script'
        script.src = "https://cdn.botpress.cloud/webchat/v2.3/inject.js"
        script.async = true

        script.onload = () => {
          console.log('Script loaded successfully')
          
          // Wait for Botpress object to be available
          const initializeChat = () => {
            // @ts-ignore
            if (typeof window !== 'undefined' && window.botpressWebChat) {
              try {
                console.log('Botpress object found, initializing...')
                // @ts-ignore
                window.botpressWebChat.init({
                  "composerPlaceholder": "Chat with your coding assistant...",
                  "botConversationDescription": "AI-powered coding assistant ready to help",
                  "botName": "Code Assistant",
                  "botId": "WSPDASZV",
                  "hostUrl": "https://cdn.botpress.cloud/webchat/v2.3",
                  "messagingUrl": "https://messaging.botpress.cloud",
                  "clientId": "WSPDASZV",
                  "webhookId": "WSPDASZV",
                  "lazySocket": true,
                  "useSessionStorage": true,
                  "enableReset": true,
                  "stylesheet": "https://webchat-styler-css.botpress.app/prod/code/5612e8d9-7b45-4caa-9301-2dd26f027cab/v92074/style.css",
                  "containerWidth": "100%25",
                  "layoutWidth": "100%25",
                  "hideWidget": true,
                  "disableAnimations": false,
                  "closeOnEscape": false,
                  "showPoweredBy": false,
                  "theme": "prism",
                  "themeColor": "#6366f1"
                })

                // Force show the chat
                setTimeout(() => {
                  // @ts-ignore
                  if (window.botpressWebChat) {
                    // @ts-ignore
                    window.botpressWebChat.sendEvent({ type: 'show' })
                  }
                }, 1000)

              } catch (error) {
                console.error('Error initializing chat:', error)
              }
            } else {
              console.log('Waiting for Botpress object...')
              setTimeout(initializeChat, 500)
            }
          }

          // Start initialization process
          initializeChat()
        }

        script.onerror = (error) => {
          console.error('Error loading script:', error)
        }

        document.body.appendChild(script)
      } catch (error) {
        console.error('Error in chat initialization:', error)
      }

      return () => {
        try {
          const script = document.getElementById('botpress-script')
          if (script) {
            document.body.removeChild(script)
          }
          // @ts-ignore
          if (typeof window !== 'undefined' && window.botpressWebChat) {
            // @ts-ignore
            window.botpressWebChat.destroy()
          }
        } catch (error) {
          console.error('Error in cleanup:', error)
        }
      }
    }
  }, [showChat])

  const renderContent = () => {
    switch(activeTab) {
      case 'history':
        return (
          <Card className="bg-black/60 backdrop-blur-md border-gray-700 p-6">
            <h2 className="text-2xl font-bold text-white mb-2">Recent Activity</h2>
            <p className="text-gray-400 mb-6">Latest agent runs and interactions</p>
            <div className="space-y-4">
              {historyItems.map((item) => (
                <div key={item.id} className="bg-[#0B1120] rounded-lg p-4 border border-gray-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-red-500 p-2 rounded-lg">
                        <Code className="h-4 w-4 text-white" />
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
                </div>
              ))}
            </div>
          </Card>
        );
      case 'settings':
        return (
          <Card className="bg-black/60 backdrop-blur-md border-gray-700 p-6">
            <h2 className="text-2xl font-bold text-white mb-2">Settings</h2>
            <p className="text-gray-400 mb-6">Configure your coding assistant preferences</p>
            
            <div className="space-y-6">
              <div className="bg-[#0B1120] rounded-lg p-6 border border-gray-800">
                <h3 className="text-lg font-semibold text-white mb-4">Language Preferences</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-300">Primary Programming Language</label>
                    <select className="w-full mt-1 rounded-md border border-gray-700 bg-black text-white px-3 py-2">
                      <option>JavaScript/TypeScript</option>
                      <option>Python</option>
                      <option>Java</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-[#0B1120] rounded-lg p-6 border border-gray-800">
                <h3 className="text-lg font-semibold text-white mb-4">Code Style Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-300">Code Formatting Style</label>
                    <select className="w-full mt-1 rounded-md border border-gray-700 bg-black text-white px-3 py-2">
                      <option>Standard</option>
                      <option>Google Style</option>
                      <option>Airbnb Style</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button variant="outline" className="border-gray-700 text-gray-400 hover:text-white">
                  Reset to Defaults
                </Button>
                <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                  Save Changes
                </Button>
              </div>
            </div>
          </Card>
        );
      case 'analytics':
        return (
          <div className="space-y-6">
            <Card className="bg-black/60 backdrop-blur-md border-gray-700 p-6">
              <h2 className="text-2xl font-bold text-white mb-2">Analytics Overview</h2>
              <p className="text-gray-400 mb-6">Track your coding assistant usage and performance</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#0B1120] rounded-lg p-4 border border-gray-800">
                  <h3 className="text-sm font-medium text-gray-400">Total Sessions</h3>
                  <p className="text-2xl font-bold text-white mt-2">124</p>
                </div>
                <div className="bg-[#0B1120] rounded-lg p-4 border border-gray-800">
                  <h3 className="text-sm font-medium text-gray-400">Code Reviews</h3>
                  <p className="text-2xl font-bold text-white mt-2">45</p>
                </div>
                <div className="bg-[#0B1120] rounded-lg p-4 border border-gray-800">
                  <h3 className="text-sm font-medium text-gray-400">Debug Sessions</h3>
                  <p className="text-2xl font-bold text-white mt-2">32</p>
                </div>
                <div className="bg-[#0B1120] rounded-lg p-4 border border-gray-800">
                  <h3 className="text-sm font-medium text-gray-400">Code Generated</h3>
                  <p className="text-2xl font-bold text-white mt-2">89</p>
                </div>
              </div>
            </Card>

            <Card className="bg-black/60 backdrop-blur-md border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Response Time Analysis</h3>
              <div className="h-64 bg-[#0B1120] rounded-lg border border-gray-800 flex items-center justify-center">
                <p className="text-gray-400">Response time chart will be displayed here</p>
              </div>
            </Card>

            <Card className="bg-black/60 backdrop-blur-md border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Language Distribution</h3>
              <div className="h-64 bg-[#0B1120] rounded-lg border border-gray-800 flex items-center justify-center">
                <p className="text-gray-400">Language distribution chart will be displayed here</p>
              </div>
            </Card>
          </div>
        );
      default:
        return (
          <>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-3 mb-6">
              <Card className="bg-black/60 backdrop-blur-md border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-white mb-1">Status</h3>
                <p className="text-sm text-gray-400 mb-4">Current agent status</p>
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <span className="text-white">Active</span>
                </div>
              </Card>

              <Card className="bg-black/60 backdrop-blur-md border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-white mb-1">Usage</h3>
                <p className="text-sm text-gray-400 mb-4">Agent usage statistics</p>
                <div className="text-2xl font-bold text-white">182</div>
                <p className="text-sm text-gray-400">Total runs this month</p>
              </Card>

              <Card className="bg-black/60 backdrop-blur-md border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-white mb-1">Performance</h3>
                <p className="text-sm text-gray-400 mb-4">Response time and accuracy</p>
                <div className="flex justify-between">
                  <div>
                    <div className="text-2xl font-bold text-white">96%</div>
                    <p className="text-sm text-gray-400">Accuracy rate</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">0.8s</div>
                    <p className="text-sm text-gray-400">Avg. response time</p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="grid gap-6 mb-6">
              <Card className="bg-black/60 backdrop-blur-md border-gray-700 p-6">
                <h3 className="text-xl font-semibold text-white mb-6">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {quickActions.map((action) => (
                    <div
                      key={action.title}
                      className="p-4 rounded-lg border border-gray-700 hover:border-white transition-colors cursor-pointer bg-black/40"
                    >
                      <div className={`${action.color} w-10 h-10 rounded-lg flex items-center justify-center mb-3`}>
                        <action.icon className="h-5 w-5 text-white" />
                      </div>
                      <h4 className="font-medium text-white mb-1">{action.title}</h4>
                      <p className="text-sm text-gray-400">{action.description}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="bg-black/60 backdrop-blur-md border-gray-700 p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Agent Description</h3>
                <p className="text-gray-400 mb-6">
                  How this agent works and what it can do
                </p>
                <div className="space-y-4">
                  <p className="text-gray-300">
                    The Coding Assistant is designed to help you write, review, and improve your code efficiently. 
                    It uses advanced AI algorithms to understand context, provide suggestions, and help with debugging.
                  </p>
                  <h4 className="font-semibold text-white mt-4">Capabilities:</h4>
                  <ul className="list-disc pl-6 space-y-2 text-gray-400">
                    <li>Analyze and review code for best practices and potential improvements</li>
                    <li>Help debug issues and suggest fixes</li>
                    <li>Generate code snippets and boilerplate code</li>
                    <li>Provide documentation suggestions and explanations</li>
                    <li>Assist with third-party API and service integrations</li>
                  </ul>
                </div>
              </Card>
            </div>
          </>
        );
    }
  }

  return (
    <div className="flex-1 bg-gradient-to-br from-gray-900 to-gray-800 p-8 pt-6">
      <div className="mb-6">
        <Link href="/" className="text-sm text-gray-400 hover:text-white flex items-center">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Dashboard
        </Link>
      </div>

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="bg-blue-500 p-3 rounded-lg">
            <Code className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Coding Assistant</h1>
            <p className="text-gray-400">
              Get help with coding, debugging, and code reviews
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="flex items-center space-x-2 text-gray-400 hover:text-white">
            <Settings className="h-4 w-4" />
            <span>Configuration</span>
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleRunAgent}>
            {isRunning ? "Processing..." : "Run Agent"}
          </Button>
        </div>
      </div>

      <div className="bg-[#0B1120] rounded-lg p-1 mb-8 w-fit">
        <div className="flex space-x-1">
          <Button 
            variant="ghost" 
            className={`px-6 ${activeTab === 'overview' ? 'bg-[#1B2B4B] text-white' : 'text-[#8590A6] hover:text-white'}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </Button>
          <Button 
            variant="ghost" 
            className={`px-6 ${activeTab === 'history' ? 'bg-[#1B2B4B] text-white' : 'text-[#8590A6] hover:text-white'}`}
            onClick={() => setActiveTab('history')}
          >
            <History className="h-4 w-4 mr-2" />
            History
          </Button>
          <Button 
            variant="ghost" 
            className={`px-6 ${activeTab === 'settings' ? 'bg-[#1B2B4B] text-white' : 'text-[#8590A6] hover:text-white'}`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button 
            variant="ghost" 
            className={`px-6 ${activeTab === 'analytics' ? 'bg-[#1B2B4B] text-white' : 'text-[#8590A6] hover:text-white'}`}
            onClick={() => setActiveTab('analytics')}
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </Button>
        </div>
      </div>

      {renderContent()}

      {showChat && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-[#1B2B4B] rounded-lg w-full max-w-3xl mx-4 overflow-hidden shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <div className="flex items-center gap-3">
                <div className="bg-purple-600 p-2 rounded-lg">
                  <MessageSquare className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-white">Chat with Coding Assistant</h2>
              </div>
              <Button
                variant="ghost"
                className="text-gray-400 hover:text-white"
                onClick={handleCloseChat}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="h-[600px] w-full">
              <iframe 
                src="https://cdn.botpress.cloud/webchat/v2.3/shareable.html?configUrl=https://files.bpcontent.cloud/2025/04/19/07/20250419070954-WSPDASZV.json"
                className="w-full h-full border-0"
                allow="microphone; geolocation"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 