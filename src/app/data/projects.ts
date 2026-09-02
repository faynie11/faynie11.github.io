export interface Project {
  title: string;
  description: string;
  tags: string[];
  /** Raster/vector image shown as the project thumbnail. */
  image?: string;
  /**
   * Render `image` edge-to-edge instead of insetting it on a tinted square.
   * Use for logos that already carry their own background.
   */
  fullBleedImage?: boolean;
  /** Heroicons-style outline path, used when `image` is absent. */
  icon?: string;
  /** Optional link to the repository or a live demo. */
  url?: string;
  /** Short highlight shown as a ribbon on the card. */
  highlight?: string;
}

export const projects: Project[] = [
  {
    title: 'Ngots',
    description:
      'A library of 100 UI components and blocks for Angular 20+, styled with Tailwind CSS. Live preview, one-click Copy and Download for every entry — from buttons and charts to full dashboard, auth and pricing screens. The page you are reading is built from it.',
    tags: ['Angular 20', 'Tailwind CSS', 'TypeScript', 'Signals'],
    image: 'assets/ngots_logo.svg',
    fullBleedImage: true,
    url: 'https://ngots.wojtyczakuba.workers.dev/',
    highlight: 'Powers this site',
  },
  {
    title: 'Podcast Optimization',
    description:
      'Automatic removal of non-substantive segments from podcasts using machine learning techniques. Built as my engineering thesis.',
    tags: ['Python', 'TensorFlow', 'Librosa'],
    icon: 'M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z',
  },
  {
    title: 'Scientific Calculator',
    description:
      'Calculator for converting between number systems, with a CMake build and a GoogleTest suite.',
    tags: ['C++', 'CMake', 'GoogleTest'],
    image: 'assets/calculator_26.png',
  },
  {
    title: 'Weather app',
    description: 'Simple weather application in Python with several useful functionalities.',
    tags: ['Python', 'REST API'],
    image: 'assets/logo_spark.png',
  },
];
