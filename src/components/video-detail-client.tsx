'use client';

import { Video } from '@/lib/data';
import { Badge } from './ui/badge';
import { PageHeader } from './page-header';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { PlayCircle, BrainCircuit } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import InteractiveTranscript from './videos/interactive-transcript';
import AIAssistant from './videos/ai-assistant';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export default function VideoDetailClient({ video }: { video: Video }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime((prevTime) => {
          if (prevTime >= video.duration) {
            setIsPlaying(false);
            if (intervalRef.current) clearInterval(intervalRef.current);
            return video.duration;
          }
          return prevTime + 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, video.duration]);

  const handlePlayPause = () => {
    if (currentTime >= video.duration) {
      setCurrentTime(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (time: number) => {
    setCurrentTime(time);
    if (!isPlaying) {
      setIsPlaying(true);
    }
  };
  
  const progressPercentage = (currentTime / video.duration) * 100;

  return (
    <div className="flex flex-col gap-4">
      <PageHeader title={video.title} />
      <div className="flex flex-wrap gap-2">
        <Badge variant="secondary">{video.complication}</Badge>
        <Badge variant="secondary">{video.technique}</Badge>
        <Badge variant="secondary">{video.difficulty}</Badge>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="col-span-1 flex flex-col gap-8 lg:col-span-2">
          {/* Mock Video Player */}
          <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-slate-900 border">
            <Image
              src={video.thumbnail}
              alt={video.title}
              fill
              className={`object-cover transition-opacity duration-300 ${isPlaying ? 'opacity-50' : 'opacity-100'}`}
              sizes="(max-width: 1024px) 100vw, 66vw"
              data-ai-hint="surgery operation"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={handlePlayPause}
                className="group rounded-full text-white/80 transition-all hover:text-white hover:scale-110"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                <PlayCircle
                  className={`h-20 w-20 drop-shadow-lg transition-opacity duration-300 group-hover:opacity-100 ${
                    isPlaying ? 'opacity-0' : 'opacity-100'
                  }`}
                />
              </button>
            </div>
            <div className="absolute bottom-0 left-0 h-1.5 w-full bg-white/20">
                <div className="h-full bg-primary" style={{width: `${progressPercentage}%`}}></div>
            </div>
          </div>
          <p className="text-muted-foreground">{video.description}</p>
          <Card>
            <CardHeader>
              <CardTitle>Dr. Dutta&apos;s Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap font-mono text-sm text-muted-foreground">
                {video.drDuttaNotes}
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="col-span-1 flex flex-col gap-8">
          <Tabs defaultValue="transcript" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="transcript">Transcript</TabsTrigger>
              <TabsTrigger value="ai-assistant"><BrainCircuit className="mr-2 h-4 w-4" /> AI</TabsTrigger>
            </TabsList>
            <TabsContent value="transcript">
                <InteractiveTranscript
                  transcript={video.transcript}
                  currentTime={currentTime}
                  onSeek={handleSeek}
                />
            </TabsContent>
            <TabsContent value="ai-assistant">
                <AIAssistant video={video} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
