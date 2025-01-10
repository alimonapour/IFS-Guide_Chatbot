import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import fs from 'fs'
import path from 'path'

const API_KEY =
  process.env.NEXT_PUBLIC_OPENAI_API_KEY ||
  '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'

const openai = new OpenAI({
  apiKey: API_KEY,
})

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const audioFile = formData.get('file') as File

    if (!audioFile) {
      return NextResponse.json(
        { error: 'No audio file provided' },
        { status: 400 },
      )
    }

    const dirPath = path.resolve('E:/tmp')
    const filePath = '/tmp/speech.mp3'
    await fs.promises.mkdir(dirPath, { recursive: true })
    const buffer = Buffer.from(await audioFile.arrayBuffer())
    await fs.promises.writeFile(filePath, buffer)

    const translation = await openai.audio.translations.create({
      file: fs.createReadStream(filePath),
      model: 'whisper-1',
    })

    return NextResponse.json({ text: translation.text })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to transcribe audio', details: error },
      { status: 500 },
    )
  }
}
