import { PageHeader } from '@/components/page-header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getDrDuttaProfile } from '@/lib/data';
import { Building, BookOpen, ExternalLink, Quote, Award } from 'lucide-react';
import Link from 'next/link';

export default async function ProfilePage() {
  const profile = await getDrDuttaProfile();
  return (
    <div className="flex flex-col gap-8 py-8 md:py-16">
      <PageHeader title="Dr. Debashis Dutta's Profile" />
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="col-span-1 flex flex-col items-center gap-6">
          <Avatar className="h-36 w-36 md:h-48 md:w-48 border-4 border-primary/20 shadow-lg">
            <AvatarImage
              src={profile.avatar}
              alt={profile.name}
              data-ai-hint="doctor portrait"
            />
            <AvatarFallback>DD</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h2 className="text-2xl font-bold">{profile.name}</h2>
            <p className="text-muted-foreground font-light">{profile.title}</p>
          </div>
          <Card className="w-full bg-background">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                <Quote className="h-5 w-5" /> Philosophy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm italic text-muted-foreground font-light">
                &quot;{profile.philosophy}&quot;
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="col-span-1 flex flex-col gap-8 md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="font-semibold">About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground font-light">{profile.bio}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-semibold">
                <Award className="h-5 w-5" /> Awards &amp; Recognition
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {profile.awards.map((award, index) => (
                  <div key={index}>
                    <p className="font-semibold">{award.title}</p>
                    <p className="text-sm text-muted-foreground font-light">
                      {award.issuer}, {award.year}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-semibold">
                  <Building className="h-5 w-5" /> Experience
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {profile.experience.map((exp, index) => (
                    <div key={index}>
                      <p className="font-semibold">{exp.role}</p>
                      <p className="text-sm text-muted-foreground font-light">
                        {exp.institution}
                      </p>
                      <p className="text-xs text-muted-foreground/80 font-light">
                        {exp.period}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-semibold">
                  <BookOpen className="h-5 w-5" /> Publications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {profile.publications.map((pub, index) => (
                    <div key={index}>
                      <Link
                        href={pub.link}
                        target="_blank"
                        className="font-semibold hover:text-primary hover:underline"
                      >
                        {pub.title}{' '}
                        <ExternalLink className="inline-block h-3 w-3" />
                      </Link>
                      <p className="text-sm text-muted-foreground font-light">
                        {pub.journal}, {pub.year}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
