from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from azure.ai.inference import ChatCompletionsClient
from azure.ai.inference.models import SystemMessage, UserMessage
from azure.core.credentials import AzureKeyCredential

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load environment variables
os.environ["GITHUB_TOKEN"] = "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"
endpoint = "https://models.github.ai/inference"
model = "deepseek/DeepSeek-V3-0324"
token = os.environ["GITHUB_TOKEN"]

# Initialize the client
client = ChatCompletionsClient(
    endpoint=endpoint,
    credential=AzureKeyCredential(token),
)

class ChatRequest(BaseModel):
    message: str
    system_message: str = "You are a helpful assistant."

@app.post("/api/chat")
async def chat(request: ChatRequest):
    try:
        response = client.complete(
            messages=[
                SystemMessage(request.system_message),
                UserMessage(request.message),
            ],
            temperature=1.0,
            top_p=1.0,
            max_tokens=1000,
            model=model
        )
        return {"response": response.choices[0].message.content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 