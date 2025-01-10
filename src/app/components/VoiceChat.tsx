'use client'
import React, { useState } from 'react'
import { ReactMic } from 'react-mic'
import axios from 'axios'

const VoiceChat = () => {
  const [recording, setRecording] = useState(false)
  const [responseAudio, setResponseAudio] = useState<string | null>(null)

  const startRecording = () => setRecording(true)
  const stopRecording = () => setRecording(false)

  const onStop = async (recordedBlob: any) => {
    try {
      const formData = new FormData()
      formData.append('file', recordedBlob.blob)

      const textResponse = await axios.post(
        '/api/chatbot/speech-to-text',
        formData,
      )
      const userText = textResponse?.data.text

      const chatResponse = await axios.post('/api/chatbot/chat', {
        message: userText,
      })
      const aiText = chatResponse.data

      const voiceResponse = await axios.post('/api/chatbot/text-to-speech', {
        text: aiText,
      })
      setResponseAudio(voiceResponse.data.audioUrl)
    } catch (error) {
      console.error('Error processing voice:', error)
    }
  }

  return (
    <div className='grid  gap-y-5 gap-x-5  bg-[#2684ff]  text-white py-6 px-4 rounded-lg '>
      <h1 className='text-2xl font-bold'>IFS Guide Voice-to-Voice Chat App</h1>
      <ReactMic
        record={recording}
        className='w-full my-4 rounded-xl'
        onStop={onStop}
        mimeType='audio/wav'
        strokeColor='#000000'
        backgroundColor='#4c9ef1'
      />
      <div className='space-x-4 flex items-center justify-center w-full'>
        <button
          onClick={startRecording}
          className='btn btn-primary text-lg font-semibold'
        >
          Start Recording
        </button>
        <button
          onClick={stopRecording}
          className='btn btn-secondary text-lg font-semibold'
        >
          Stop Recording
        </button>
      </div>

      {responseAudio && (
        <div className='flex items-center justify-center w-full mt-12'>
          <audio src={responseAudio} controls />
        </div>
      )}
    </div>
  )
}

export default VoiceChat
