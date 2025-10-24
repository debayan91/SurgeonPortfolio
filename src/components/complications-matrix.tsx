'use client';

import { Complication } from '@/lib/data';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

type ComplicationsMatrixProps = {
  complications: Complication[];
};

export default function ComplicationsMatrix({
  complications,
}: ComplicationsMatrixProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {complications.map((complication) => (
        <Link
          key={complication.id}
          href={`/videos?complication=${encodeURIComponent(complication.name)}`}
          className="block"
        >
          <Card className="flex h-full transform-gpu flex-col justify-between border-border bg-card transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-2xl hover:multicolor-shadow">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                {complication.name}
              </CardTitle>
              <CardDescription className="pt-2 text-muted-foreground">
                {complication.description}
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  );
}
