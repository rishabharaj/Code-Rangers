import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET() {
  try {
    const { db } = await connectToDatabase()

    const agents = await db.collection("agents").find({}).toArray()

    return NextResponse.json({ agents }, { status: 200 })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch agents" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { db } = await connectToDatabase()
    const data = await request.json()

    // Validate required fields
    if (!data.name || !data.description || !data.type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const newAgent = {
      name: data.name,
      description: data.description,
      type: data.type,
      icon: data.icon || "brain",
      color: data.color || "bg-purple-500",
      status: data.status || "development",
      createdAt: new Date(),
    }

    const result = await db.collection("agents").insertOne(newAgent)

    return NextResponse.json(
      {
        message: "Agent created successfully",
        agentId: result.insertedId,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to create agent" }, { status: 500 })
  }
}
