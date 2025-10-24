'use server';

/**
 * @fileOverview This file defines the AI Surgical Assistant flow, which allows medical professionals
 * to ask questions about surgical videos and receive accurate answers based on video transcripts and Dr. Dutta's notes.
 *
 * @exports {
 *   aiSurgicalAssistant,
 *   AISurgicalAssistantInput,
 *   AISurgicalAssistantOutput
 * }
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AISurgicalAssistantInputSchema = z.object({
  videoId: z.string().describe('The ID of the surgical video to analyze.'),
  question: z.string().describe('The surgical question to answer.'),
  videoTranscript: z.string().describe('The transcript of the surgical video.'),
  drDuttaNotes: z.string().optional().describe('Dr. Dutta’s notes about the video.'),
});

export type AISurgicalAssistantInput = z.infer<typeof AISurgicalAssistantInputSchema>;

const AISurgicalAssistantOutputSchema = z.object({
  answer: z.string().describe('The answer to the surgical question based on the video transcript and Dr. Dutta’s notes.'),
});

export type AISurgicalAssistantOutput = z.infer<typeof AISurgicalAssistantOutputSchema>;

export async function aiSurgicalAssistant(input: AISurgicalAssistantInput): Promise<AISurgicalAssistantOutput> {
  return aiSurgicalAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiSurgicalAssistantPrompt',
  input: {
    schema: AISurgicalAssistantInputSchema,
  },
  output: {
    schema: AISurgicalAssistantOutputSchema,
  },
  prompt: `You are an AI surgical assistant that answers questions about surgical videos.

  You have access to the video transcript and Dr. Dutta's notes (if available). Use this information to answer the question accurately.
  If the answer cannot be found, say that the transcript and notes do not contain the answer.

  Video Transcript: {{{videoTranscript}}}

  Dr. Dutta's Notes: {{{drDuttaNotes}}}

  Question: {{{question}}}
  `,
});

const aiSurgicalAssistantFlow = ai.defineFlow(
  {
    name: 'aiSurgicalAssistantFlow',
    inputSchema: AISurgicalAssistantInputSchema,
    outputSchema: AISurgicalAssistantOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
