/* FIRST — sample archive. A handful of "firsts" across a year. Images are
 * Unsplash placeholders, to be swapped for the user's own captured photos.
 * Ported from ui_kits/first_app/data.jsx.
 */

export interface Memory {
  index: number;
  scene: string;
  title: string;
  caption: string;
  place: string;
  date: string;
  weekday: string;
  temp: string;
  sky: string;
  time: string;
  month: string;
  image: string;
  aspect: 'portrait' | 'landscape';
}

const U = (id: string, w = 1000) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const MEMORIES: Memory[] = [
  {
    index: 22,
    scene: 'First Beach Day',
    title: 'The Beach Day',
    caption: 'Stayed longer than planned.',
    place: 'Santa Cruz',
    date: '09 Jun 2026',
    weekday: 'Tue',
    temp: '18°C',
    sky: 'Clear',
    time: '6:42 PM',
    month: 'June',
    image: U('1507525428034-b723cf961d3e'),
    aspect: 'portrait',
  },
  {
    index: 21,
    scene: 'Under the Stars',
    title: 'Under the Stars',
    caption: 'We stopped counting.',
    place: 'Joshua Tree',
    date: '24 May 2026',
    weekday: 'Sun',
    temp: '14°C',
    sky: 'Clear night',
    time: '11:18 PM',
    month: 'May',
    image: U('1419242902214-272b3f66ee7a'),
    aspect: 'portrait',
  },
  {
    index: 20,
    scene: 'First Road Trip',
    title: 'The Road Trip',
    caption: 'Neither of us wanted to turn back.',
    place: 'Big Sur',
    date: '11 May 2026',
    weekday: 'Mon',
    temp: '21°C',
    sky: 'Sunny',
    time: '2:05 PM',
    month: 'May',
    image: U('1469854523086-cc02fe5d8800'),
    aspect: 'landscape',
  },
  {
    index: 19,
    scene: 'Welcome Home',
    title: 'Welcome Home',
    caption: 'He has not left my side since.',
    place: 'Portland',
    date: '28 Apr 2026',
    weekday: 'Tue',
    temp: '16°C',
    sky: 'Overcast',
    time: '9:30 AM',
    month: 'April',
    image: U('1543466835-00a7907e9de1'),
    aspect: 'portrait',
  },
  {
    index: 18,
    scene: 'First Café',
    title: 'The Corner Café',
    caption: 'Same order, every morning since.',
    place: 'Lisbon',
    date: '12 Apr 2026',
    weekday: 'Sun',
    temp: '19°C',
    sky: 'Bright',
    time: '8:15 AM',
    month: 'April',
    image: U('1501339847302-ac426a4a7cbb'),
    aspect: 'landscape',
  },
  {
    index: 17,
    scene: 'First Concert',
    title: 'The Front Row',
    caption: 'My ears rang for days. Worth it.',
    place: 'Berlin',
    date: '21 Mar 2026',
    weekday: 'Sat',
    temp: '11°C',
    sky: 'Cold',
    time: '10:47 PM',
    month: 'March',
    image: U('1459749411175-04bf5292ceea'),
    aspect: 'portrait',
  },
];

/** The camera's current viewfinder subject (the next "first"). */
export const VIEWFINDER = {
  image: U('1495616811223-4d98c6e9c869', 1200),
  hint: 'Golden hour — hold steady',
  nextIndex: 23,
};

export const RECAP = {
  year: '2026',
  firsts: 22,
  cities: 9,
  countries: 4,
  rolls: 3,
  topMonth: 'May',
  highlight: 'Under the Stars',
};
