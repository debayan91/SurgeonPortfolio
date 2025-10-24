import { PageHeader } from '@/components/page-header';
import VideoLibraryClient from '@/components/video-library-client';
import { getVideos, getComplications } from '@/lib/data';
import { Suspense } from 'react';

export default async function VideoLibraryPage() {
  const videos = await getVideos();
  const complications = await getComplications();

  const difficulties = [
    'Beginner',
    'Intermediate',
    'Advanced',
  ];

  const techniques = [...new Set(videos.map(video => video.technique))];

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
