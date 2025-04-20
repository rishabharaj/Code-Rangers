import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface AgentProps {
  agent: {
    id: string
    name: string
    description: string
    icon: LucideIcon
    color: string
    status: string
  }
}

export function AgentCard({ agent }: AgentProps) {
  return (
    <Link href={`/agent/${agent.id}`}>
      <div className="group h-full flex flex-col rounded-xl overflow-hidden bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/10">
        <div className={`${agent.color} p-6`}>
          <agent.icon className="w-8 h-8 text-white" />
        </div>
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-semibold text-white group-hover:text-purple-300 transition-colors duration-300">
              {agent.name}
            </h3>
            <Badge variant={agent.status === "active" ? "default" : "secondary"}>
              {agent.status === "active" ? "Active" : "In Development"}
            </Badge>
          </div>
          <p className="text-gray-400 mb-4 flex-1">{agent.description}</p>
          <div className="flex justify-between items-center mt-auto">
            <span className="text-sm text-gray-500">Click to access</span>
            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center group-hover:bg-purple-600 transition-colors duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-400 group-hover:text-white transition-colors duration-300"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
