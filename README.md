# IFS-Guide-Chatbot - Voice-to-Voice Chat Feature

Overview This project implements a Voice-to-Voice Chat feature using Next.js 15,
powered by OpenAI APIs. The goal is to deliver an intuitive and cost-effective
solution with minimal latency, enabling users to communicate seamlessly through
voice.

## Features

- Record and process user voice input.
- Convert recorded voice to text and generate AI responses.
- Convert the AI-generated response back to voice and play it for the user.
- Optimized for low cost and low latency to ensure a smooth user experience.
- Responsive Design
- Error Handling

## API Selection

To balance cost and latency, the Text-to-Voice and Voice-to-Text API was chosen:

- Low Cost (2): Keeps expenses minimal.
- Moderate Latency (4): Provides a good user experience.
- Supports both Speech-to-Text and Text-to-Speech, aligning with the project
  requirements.

## Development

clone IFS-Guid-Chatbot to your local machine. Then to install its dependencies
run

```sh
npm install
```

Create a copy of .env.example file and call it .env; the default backend API key
is provided in the .env.example.

```sh
cp  .env.example .env.local
```

## Technologies

- **Framework**: Next.js 15 with TypeScript.
- **UI Libraries**: React, Tailwind CSS (optional, for styling).
- **TypeScript**: A superset of JavaScript that adds static types, enhancing
  code quality and maintainability in the React app.
- - Tailwind CSS - A utility-first CSS framework.
- **Prettiier**: Code formatting is maintained with Prettier, ensuring a
  consistent and clean codebase.

## Configuration

The `.env.example` file gives you the default port for the front end and the
`API keys`. Just copy it, rename the copy to `.env.local`, and you're good to
go. If you've tweaked the backend app's config, remember to update the
environmental config in the frontend's `.env.local` file.
