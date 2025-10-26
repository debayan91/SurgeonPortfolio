
/*
Welcome! To add your YouTube playlist, please follow these steps:

1. For each video in your playlist, create a new object in the `videos` array below.
2. Fill in the details for each video, including the `id`, `title`, `description`, `thumbnail`, `duration`, and other relevant fields.
3. The `transcript` field should be an array of objects, where each object has a `time` (in seconds) and `text` property.

Here is an example of a video object:

{
  id: 'your-video-id',
  title: 'Your Video Title',
  description: 'A brief description of your video.',
  thumbnail: 'https://img.youtube.com/vi/your-video-id/0.jpg',
  duration: 600, // Duration in seconds
  surgeon: 'Dr. Debashis Dutta',
  complication: 'Vitreous Hemorrhage',
  technique: 'Vitrectomy',
  difficulty: 'Intermediate',
  transcript: [
    { time: 5, text: 'This is the first transcript line.' },
    { time: 15, text: 'This is the second transcript line.' },
  ],
  drDuttaNotes: 'Add any notes from Dr. Dutta here.'
}
*/

import type { Video } from './data';

export const videos: Video[] = [
  {
    id: '9En38S7M1s4',
    title: 'Debashis Dutta Live Surgery',
    description: 'Debashis Dutta Live Surgery',
    thumbnail: 'https://img.youtube.com/vi/9En38S7M1s4/0.jpg',
    duration: 356, // This is a guess
    surgeon: 'Dr. Debashis Dutta',
    complication: 'Cataract',
    technique: 'Phacoemulsification',
    difficulty: 'Intermediate',
    transcript: [
      { time: 5, text: 'Live surgery by Dr. Debashis Dutta.' },
    ],
    drDuttaNotes: 'This is a live surgery demonstration.'
  }
];
