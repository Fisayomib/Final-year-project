import OpenAi from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { env } from "@/env";

const openai = new OpenAi({
  apiKey: env.OPENAI_API_KEY,
});
// const openai = new OpenAi(config);

// POST localhost:3000/api/chat
export async function POST(request: Request) {
  const { messages } = (await request.json()) as {
    messages: OpenAi.Chat.ChatCompletionMessageParam[];
  }; // { messages: [] }

  // createChatCompletion (get response from GPT-4)
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-16k",
    stream: true,
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant. You explain School Related concepts simply to university students. Try to keep you responses short and sweet",
      },
      ...messages,
    ],
  });

  // create a stream of data from OpenAI (stream data to the frontend)
  const stream = OpenAIStream(response);

  // send the stream as a response to our client / frontend
  return new StreamingTextResponse(stream);
}
