import { supabase } from '@/lib/supabaseClient';
import VideoDetailClient from '@/components/video-detail-client';
import { notFound } from 'next/navigation';
import { Video, TranscriptCue } from '@/lib/data';

type VideoDetailPageProps = {
    params: {
        id: string;
    };
};

export default async function VideoPage({ params }: VideoDetailPageProps) {
    // DO NOT DESTRUCTURE `id` HERE. This is the problem.
    // const { id } = params; // <-- REMOVE THIS LINE

    // --- 1. Fetch Video Details ---
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
        .eq('id', params.id) // <-- Use params.id directly
        .single();

    // --- 2. Fetch Transcript ---
    const { data: transcriptData, error: transcriptError } = await supabase
        .from('TranscriptCue')
        .select('id, start_time_seconds, text')
        .eq('video_id', params.id) // <-- Use params.id directly
        .order('start_time_seconds', { ascending: true });

    // --- 3. Handle Errors ---
    if (videoError || !videoData) {
        console.error('Error fetching video:', videoError?.message);
        notFound();
    }

    // --- 4. Format Data for the Client Component ---
    const formattedTranscript: TranscriptCue[] = (transcriptData || []).map(
        (cue: any) => ({
            id: cue.id,
            startTime: cue.start_time_seconds,
            text: cue.text,
        })
    );

    const video: Video = {
        id: videoData.id,
        title: videoData.title,
        description: videoData.description,
        thumbnail: '',
        duration: videoData.duration_seconds,
        drDuttaNotes: videoData.dr_dutta_notes,
        complication: videoData.complication?.name || 'N/A',
        difficulty: videoData.difficulty?.name || 'N/A',
        technique: videoData.technique?.name || 'N/A',
        transcript: formattedTranscript,
    };

    // --- 5. Render the Client Component ---
    return <VideoDetailClient video={video} />;
}