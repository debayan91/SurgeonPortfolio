'use client';

import { Video } from '@/lib/data';
import { Badge } from './ui/badge';
import { PageHeader } from './page-header';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { BrainCircuit } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import InteractiveTranscript from './videos/interactive-transcript';
import AIAssistant from './videos/ai-assistant';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import ReactPlayer from 'react-player';

export default function VideoDetailClient({ video }: { video: Video }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const playerRef = useRef<ReactPlayer | null>(null);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (time: number) => {
    playerRef.current?.seekTo(time, 'seconds');
    setCurrentTime(time);
    if (!isPlaying) {
      setIsPlaying(true);
    }
  };

  const handleProgress = (progress: { playedSeconds: number }) => {
    setCurrentTime(progress.playedSeconds);
  };

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

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
          <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-slate-900 border">
            <ReactPlayer
              ref={playerRef}
              url={`https://www.youtube.com/watch?v=${video.id}`}
              width="100%"
              height="100%"
              playing={isPlaying}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onProgress={handleProgress}
              onDuration={handleDuration}
              controls={true}
            />
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
              <TabsTrigger value="ai-assistant">
                <BrainCircuit className="mr-2 h-4 w-4" /> AI
              </TabsTrigger>
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
