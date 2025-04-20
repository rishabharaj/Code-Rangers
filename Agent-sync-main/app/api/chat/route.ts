import { NextResponse } from "next/server"
import OpenAI from "openai"

const token = "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"
const endpoint = "https://models.inference.ai.azure.com"
const modelName = "gpt-4o-mini"

export async function POST(request: Request) {
  try {
    const { message } = await request.json()

    const client = new OpenAI({ baseURL: endpoint, apiKey: token })
    const response = await client.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: message }
      ],
      model: modelName,
      temperature: 1,
      max_tokens: 1000,
      top_p: 1
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
