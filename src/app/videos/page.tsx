import { PageHeader } from '@/components/page-header';
import VideoLibraryClient from '@/components/video-library-client';
import { Suspense } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Complication, Video } from '@/lib/data'; // Assuming Video type is defined here

// Helper function to fetch simple tables
async function fetchCategories(tableName: string) {
    const { data, error } = await supabase.from(tableName).select('*');
    if (error) {
        console.error(`Error fetching ${tableName}:`, error.message);
        return [];
    }
    return data;
}

// Helper function to fetch the videos WITH their related category names
async function fetchVideosWithDetails() {
    const { data, error } = await supabase.from('Video').select(`
    id,
    title,
    description,
    thumbnail_url,
    duration_seconds,
    dr_dutta_notes,
    complication: Complication ( name ),
    difficulty: Difficulty ( name ),
    technique: Technique ( name )
  `);

    if (error) {
        console.error(`Error fetching videos:`, error.message);
        return [];
    }

    // The data from Supabase is nested, like:
    // { id: '...', complication: { name: 'PCR' } }
    // We need to flatten it to what your component expects:
    // { id: '...', complication: 'PCR' }
    const flatData = data.map((video: any) => ({
        ...video,
        thumbnail: video.thumbnail_url, // Add this line
        complication: video.complication?.name || null,
        difficulty: video.difficulty?.name || null,
        technique: video.technique?.name || null,
    }));

    return flatData as Video[];
}

export default async function VideoLibraryPage() {
    // Fetch all data in parallel
    const [complications, difficultiesData, techniquesData, videos] =
        await Promise.all([
            fetchCategories('Complication') as Promise<Complication[]>,
            fetchCategories('Difficulty'),
            fetchCategories('Technique'),
            fetchVideosWithDetails(), // Use our new, smarter function
        ]);

    // Extract just the names for the filter dropdowns
    const difficulties = difficultiesData.map((d: any) => d.name);
    const techniques = techniquesData.map((t: any) => t.name);

    return (
        <div className="flex flex-col gap-8 py-8 md:py-16">
            <PageHeader
                title="Surgical Video Library"
                description="Browse and filter surgical videos by complication, technique, and difficulty."
            />
            <Suspense>
                <VideoLibraryClient
                    videos={videos}
                    complications={complications}
                    difficulties={difficulties}
                    techniques={techniques}
                />
            </Suspense>
        </div>
    );
}