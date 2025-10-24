import { getVideoById } from '@/lib/data';
import { notFound } from 'next/navigation';
import VideoDetailClient from '@/components/video-detail-client';

export default async function VideoPage({ params }: { params: { id: string } }) {
  const video = await getVideoById(params.id);

  if (!video) {
    notFound();
  }

  return (
    <div className="py-8 md:py-16">
      <VideoDetailClient video={video} />
    </div>
  );
}
