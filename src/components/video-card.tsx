import { Video } from '@/lib/data';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from './ui/badge';
import { Clock } from 'lucide-react';

type VideoCardProps = {
  video: Video;
};

export default function VideoCard({ video }: VideoCardProps) {
  const minutes = Math.floor(video.duration / 60);
  const seconds = video.duration % 60;
  const durationFormatted = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  return (
    <Card className="flex h-full transform-gpu flex-col overflow-hidden border-border bg-card shadow-md transition-all hover:-translate-y-1 hover:shadow-2xl hover:multicolor-shadow">
      <Link href={`/videos/${video.id}`} className="block">
        <div className="relative aspect-video">
          <Image
            src={video.thumbnail}
            alt={video.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            data-ai-hint="surgery operation"
          />
        </div>
      </Link>
      <CardHeader>
        <Link href={`/videos/${video.id}`} className="block">
          <CardTitle className="line-clamp-2 text-base font-semibold leading-tight hover:text-primary">
            {video.title}
          </CardTitle>
        </Link>
      </CardHeader>
      <CardContent className="flex-grow">
         <p className="line-clamp-3 text-sm text-muted-foreground">
          {video.description}
        </p>
      </CardContent>
      <CardFooter className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>{durationFormatted}</span>
        </div>
        <Badge variant="outline">{video.difficulty}</Badge>
      </CardFooter>
    </Card>
  );
}
