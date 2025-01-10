import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const API_KEY =
  process.env.NEXT_PUBLIC_OPENAI_API_KEY ||
  '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'

const openai = new OpenAI({
  apiKey: API_KEY,
})

export async function POST(req: Request) {
  if (req.method !== 'POST') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
  }

  try {
    const { message } = await req.json()

    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: message }],
      model: 'gpt-4',
    })

    return NextResponse.json(completion.choices[0].message.content)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to get completion', details: error },
      { status: 500 },
    )
  }
}
