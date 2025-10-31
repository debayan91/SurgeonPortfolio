import { supabase } from '@/lib/supabaseClient';
import VideoDetailClient from '@/components/video-detail-client';
import { notFound } from 'next/navigation';
import { Video, TranscriptCue } from '@/lib/data'; // Import your types

// This tells Next.js what props to expect (the 'id' from the URL)
type VideoDetailPageProps = {
  params: {
    id: string;
  };
};

// This is the main server component for the page
export default async function VideoPage({ params }: VideoDetailPageProps) {
  const { id } = params;

  // --- 1. Fetch Video Details ---
  // We fetch the video and join its category names
  const { data: videoData, error: videoError } = await supabase
    .from('Video')
    .select(
      `
      id,
      title,
      description,
      duration_seconds,
      dr_dutta_notes,
      complication: Complication ( name ),
      difficulty: Difficulty ( name ),
      technique: Technique ( name )
    `
    )
    .eq('id', id) // Get only the video with this ID
    .single(); // We expect only one result

  // --- 2. Fetch Transcript ---
  // We fetch all transcript cues for this video
  const { data: transcriptData, error: transcriptError } = await supabase
    .from('TranscriptCue')
    .select('id, start_time_seconds, text')
    .eq('video_id', id) // Get cues matching this video ID
    .order('start_time_seconds', { ascending: true }); // Ensure they are in order

  // --- 3. Handle Errors (e.g., video not found) ---
  if (videoError || !videoData) {
    console.error('Error fetching video:', videoError?.message);
    notFound(); // This will show a 404 page
  }

  // --- 4. Format Data for the Client Component ---
  // Your client component expects `transcript` with `startTime`
  const formattedTranscript: TranscriptCue[] = (transcriptData || []).map(
    (cue: any) => ({
      id: cue.id,
      startTime: cue.start_time_seconds,
      text: cue.text,
    })
  );

  // Build the final Video object to match the type
  const video: Video = {
    id: videoData.id,
    title: videoData.title,
    description: videoData.description,
    thumbnail: '', // Not needed on this page
    duration: videoData.duration_seconds,
    drDuttaNotes: videoData.dr_dutta_notes, // Map db column to prop
    complication: videoData.complication?.name || 'N/A',
    difficulty: videoData.difficulty?.name || 'N/A',
    technique: videoData.technique?.name || 'N/A',
    transcript: formattedTranscript,
  };

  // --- 5. Render the Client Component ---
  // Pass the complete, formatted video object to your client component
  return <VideoDetailClient video={video} />;
}