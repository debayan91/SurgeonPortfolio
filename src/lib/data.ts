import { PlaceHolderImages } from './placeholder-images';
import { videos as youtubeVideos } from './youtube-data';

export type TranscriptItem = {
  time: number;
  text: string;
};

export type Video = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: number; // in seconds
  surgeon: 'Dr. Debashis Dutta';
  complication: string;
  technique: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  transcript: TranscriptItem[];
  drDuttaNotes: string;
};

export type Complication = {
  id: string;
  name: string;
  description: string;
};

export type Award = {
  title: string;
  issuer: string;
  year: number;
};

export type DrDuttaProfile = {
  name: string;
  title: string;
  philosophy: string;
  bio: string;
  avatar: string;
  awards: Award[];
  experience: {
    role: string;
    institution: string;
    period: string;
  }[];
  publications: {
    title: string;
    journal: string;
    year: number;
    link: string;
  }[];
};

export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  viewingHistory: {
    videoId: string;
    lastViewed: string;
    progress: number;
  }[];
  favorites: string[];
};

const videos: Video[] = [];

const complications: Complication[] = [
  {
    id: '1',
    name: 'Vitreous Hemorrhage',
    description: 'Bleeding into the vitreous humor of the eye.',
  },
  {
    id: '2',
    name: 'Retinal Detachment',
    description: 'The retina peels away from its underlying layer of support tissue.',
  },
  {
    id: '3',
    name: 'Dropped Nucleus',
    description:
      'A complication of cataract surgery where lens fragments fall into the posterior segment.',
  },
  {
    id: '4',
    name: 'IOL Dislocation',
    description:
      'Displacement of the intraocular lens from its correct position.',
  },
  {
    id: '5',
    name: 'Weak Zonules',
    description:
      'Weakening of the fibers that hold the lens in place, complicating cataract surgery.',
  },
  {
    id: '6',
    name: 'Traumatic Cataract',
    description: 'Clouding of the lens due to an eye injury.',
  },
  {
    id: '7',
    name: 'Choroidal Effusion',
    description:
      'Fluid accumulation in the suprachoroidal space.',
  },
  {
    id: '8',
    name: 'Endophthalmitis',
    description: 'A severe and purulent inflammation of the intraocular fluids.',
  },
];

const drDuttaProfile: DrDuttaProfile = {
  name: 'Dr. Debashis Dutta',
  title: 'Chief Ophthalmic Surgeon & Vitreo-Retinal Specialist',
  philosophy:
    'My philosophy is rooted in combining cutting-edge technology with compassionate, patient-centered care. I believe in empowering the next generation of surgeons through education and mentorship, ensuring the highest standards of surgical excellence are passed on.',
  bio: 'Dr. Debashis Dutta is a world-renowned vitreo-retinal surgeon with over 20 years of experience in complex ophthalmic procedures. He is a pioneer in minimally invasive surgical techniques and has developed several instruments and procedures that are now standard practice. His passion for teaching has made him a sought-after speaker at international conferences and a mentor to countless aspiring surgeons.',
  avatar: PlaceHolderImages.find((p) => p.id === 'dutta_profile')!.imageUrl,
  awards: [
    {
      title: 'Global Ophthalmology Leadership Award',
      issuer: 'World Vision Congress',
      year: 2023,
    },
    {
      title: 'Innovator in Surgical Technology',
      issuer: 'Advanced Ophthalmic Society',
      year: 2021,
    },
    {
      title: 'Top 100 Influential Ophthalmologists',
      issuer: 'The Ophthalmologist Power List',
      year: 2020,
    },
    {
      title: "President's Gold Medal",
      issuer: 'National Board of Ophthalmology',
      year: 2018,
    },
  ],
  experience: [
    {
      role: 'Director & Chief Surgeon',
      institution: 'Dutta Eye Institute',
      period: '2005 - Present',
    },
    {
      role: 'Vitreo-Retinal Fellowship',
      institution: 'Global Eye Hospital',
      period: '2003 - 2005',
    },
    {
      role: 'Ophthalmology Residency',
      institution: 'National Medical College',
      period: '2000 - 2003',
    },
  ],
  publications: [
    {
      title: 'A Novel Technique for Scleral Fixation of IOLs',
      journal: 'Journal of Cataract & Refractive Surgery',
      year: 2021,
      link: '#',
    },
    {
      title: 'Outcomes of Early Vitrectomy in Vitreous Hemorrhage',
      journal: 'Retina Today',
      year: 2019,
      link: '#',
    },
    {
      title: 'Managing Dropped Nucleus: A 10-Year Review',
      journal: 'Indian Journal of Ophthalmology',
      year: 2017,
      link: '#',
    },
  ],
};

const mockUser: User = {
  id: 'user-123',
  name: 'Alex Johnson',
  email: 'alex.j@medschool.edu',
  avatar: 'https://i.pravatar.cc/150?u=alexjohnson',
  viewingHistory: [
    { videoId: '1', lastViewed: '2024-05-20T10:00:00Z', progress: 0.75 },
    { videoId: '5', lastViewed: '2024-05-19T14:30:00Z', progress: 0.5 },
  ],
  favorites: ['2', '4'],
};

// Simulate API calls
export async function getVideos(): Promise<Video[]> {
  const allVideos = [...videos, ...youtubeVideos];
  return new Promise((resolve) => setTimeout(() => resolve(allVideos), 200));
}

export async function getVideoById(id: string): Promise<Video | undefined> {
  const allVideos = [...videos, ...youtubeVideos];
  return new Promise((resolve) =>
    setTimeout(() => resolve(allVideos.find((v) => v.id === id)), 200)
  );
}

export async function getComplications(): Promise<Complication[]> {
  return new Promise((resolve) =>
    setTimeout(() => resolve(complications), 200)
  );
}

export async function getDrDuttaProfile(): Promise<DrDuttaProfile> {
  return new Promise((resolve) =>
    setTimeout(() => resolve(drDuttaProfile), 200)
  );
}

export async function getMockUser(): Promise<User> {
  return new Promise((resolve) => setTimeout(() => resolve(mockUser), 200));
}
