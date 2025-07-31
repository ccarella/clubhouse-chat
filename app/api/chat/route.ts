import { streamText, convertToModelMessages } from 'ai';
import { openai } from '@ai-sdk/openai';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  console.log('Chat API called');
  
  try {
    const body = await req.json();
    console.log('Request body:', JSON.stringify(body, null, 2));
    
    const { messages } = body;

    if (!process.env.OPENAI_API_KEY) {
      console.error('OpenAI API key not configured');
      return new Response(
        JSON.stringify({ error: 'OpenAI API key not configured' }), 
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log('Converting UI messages to model messages');
    const modelMessages = convertToModelMessages(messages);
    console.log('Model messages:', modelMessages);
    
    const result = streamText({
      model: openai('gpt-4o-mini'),
      messages: modelMessages,
      temperature: 0.7,
      maxOutputTokens: 1000,
    });

    console.log('Returning stream response');
    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error('Chat API error:', error);
    console.error('Error details:', error instanceof Error ? error.message : 'Unknown error');
    return new Response(
      JSON.stringify({ 
        error: 'Failed to process chat request',
        details: error instanceof Error ? error.message : 'Unknown error'
      }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}