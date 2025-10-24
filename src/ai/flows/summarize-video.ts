'use server';

/**
 * @fileOverview Summarizes a surgical video to provide a quick understanding of its key points.
 *
 * - summarizeVideo - A function that summarizes a surgical video.
 * - SummarizeVideoInput - The input type for the summarizeVideo function.
 * - SummarizeVideoOutput - The return type for the summarizeVideo function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeVideoInputSchema = z.object({
  videoTitle: z.string().describe('The title of the surgical video.'),
  videoTranscript: z
    .string()
    .describe('The transcript of the surgical video.'),
  surgeonNotes: z
    .string()
    .optional()
    .describe('Optional notes from Dr. Dutta about the video.'),
});

export type SummarizeVideoInput = z.infer<typeof SummarizeVideoInputSchema>;

const SummarizeVideoOutputSchema = z.object({
  summary: z.string().describe('A summary of the surgical video.'),
});

export type SummarizeVideoOutput = z.infer<typeof SummarizeVideoOutputSchema>;

export async function summarizeVideo(input: SummarizeVideoInput): Promise<SummarizeVideoOutput> {
  return summarizeVideoFlow(input);
}

const summarizeVideoPrompt = ai.definePrompt({
  name: 'summarizeVideoPrompt',
  input: {
    schema: SummarizeVideoInputSchema,
  },
  output: {
    schema: SummarizeVideoOutputSchema,
  },
  prompt: `You are an AI assistant that helps surgeons quickly understand the key points of surgical videos.

You will be provided with the video title, the video transcript, and optional notes from Dr. Dutta.

Your goal is to generate a concise and informative summary of the video that allows surgeons to decide if the video is relevant to their needs without having to watch the entire thing.

Video Title: {{{videoTitle}}}
Video Transcript: {{{videoTranscript}}}
Dr. Dutta's Notes (Optional): {{{surgeonNotes}}}

Summary:`,
});

const summarizeVideoFlow = ai.defineFlow(
  {
    name: 'summarizeVideoFlow',
    inputSchema: SummarizeVideoInputSchema,
    outputSchema: SummarizeVideoOutputSchema,
  },
  async input => {
    const {output} = await summarizeVideoPrompt(input);
    return output!;
  }
);
