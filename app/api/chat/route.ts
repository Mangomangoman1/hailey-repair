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

const MODEL_ID = 'gemini-2.0-flash'

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

function jitterRange(minMs: number, maxMs: number) {
  return Math.floor(minMs + Math.random() * (maxMs - minMs))
}

export async function POST(request: Request) {
  try {
    const { messages } = await request.json()

    // basic abuse guard: don't allow endless chats per page load
    const userCount = Array.isArray(messages)
      ? messages.filter((m: any) => m?.role === 'user').length
      : 0
    if (userCount > 50) {
      return NextResponse.json(
        {
          message:
            "You've hit the chat limit for this session. If you still need help, please call or text Sam at (208) 450-3730."
        },
        { status: 200 }
      )
    }

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      console.error('GEMINI_API_KEY not found in environment')
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
    }

    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({
      model: MODEL_ID,
      systemInstruction: SYSTEM_PROMPT,
    })

    // Build prompt: keep only recent context to reduce load + avoid rate limiting
    const userMessages = messages.filter((m: any) => m?.role === 'user')
    const lastUserMessage = userMessages[userMessages.length - 1]?.content || ''

    // Keep last N messages (roughly N/2 turns)
    const MAX_CONTEXT_MESSAGES = 8 // ~4 turns
    const trimmed = messages.slice(-MAX_CONTEXT_MESSAGES)

    let conversationContext = ''
    let foundFirstUser = false
    for (let i = 0; i < trimmed.length; i++) {
      const msg = trimmed[i]
      if (msg.role === 'user') foundFirstUser = true
      if (!foundFirstUser) continue
      if (i === trimmed.length - 1) break // exclude last user message, added separately
      const role = msg.role === 'user' ? 'Customer' : 'Tech Helper'
      conversationContext += `${role}: ${msg.content}\n\n`
    }

    const fullPrompt = conversationContext
      ? `Conversation so far:\n${conversationContext}\nCustomer: ${lastUserMessage}\n\nTech Helper:`
      : `Customer: ${lastUserMessage}\n\nTech Helper:`

    // Automatic retry on transient 429s
    const maxAttempts = 2
    let lastErr: any = null

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        const result = await model.generateContent(fullPrompt)
        const response = result.response.text()
        return NextResponse.json({ message: response })
      } catch (err: any) {
        lastErr = err
        const status = err?.status || err?.response?.status

        // Retry once on rate limiting / resource exhaustion
        if (status === 429 && attempt < maxAttempts) {
          // back off a bit longer; short jitter reduces user-visible failures
          await sleep(jitterRange(1500, 2500))
          continue
        }
        break
      }
    }

    console.error('Chat API error:', lastErr)

    // If it's a 429 even after retry, return a friendly message (still 200 for UI simplicity)
    if (lastErr?.status === 429) {
      return NextResponse.json(
        {
          message:
            "I'm a little overloaded right now. Please try again in a few seconds—or call/text Sam at (208) 450-3730 and he'll help you directly."
        },
        { status: 200 }
      )
    }

    return NextResponse.json(
      { message: 'Sorry — something went wrong. Please call or text Sam at (208) 450-3730.' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { message: 'Sorry — something went wrong. Please call or text Sam at (208) 450-3730.' },
      { status: 200 }
    )
  }
}
