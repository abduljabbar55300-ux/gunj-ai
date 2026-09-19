import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { message, language = 'English' } = await request.json();
  if (!message || typeof message !== 'string') return NextResponse.json({ error: 'A message is required.' }, { status: 400 });

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ reply: language === 'Urdu' ? 'میں Hub ہوں۔ ابھی AI کنکشن سیٹ اپ نہیں ہے، لیکن آپ کا پیغام موصول ہو گیا ہے۔' : `I received your message: “${message}”. Add OPENAI_API_KEY to enable intelligent replies.` });
  }

  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const completion = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      messages: [
        { role: 'system', content: `You are Hub, a concise and helpful personal AI assistant. Reply in ${language}. Help with planning, tasks, notes, research, and everyday questions. Never claim to have completed an external action unless a tool actually completed it.` },
        { role: 'user', content: message },
      ],
      temperature: 0.7,
    });
    return NextResponse.json({ reply: completion.choices[0]?.message?.content || 'I could not generate a response.' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'The AI service is unavailable. Check your API key and try again.' }, { status: 502 });
  }
}
