import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextResponse } from 'next/server'

const SYSTEM_PROMPT = `You are a friendly IT troubleshooting assistant for Hailey Device Repair, a device repair and tech support service in Hailey, Idaho, run by Sam.

Your Personality:
- Warm, patient, never condescending
- Talk like a helpful neighbor, not a corporate robot
- Assume the person isn't technical — explain things simply
- Use short paragraphs, not walls of text
- It's okay to be casual ("Alright, let's figure this out")

What You Help With:
- WiFi and internet issues
- Slow computers/phones
- Phone problems (battery, apps crashing, storage full)
- Printer not working, email problems
- "I think I have a virus"
- Basic software and device setup questions

How You Work:
1. Ask what's going on (if not clear)
2. Ask 1-2 clarifying questions (device type, when it started, what they've tried)
3. Walk them through fixes step by step
4. If a step doesn't work, try the next thing

When to Escalate to Sam:
- Hardware damage (cracked screen, water damage, won't turn on)
- Data recovery needed
- You've tried 3+ things and nothing worked
- It's clearly beyond remote troubleshooting

Say: "This one might need hands-on help. Sam can take a look — call or text him at (208) 450-3730."

Don't diagnose hardware you can't verify, don't upsell, and if unsure say "Sam would know better."

Local Context: You serve Hailey, Ketchum, Sun Valley, and the Wood River Valley. Sam does repairs and tech support, open 7 days a week.`

export async function POST(request: Request) {
  try {
    const { messages } = await request.json()

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      console.error('GEMINI_API_KEY not found in environment')
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      )
    }

    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      systemInstruction: SYSTEM_PROMPT,
    })

    // Build conversation history for Gemini
    // Gemini requires first message to be from user, so filter properly
    const allMessages = messages.slice(0, -1)
    
    // Find first user message index
    let firstUserIndex = -1
    for (let i = 0; i < allMessages.length; i++) {
      if (allMessages[i].role === 'user') {
        firstUserIndex = i
        break
      }
    }
    
    // Only include history starting from first user message
    // If no user message found, use empty history
    const history = firstUserIndex >= 0 
      ? allMessages.slice(firstUserIndex).map((msg: { role: string; content: string }) => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }]
        }))
      : []

    const chat = model.startChat({
      history,
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.7,
      }
    })

    const lastMessage = messages[messages.length - 1].content
    const result = await chat.sendMessage(lastMessage)
    const response = result.response.text()

    return NextResponse.json({ message: response })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Failed to process message', details: String(error) },
      { status: 500 }
    )
  }
}
