"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Brain,
  BarChart3,
  Users,
  Settings,
  HelpCircle,
  Home,
  Code,
  Calendar,
  Youtube,
  MessageSquare,
  Twitter,
  FileText,
  Image,
  Heart,
} from "lucide-react"

const navigation = [
  {
    name: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    name: "AI Agents",
    href: "/agents",
    icon: Brain,
    subItems: [
      { name: "Coding Assistant", href: "/agent/coding-agent", icon: Code },
      { name: "Image Analyzer", href: "/agent/image-agent", icon: Image },
      { name: "Calendar Planner", href: "/agent/calendar-agent", icon: Calendar },
      { name: "Health Assistant", href: "/agent/health-agent", icon: Heart },
      { name: "Chat Assistant", href: "/agent/chat-agent", icon: MessageSquare },
      { name: "Twitter Analyzer", href: "/agent/twitter-agent", icon: Twitter },
      { name: "Customized Agent", href: "/agent/custom-agent", icon: Settings },
      { name: "Document Analyzer", href: "/agent/document-agent", icon: FileText },
    ],
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    name: "Team Access",
    href: "/team",
    icon: Users,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
  {
    name: "Help & Support",
    href: "/help",
    icon: HelpCircle,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <div className="flex-1 flex flex-col min-h-0 bg-gray-900">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <Brain className="h-8 w-8 text-purple-400" />
            <span className="ml-2 text-xl font-bold text-white">AgentSync</span>
          </div>
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {navigation.map((item) => (
              <div key={item.name}>
                <Link
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    pathname === item.href
                      ? "bg-gray-800 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  <item.icon
                    className={`mr-3 flex-shrink-0 h-6 w-6 ${
                      pathname === item.href ? "text-purple-400" : "text-gray-400 group-hover:text-gray-300"
                    }`}
                  />
                  {item.name}
                </Link>
                {item.subItems && (
                  <div className="ml-6 mt-2 space-y-1">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                          pathname === subItem.href
                            ? "bg-gray-800 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white"
                        }`}
                      >
                        <subItem.icon
                          className={`mr-3 flex-shrink-0 h-5 w-5 ${
                            pathname === subItem.href ? "text-purple-400" : "text-gray-400 group-hover:text-gray-300"
                          }`}
                        />
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
        <div className="flex-shrink-0 flex border-t border-gray-700 p-4">
          <div className="flex-shrink-0 w-full group block">
            <div className="flex items-center">
              <div>
                <div className="h-9 w-9 rounded-full bg-gray-700 flex items-center justify-center">
                  <span className="text-white text-sm font-medium">U</span>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">User</p>
                <p className="text-xs font-medium text-gray-400 group-hover:text-gray-300">
                  View profile
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
