export interface SkillGroup {
  title: string;
  items: string[];
  /** Heroicons-style outline path, rendered inline as SVG. */
  icon: string;
}

export const skills: SkillGroup[] = [
  {
    title: 'Frontend',
    items: ['Angular', 'TypeScript', 'Tailwind CSS', 'HTML', 'CSS'],
    icon: 'M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25',
  },
  {
    title: 'Languages',
    items: ['TypeScript', 'Python', 'C', 'C++', 'SQL'],
    icon: 'M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5',
  },
  {
    title: 'Machine learning',
    items: ['TensorFlow', 'Librosa', 'NumPy', 'scikit-learn'],
    icon: 'M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082',
  },
  {
    title: 'Signal processing',
    items: ['DSP', 'Spectrograms', 'Audio analysis'],
    icon: 'M3.75 12h3l3-9 4.5 18 3-9h3',
  },
  {
    title: 'Networks & systems',
    items: ['Linux', 'TCP/IP', 'Network configuration'],
    icon: 'M12 21a9 9 0 100-18 9 9 0 000 18zm0 0c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3 7.5 7.03 7.5 12s2.015 9 4.5 9zM3 12h18',
  },
  {
    title: 'Tooling',
    items: ['Git', 'CMake', 'GoogleTest'],
    icon: 'M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63',
  },
];
