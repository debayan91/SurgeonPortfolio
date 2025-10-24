'use client';

import { TranscriptItem } from '@/lib/data';
import { cn } from '@/lib/utils';
import { useEffect, useRef } from 'react';
import { Card, CardContent } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';

type InteractiveTranscriptProps = {
  transcript: TranscriptItem[];
  currentTime: number;
  onSeek: (time: number) => void;
};

export default function InteractiveTranscript({
  transcript,
  currentTime,
  onSeek,
}: InteractiveTranscriptProps) {
  const activeRef = useRef<HTMLDivElement>(null);

  const activeIndex = transcript.findIndex((item, index) => {
    const nextItem = transcript[index + 1];
    return currentTime >= item.time && (!nextItem || currentTime < nextItem.time);
  });

  useEffect(() => {
    activeRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }, [activeIndex]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <Card className="border-border">
      <CardContent className="p-0">
        <ScrollArea className="h-[70vh] rounded-lg">
          <div className="p-4">
            {transcript.map((item, index) => (
              <div
                key={item.time}
                ref={index === activeIndex ? activeRef : null}
                className={cn(
                  'mb-2 flex cursor-pointer items-start gap-3 rounded-md p-2 transition-colors hover:bg-accent',
                  index === activeIndex && 'bg-accent'
                )}
                onClick={() => onSeek(item.time)}
              >
                <div className="font-mono text-sm font-medium text-muted-foreground">
                  {formatTime(item.time)}
                </div>
                <p className={cn(
                  'text-sm text-muted-foreground/80',
                  index === activeIndex && 'text-foreground'
                  )}
                >
                    {item.text}
                </p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
