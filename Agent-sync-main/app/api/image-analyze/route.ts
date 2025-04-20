import { NextResponse } from "next/server"
import OpenAI from "openai"

const token = process.env.GITHUB_TOKEN
const endpoint = "https://models.inference.ai.azure.com"
const modelName = "gpt-4o-mini"

export async function POST(request: Request) {
  try {
    const { message, image } = await request.json()

    const client = new OpenAI({ baseURL: endpoint, apiKey: token })

    const response = await client.chat.completions.create({
      messages: [
        { 
          role: "system", 
          content: "You are a helpful stock assistant that describes chart images in details." 
        },
        { 
          role: "user", 
          content: [
            { type: "text", text: message },
            { type: "image_url", image_url: {
              url: image,
              details: "low"
            }}
          ]
        }
      ],
      model: modelName
    })

    return NextResponse.json({ 
      content: response.choices[0].message.content 
    })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    )
  }
} 