import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import OpenAI from 'openai'

const API_KEY =
  process.env.NEXT_PUBLIC_OPENAI_API_KEY ||
  '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'

const openai = new OpenAI({
  apiKey: API_KEY,
})

export async function POST(req: Request) {
  try {
    const { text } = await req.json()
    const fileName = 'speech.mp3'
    const filePath = path.join(process.cwd(), 'public', 'audio', fileName)

    const dir = path.dirname(filePath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }

    const mp3 = await openai.audio.speech.create({
      model: 'tts-1',
      voice: 'alloy',
      input: text,
    })

    const buffer = Buffer.from(await mp3.arrayBuffer())
    await fs.promises.writeFile(filePath, buffer)

    const publicUrl = `/audio/${fileName}`
    return NextResponse.json({
      message: 'Speech file created successfully',
      audioUrl: publicUrl,
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create speech file', details: error },
      { status: 500 },
    )
  }
}
