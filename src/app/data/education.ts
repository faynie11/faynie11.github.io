export interface EducationEntry {
  school: string;
  degree: string;
  field: string;
  description: string;
  period: string;
}

export const education: EducationEntry[] = [
  {
    school: 'Akademia Górniczo-Hutnicza im. Stanisława Staszica w Krakowie',
    degree: 'Bachelor of Engineering',
    field: 'Electronics and Telecommunications',
    description:
      'Electronics and Telecommunications focuses on knowledge in signal processing, programming, electronic circuit design, and telecommunication networks. The program also covers designing and configuring electronic and network systems, using measurement tools, implementing algorithms, and developing applications and web services.',
    period: '2021 - 2025',
  },
];
