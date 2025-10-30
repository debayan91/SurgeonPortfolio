import { PageHeader } from '@/components/page-header';
import VideoLibraryClient from '@/components/video-library-client';
import { Suspense } from 'react';
import { supabase } from '@/lib/supabaseClient'; // Import Supabase
import { Complication, Video } from '@/lib/data'; // Keep types for props

// Helper function to fetch data
async function fetchData(tableName: string) {
    const { data, error } = await supabase.from(tableName).select('*');
    if (error) {
        console.error(`Error fetching ${tableName}:`, error.message);
        return [];
    }
    return data;
}

export default async function VideoLibraryPage() {
    // Fetch all data in parallel from Supabase
    const [complications, difficultiesData, techniquesData, videos] =
        await Promise.all([
            fetchData('Complication') as Promise<Complication[]>,
            fetchData('Difficulty'),
            fetchData('Technique'),
            fetchData('Video') as Promise<Video[]>, // This will be empty for now
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