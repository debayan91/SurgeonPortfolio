'use client';

import { Video } from '@/lib/data';
import { useState } from 'react';
import { askAI } from '@/app/videos/[id]/actions';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Send, User, Bot, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { useToast } from '@/hooks/use-toast';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function AIAssistant({ video }: { video: Video }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || isLoading) return;

    const newMessages: Message[] = [...messages, { role: 'user', content: question }];
    setMessages(newMessages);
    setQuestion('');
    setIsLoading(true);

    const result = await askAI(video, question);

    if (result.answer) {
      setMessages([...newMessages, { role: 'assistant', content: result.answer }]);
    } else if (result.error) {
      toast({
        variant: 'destructive',
        title: 'AI Error',
        description: result.error,
      });
       setMessages(newMessages); // Keep user message but don't add bot error message to chat
    }
    setIsLoading(false);
  };

  return (
    <Card className="h-full border-border">
      <CardHeader>
        <CardTitle>AI Surgical Assistant</CardTitle>
        <CardDescription>
          Ask a question about this video.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex h-[calc(100%-100px)] flex-col">
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 ${
                  message.role === 'user' ? 'justify-end' : ''
                }`}
              >
                {message.role === 'assistant' && (
                  <Avatar className="h-8 w-8 bg-primary/10 text-primary">
                    <AvatarFallback><Bot className="h-5 w-5"/></AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-xs rounded-lg p-3 text-sm lg:max-w-sm ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary'
                  }`}
                >
                  {message.content}
                </div>
                {message.role === 'user' && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback><User className="h-5 w-5" /></AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
             {isLoading && (
              <div className="flex items-start gap-3">
                <Avatar className="h-8 w-8 bg-primary/10 text-primary">
                  <AvatarFallback><Bot className="h-5 w-5"/></AvatarFallback>
                </Avatar>
                <div className="rounded-lg bg-secondary p-3">
                    <div className="flex items-center gap-1">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-primary/50 [animation-delay:-0.3s]"></span>
                        <span className="h-2 w-2 animate-pulse rounded-full bg-primary/50 [animation-delay:-0.15s]"></span>
                        <span className="h-2 w-2 animate-pulse rounded-full bg-primary/50"></span>
                    </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <form onSubmit={handleSubmit} className="mt-4 flex items-center gap-2 border-t pt-4">
          <Input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="e.g., What was the laser setting?"
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={isLoading || !question.trim()}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
