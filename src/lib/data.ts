import { PlaceHolderImages } from './placeholder-images';

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

const videos: Video[] = [
  {
    id: '1',
    title: 'Managing Vitreous Hemorrhage',
    description:
      'A comprehensive guide to diagnosing and managing vitreous hemorrhage in various clinical scenarios.',
    thumbnail: PlaceHolderImages.find((p) => p.id === 'video_thumb_1')!
      .imageUrl,
    duration: 725,
    surgeon: 'Dr. Debashis Dutta',
    complication: 'Vitreous Hemorrhage',
    technique: 'Vitrectomy',
    difficulty: 'Intermediate',
    transcript: [
      {
        time: 5,
        text: 'Today, we are discussing the management of vitreous hemorrhage.',
      },
      { time: 15, text: 'The first step is a thorough patient evaluation.' },
      { time: 30, text: 'We begin the vitrectomy by making three sclerotomies.' },
      {
        time: 60,
        text: 'Careful removal of the vitreous is crucial to avoid iatrogenic breaks.',
      },
      { time: 120, text: 'Here, you can see the source of the bleeding.' },
      { time: 300, text: 'We apply endolaser to treat the neovascularization.' },
      { time: 600, text: 'The case concludes with fluid-air exchange.' },
      { time: 720, text: 'Post-operative care is critical for good outcomes.' },
    ],
    drDuttaNotes:
      'Pay close attention to the posterior hyaloid separation at 1:30. This is a key step that many beginners struggle with. Also, note the laser settings used at 5:00 for optimal coagulation without excessive tissue damage.',
  },
  {
    id: '2',
    title: 'Advanced Techniques for Retinal Detachment',
    description:
      'Explore advanced surgical techniques for complex retinal detachment cases, including PVR.',
    thumbnail: PlaceHolderImages.find((p) => p.id === 'video_thumb_2')!
      .imageUrl,
    duration: 950,
    surgeon: 'Dr. Debashis Dutta',
    complication: 'Retinal Detachment',
    technique: 'Scleral Buckle',
    difficulty: 'Advanced',
    transcript: [
      { time: 10, text: 'This is a complex case of retinal detachment.' },
      {
        time: 25,
        text: 'We will be using a combination of vitrectomy and a scleral buckle.',
      },
      { time: 90, text: 'Placement of the buckle is critical for success.' },
      {
        time: 240,
        text: 'Here, we are performing a retinectomy to relieve traction.',
      },
      {
        time: 500,
        text: 'Silicone oil is used as a tamponade agent in this case.',
      },
      {
        time: 900,
        text: 'The retina is now fully attached. We will close the conjunctiva.',
      },
    ],
    drDuttaNotes:
      'The decision to perform a retinectomy is not taken lightly. In this case, it was necessary due to severe PVR. Observe the technique for membrane peeling starting at 3:15.',
  },
  {
    id: '3',
    title: 'Managing a Dropped Nucleus',
    description:
      'A step-by-step guide on how to safely retrieve a dropped nucleus from the posterior segment.',
    thumbnail: PlaceHolderImages.find((p) => p.id === 'video_thumb_3')!
      .imageUrl,
    duration: 610,
    surgeon: 'Dr. Debashis Dutta',
    complication: 'Dropped Nucleus',
    technique: 'Phacofragmentation',
    difficulty: 'Advanced',
    transcript: [
      {
        time: 8,
        text: 'A dropped nucleus is a challenging complication in cataract surgery.',
      },
      { time: 20, text: 'The key is to remain calm and transition to a vitrectomy.' },
      {
        time: 75,
        text: 'We use a fragmatome to emulsify the nuclear fragments.',
      },
      {
        time: 180,
        text: 'A thorough vitrectomy is performed to remove any remaining vitreous traction.',
      },
      {
        time: 350,
        text: 'The IOL is placed in the sulcus as there is no capsular support.',
      },
      { time: 600, text: 'The case is completed successfully.' },
    ],
    drDuttaNotes:
      'It is crucial not to "chase" the nucleus into the posterior segment with the phaco probe. Convert to a posterior approach early. The use of perfluorocarbon liquids can also be a helpful adjunct in these cases to float the nucleus.',
  },
  {
    id: '4',
    title: 'IOL Repositioning and Fixation',
    description:
      'Techniques for repositioning a dislocated IOL, including iris and scleral fixation methods.',
    thumbnail: PlaceHolderImages.find((p) => p.id === 'video_thumb_4')!
      .imageUrl,
    duration: 830,
    surgeon: 'Dr. Debashis Dutta',
    complication: 'IOL Dislocation',
    technique: 'Scleral Fixation',
    difficulty: 'Advanced',
    transcript: [
      { time: 12, text: 'We are presented with a case of a dislocated IOL.' },
      {
        time: 45,
        text: 'We will attempt to reposition it using scleral fixation.',
      },
      {
        time: 150,
        text: 'Creating the scleral flaps requires precision.',
      },
      { time: 300, text: 'The haptics are externalized and secured.' },
      { time: 600, text: 'Centration of the IOL is now excellent.' },
      { time: 820, text: 'Closure is performed meticulously.' },
    ],
    drDuttaNotes:
      'The Yamane technique is an alternative for scleral fixation that does not require flaps. However, I find this method to be more stable long-term. Pay attention to the knot tying technique at 5:30.',
  },
  {
    id: '5',
    title: 'Navigating Complex Cataract Surgery',
    description:
      'A case study of a complex cataract extraction in a patient with a small pupil and weak zonules.',
    thumbnail: PlaceHolderImages.find((p) => p.id === 'video_thumb_5')!
      .imageUrl,
    duration: 1100,
    surgeon: 'Dr. Debashis Dutta',
    complication: 'Weak Zonules',
    technique: 'Capsular Tension Ring',
    difficulty: 'Intermediate',
    transcript: [
      { time: 15, text: 'This case involves a small pupil and weak zonules.' },
      {
        time: 60,
        text: 'We will use Malyugin ring to expand the pupil.',
      },
      { time: 180, text: 'A capsular tension ring is placed to support the bag.' },
      {
        time: 400,
        text: 'Phacoemulsification is performed with low-flow parameters.',
      },
      { time: 900, text: 'The IOL is successfully placed in the bag.' },
      { time: 1080, text: 'The Malyugin ring is removed.' },
    ],
    drDuttaNotes:
      'Gentle hydrodissection is paramount in these cases to avoid further zonular stress. Notice the technique for inserting the CTR at 3:00 to prevent capsular rupture.',
  },
  {
    id: '6',
    title: 'Management of Traumatic Cataract',
    description:
      'Surgical management of a traumatic cataract with associated iris and capsular damage.',
    thumbnail: PlaceHolderImages.find((p) => p.id === 'video_thumb_6')!
      .imageUrl,
    duration: 980,
    surgeon: 'Dr. Debashis Dutta',
    complication: 'Traumatic Cataract',
    technique: 'Pupilloplasty',
    difficulty: 'Advanced',
    transcript: [
      {
        time: 20,
        text: 'This patient has a traumatic cataract following a blunt injury.',
      },
      { time: 80, text: 'There is significant iris damage and a ruptured anterior capsule.' },
      { time: 250, text: 'We perform a careful lens aspiration.' },
      {
        time: 500,
        text: 'A pupilloplasty is performed to repair the iris sphincter tears.',
      },
      { time: 750, text: 'An ACIOL is placed due to lack of capsular support.' },
      {
        time: 960,
        text: 'The final result is a centered pupil and a stable lens.',
      },
    ],
    drDuttaNotes:
      'Trypan blue is your best friend in these cases to visualize the extent of the anterior capsular tear. The Siepser sliding knot technique used for pupilloplasty at 8:20 is an essential skill.',
  },
];

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
  return new Promise((resolve) => setTimeout(() => resolve(videos), 200));
}

export async function getVideoById(id: string): Promise<Video | undefined> {
  return new Promise((resolve) =>
    setTimeout(() => resolve(videos.find((v) => v.id === id)), 200)
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
