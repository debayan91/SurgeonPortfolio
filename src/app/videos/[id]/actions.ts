'use server';

import { aiSurgicalAssistant } from '@/ai/flows/ai-surgical-assistant';
import { Video } from '@/lib/data';

export async function askAI(
  video: Video,
  question: string
): Promise<{ answer: string } | { error: string }> {
  try {
    if (!question.trim()) {
      return { error: 'Question cannot be empty.' };
    }
    const result = await aiSurgicalAssistant({
      videoId: video.id,
      question: question,
      videoTranscript: video.transcript.map((t) => t.text).join(' '),
      drDuttaNotes: video.drDuttaNotes,
    });
    return { answer: result.answer };
  } catch (e) {
    console.error(e);
    return { error: 'An error occurred while communicating with the AI. Please try again.' };
  }
}
