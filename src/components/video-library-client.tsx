'use client';

import { Complication, Video } from '@/lib/data';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { useEffect, useMemo, useState } from 'react';
import VideoCard from './video-card';
import { useSearchParams } from 'next/navigation';
import { Input } from './ui/input';
import { Search } from 'lucide-react';

type VideoLibraryClientProps = {
  videos: Video[];
  complications: Complication[];
  difficulties: string[];
  techniques: string[];
};

export default function VideoLibraryClient({
  videos,
  complications,
  difficulties,
  techniques,
}: VideoLibraryClientProps) {
  const searchParams = useSearchParams();
  const initialComplication = searchParams.get('complication') || 'all';

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedComplication, setSelectedComplication] =
    useState(initialComplication);
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedTechnique, setSelectedTechnique] = useState('all');

  useEffect(() => {
    setSelectedComplication(initialComplication);
  }, [initialComplication]);

  const filteredVideos = useMemo(() => {
    return videos.filter((video) => {
      const matchesSearch =
        video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesComplication =
        selectedComplication === 'all' || video.complication === selectedComplication;
      const matchesDifficulty =
        selectedDifficulty === 'all' || video.difficulty === selectedDifficulty;
      const matchesTechnique =
        selectedTechnique === 'all' || video.technique === selectedTechnique;
      return matchesSearch && matchesComplication && matchesDifficulty && matchesTechnique;
    });
  }, [
    videos,
    searchTerm,
    selectedComplication,
    selectedDifficulty,
    selectedTechnique,
  ]);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search videos by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select
          value={selectedComplication}
          onValueChange={setSelectedComplication}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by complication" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Complications</SelectItem>
            {complications.map((c) => (
              <SelectItem key={c.id} value={c.name}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={selectedDifficulty}
          onValueChange={setSelectedDifficulty}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Difficulties</SelectItem>
            {difficulties.map((d) => (
              <SelectItem key={d} value={d}>
                {d}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedTechnique} onValueChange={setSelectedTechnique}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by technique" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Techniques</SelectItem>
            {techniques.map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filteredVideos.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      ) : (
        <div className="mt-8 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted bg-background p-12 text-center">
          <h3 className="text-xl font-semibold">No Videos Found</h3>
          <p className="mt-2 text-muted-foreground">
            Try adjusting your search or filters.
          </p>
        </div>
      )}
    </div>
  );
}
