import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

// This is the main function that runs when you visit /api/sync-videos
export async function GET() {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
  const PLAYLIST_ID = 'PLDC3mC53qq1PAmCxmfPwGLsTvVePiCGlB';
  const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3';

  if (!YOUTUBE_API_KEY) {
    return NextResponse.json(
      { error: 'YouTube API key is not set.' },
      { status: 500 }
    );
  }

  try {
    // 1. Fetch all video IDs from the playlist
    const playlistUrl = `${YOUTUBE_API_URL}/playlistItems?part=contentDetails&maxResults=50&playlistId=${PLAYLIST_ID}&key=${YOUTUBE_API_KEY}`;
    const playlistResponse = await fetch(playlistUrl);
    const playlistData = await playlistResponse.json();

    if (!playlistData.items) {
      console.error('Error fetching playlist:', playlistData);
      return NextResponse.json(
        { error: 'Failed to fetch playlist from YouTube.' },
        { status: 500 }
      );
    }

    const videoIds = playlistData.items.map(
      (item: any) => item.contentDetails.videoId
    );

    // 2. Fetch detailed info for all those video IDs in one go
    const videosUrl = `${YOUTUBE_API_URL}/videos?part=snippet,contentDetails&id=${videoIds.join(
      ','
    )}&key=${YOUTUBE_API_KEY}`;
    const videosResponse = await fetch(videosUrl);
    const videosData = await videosResponse.json();

    // 3. Format the data to match our Supabase 'Video' table
    const videosToInsert = videosData.items.map((video: any) => {
      // Helper to convert YouTube's duration format (e.g., "PT15M3S") to seconds
      const parseDuration = (duration: string) => {
        const matches = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
        if (!matches) return 0;
        const [_, hours, minutes, seconds] = matches.map(Number);
        return (hours || 0) * 3600 + (minutes || 0) * 60 + (seconds || 0);
      };

      return {
        id: video.id,
        title: video.snippet.title,
        description: video.snippet.description,
        thumbnail_url: video.snippet.thumbnails.high.url,
        duration_seconds: parseDuration(video.contentDetails.duration),
        // These will be null, as Dr. Dutta needs to add them later
        dr_dutta_notes: null,
        complication_id: null,
        technique_id: null,
        difficulty_id: null,
      };
    });

    // 4. Save (or update) the videos in our database
    // "upsert" means "update if it exists, insert if it doesn't"
    const { data, error } = await supabase
      .from('Video')
      .upsert(videosToInsert)
      .select();

    if (error) {
      console.error('Supabase error:', error);
      throw new Error(error.message);
    }

    return NextResponse.json({
      message: `Successfully synced ${data?.length || 0} videos.`,
      data: data,
    });
  } catch (error: any) {
    console.error('Sync error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}