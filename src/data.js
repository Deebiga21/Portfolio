/* ════════════════════════════════════════════════════════════
   Everything you see on the site lives here. Edit freely.
   Colours & fonts: top of src/styles/global.css
   Photos: public/img (faces = round avatars, photos = polaroids & photo stack,
   stickers = cut-out frames with a white sticker border)
   ════════════════════════════════════════════════════════════ */

export const profile = {
  name: 'Lohitha',
  full: 'Damisetti Shamya Lohitha',
  role: 'Full-stack developer',
  location: 'Andhra Pradesh, India',
  email: 'damisettilohitha@gmail.com',
  intro: 'I build friendly, AI-powered web apps with React, Node.js and Python, from the first pixel to the last API call.',
  github: 'https://github.com/lohithadamisetti123',
  linkedin: 'https://www.linkedin.com/search/results/all/?keywords=lohitha%20damisetti', // TODO: your exact profile URL
  resume: '', // optional: 'resume.pdf' in /public, WITHOUT your phone number
  avatar: 'img/faces/smile.jpg',
}

// quick stats under your intro
export const heroCounts = [
  { value: '3', label: 'AI products' },
  { value: '1,230+', label: 'problems solved' },
  { value: '9.07', label: 'CGPA' },
]

export const about = {
  // a fanned stack of photos: click it to shuffle through your roles
  photos: ['img/photos/portrait-tilt.jpg', 'img/photos/portrait-profile.jpg', 'img/photos/portrait-seated.jpg', 'img/photos/portrait-smile.jpg'],
  // one role per photo, shown under it (click the stack to cycle)
  roles: ['Full-Stack Developer', 'Data Scientist', 'Tech Influencer', 'UI/UX Designer'],
  paragraphs: [
    "Hi! I'm Lohitha, a full-stack developer and B.Tech Data Science student at Aditya College of Engineering & Technology.",
    'I love building products end to end: React interfaces that feel good, Node and FastAPI backends that scale, and AI features that actually help people.',
  ],
  stats: [
    { value: '9.07', label: 'CGPA · Department Topper' },
    { value: '1,230+', label: 'DSA problems solved' },
    { value: '3', label: 'AI products shipped' },
    { value: '8', label: 'Certifications' },
  ],
}

/* visual: 'gauge' | 'heatmap' | 'outfit' (illustrated art), or add image: 'img/...' */
export const projects = [
  {
    title: 'PolicyGuard AI',
    tag: 'AI · Legal tech',
    visual: 'gauge',
    text: 'Reads privacy policies and contracts across web, desktop and mobile, flags risky clauses and gives every document a risk score.',
    tech: ['React', 'React Native', 'Electron', 'Node.js', 'OpenAI'],
    link: 'https://github.com/lohithadamisetti123', // TODO: exact repo
    color: '#FFE5D9',
  },
  {
    title: 'Release Risk Heatmap',
    tag: 'Machine learning',
    visual: 'heatmap',
    text: 'A Random Forest model that predicts risky software releases, shown on a live heatmap across teams and modules.',
    tech: ['React', 'TypeScript', 'FastAPI', 'scikit-learn', 'PostgreSQL'],
    link: 'https://github.com/lohithadamisetti123',
    color: '#FFD9CC',
  },
  {
    title: 'StarCloset',
    tag: 'GenAI · Myntra HackerRamp',
    visual: 'outfit',
    text: 'An AI stylist that builds head-to-toe outfits from your vibe, occasion and budget, with chatty stylist personas.',
    tech: ['React', 'Go', 'Redis', 'PostgreSQL', 'LLMs'],
    link: 'https://github.com/lohithadamisetti123',
    color: '#FFEDE5',
  },
]

export const journey = [
  { year: '2026', title: 'Full-Stack Intern', org: 'Technical Hub Pvt Ltd', text: 'May – June. Built web and mobile apps with React Native.', photo: 'img/photos/portrait-laptop.jpg', note: 'first internship!' },
  { year: '2026', title: 'Top 100 Team', org: 'Myntra WeForShe HackerRamp', text: 'Built StarCloset, an AI stylist, with my team.', photo: 'img/photos/portrait-smile.jpg', note: 'so proud of this one' },
  { year: '2023', title: 'B.Tech, Data Science', org: 'Aditya College of Engineering & Technology', text: '2023 – 2027 · CGPA 9.07 · Department Topper.', photo: 'img/photos/portrait-look.jpg', note: 'where it all started' },
  { year: '2021', title: 'Intermediate (MPC)', org: 'Sri Chaitanya Junior College, Kakinada', text: 'Scored 90.6% in Maths, Physics & Chemistry.', photo: 'img/photos/portrait-seated.jpg', note: 'maths kid' },
]

export const skills = [
  'React', 'Node.js', 'TypeScript', 'JavaScript', 'Python', 'Java', 'C++', 'SQL',
  'Express', 'FastAPI', 'Spring Boot', 'React Native', 'Tailwind', 'MongoDB', 'PostgreSQL',
  'MySQL', 'Redis', 'Docker', 'Git', 'Postman', 'Electron', 'JWT', 'OpenAI', 'scikit-learn',
]

// Milestones scoreboard. brand = icon key from src/lib/brands.js
// value counts up, bar fills to value / goal
export const scoreboard = [
  { brand: 'leetcode', label: 'LeetCode', note: 'problems solved', value: 450, suffix: '+', goal: 500 },
  { brand: 'codechef', label: 'CodeChef', note: 'problems solved', value: 500, suffix: '+', goal: 550 },
  { brand: 'geeksforgeeks', label: 'GeeksforGeeks', note: 'problems solved', value: 280, suffix: '+', goal: 400 },
  { brand: 'hackerrank', label: 'HackerRank', note: 'stars earned', value: 20, suffix: '★', goal: 25 },
]
// [title, issuer, brand icon key from src/lib/brands.js]
export const certifications = [
  ['MongoDB Certified Associate Developer', 'MongoDB', 'mongodb'],
  ['GitHub Foundations', 'Microsoft · GitHub', 'github'],
  ['Java Foundations Associate', 'Oracle', 'oracle'],
  ['Career Launchpad · Data Analytics', 'Google Cloud', 'googlecloud'],
  ['JavaScript Essentials 1 & 2', 'Cisco', 'cisco'],
  ['Python & Intro to Data Science', 'Cisco', 'cisco'],
  ['HTML & CSS', 'Certiport · Pearson', 'pearson'],
  ['Programming Essentials in C/C++', 'C++ Institute', 'cplusplus'],
]

// cut-out frames used by the hero (she turns to look at your cursor)
export const lookFrames = { from: 0, to: 28 }
export const contactSticker = 'img/stickers/lg/f239.webp'
