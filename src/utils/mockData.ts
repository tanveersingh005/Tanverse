export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  tags: string[]
  category: 'Distributed' | 'Frontend' | 'AI & ML' | 'Full Stack'
  image: string
  github: string
  demo: string
  timeline: string
  metrics: { label: string; value: string }[]
  challenges: string[]
  results: string[]
  architecture: string[] // List of steps/components in the diagram
  futureImprovements: string[]
}

export interface Experience {
  id: string
  role: string
  company: string
  period: string
  location: string
  description: string[]
  tags: string[]
}

export interface Achievement {
  id: string
  title: string
  issuer: string
  date: string
  description: string
  category: 'Award' | 'Hackathon' | 'Leadership' | 'Open Source'
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string // MDX / Markdown content
  date: string
  readTime: string
  tags: string[]
  coverImage: string
}

export const projectsData: Project[] = [
  {
    id: 'GoWheelo',
    title: 'GoWheelo',
    description: 'A full-stack car reservation platform featuring dynamic scheduling, live map filtering, and Stripe checkouts.',
    longDescription: 'A comprehensive peer-to-peer and corporate vehicle rental application built for high-performance scale. It integrates Leaflet map overlays for localized geolocation queries, dynamic pricing adjustments based on dates, and secure payment integrations with Stripe webhook verifications.',
    tags: ['React', 'Vite', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB', 'Stripe API', 'Leaflet Maps', 'Tailwind CSS', 'HTML5/CSS3', 'Git/GitHub', 'Netlify'],
    category: 'Full Stack',
    image: '/Go-wheelo.png',
    github: 'https://github.com/tanveersingh005/Go-Wheelo',
    demo: 'https://go-wheelo.netlify.app/',
    timeline: '3 Months (2025)',
    metrics: [
      { label: 'Booking Success Rate', value: '99.2%' },
      { label: 'Active Fleet Vehicles', value: '450+' },
      { label: 'Avg Reservation Time', value: '< 2 min' }
    ],
    challenges: [
      'Mitigating double-booking collisions under high concurrent user sessions without degrading database performance.',
      'Securing transaction data flows and handling webhook failures gracefully during dropouts.'
    ],
    results: [
      'Engineered a lock-based calendar scheduling queue in Node.js to guarantee transaction isolation.',
      'Implemented geographic index filters in MongoDB to feed location queries to Leaflet in under 50ms.'
    ],
    architecture: [
      'Client Browser -> Leaflet Geolocation Map Filter',
      'Map search -> Express Backend Node Server -> MongoDB Index Query',
      'Selected Vehicle -> Reservation check -> Stripe Checkout Session',
      'Stripe Webhook -> Confirm Booking & Release vehicle -> client socket alert'
    ],
    futureImprovements: [
      'Integrate hardware telematics APIs for remote keyless unlocking via mobile device.',
      'Deploy an AI-based demand-pricing algorithm to adjust rates based on seasonal spikes.'
    ]
  },
  {
    id: 'ReTrust+',
    title: 'ReTrust+',
    description: 'A sustainability-focused circular economy marketplace with ML-based device condition grading.',
    longDescription: 'A custom sustainability-driven retail platform promoting circular economy practices and e-waste recycling. Integrates a FastAPI machine learning microservice for automated electronic quality assessment, localized Leaflet shipping/pickup routing, and a real-time carbon offsets credit ledger.',
    tags: ['React', 'Vite', 'TypeScript', 'FastAPI', 'Python', 'MobileNet (ML)', 'Node.js', 'MongoDB', 'Leaflet Routing', 'JWT Auth', 'Bcrypt Hashing', 'Tailwind CSS', 'Git/GitHub', 'Netlify'],
    category: 'AI & ML',
    image: '/Retrust.jpg',
    github: 'https://github.com/tanveersingh005/Retrust',
    demo: 'https://retrust-plus.netlify.app/',
    timeline: '4 Months (2025-2026)',
    metrics: [
      { label: 'E-Waste Recycled', value: '1.2 Tons' },
      { label: 'Active Users', value: '4,500+' },
      { label: 'Grading Accuracy', value: '94.5%' }
    ],
    challenges: [
      'Building a reliable computer vision classifier that runs efficiently on micro-instances to verify device condition.',
      'Developing a dynamic carbon offset estimator for complex local shipping routes.'
    ],
    results: [
      'Trained and deployed a lightweight MobileNet image classifier via FastAPI, returning grades in under 80ms.',
      'Optimized localized pick-up transit routing using Leaflet engine, reducing delivery carbon footprint by 28%.'
    ],
    architecture: [
      'Seller Upload -> FastAPI Quality Assessment Service',
      'FastAPI ML Classifier -> Generate device condition score -> MongoDB catalog',
      'Buyer Search -> Leaflet radius location filter -> Local circular match',
      'Transaction -> Carbon credits reward allocation -> User Dashboard'
    ],
    futureImprovements: [
      'Integrate decentralized ledgers for transparent carbon offset verification and tracking.',
      'Build mobile scanning helper utilizing WebRTC camera feed overlays.'
    ]
  },
  {
    id: 'Tanverse',
    title: 'Tanverse',
    description: 'A premium, high-performance interactive developer portfolio showcasing hardware-accelerated animations and custom audio physics.',
    longDescription: 'A bespoke creative developer portal and portfolio platform built to show technical engineering and UI capabilities. Integrates a custom Web Audio engine for hardware audio priming, a zero-overhead mouse tracker utilising React refs, an IntersectionObserver-based particle canvas, and a unified command search palette.',
    tags: ['React', 'Vite', 'TypeScript', 'Three.js', 'Framer Motion', 'Lenis Scroll', 'Web Audio API', 'Tailwind CSS', 'HTML5/CSS3', 'Git/GitHub', 'Netlify'],
    category: 'Frontend',
    image: '/portfolio_banner.png',
    github: 'https://github.com/tanveersingh005/Tanverse',
    demo: 'https://tanveer-singh.netlify.app/',
    timeline: '1 Month (2026)',
    metrics: [
      { label: 'Interactive Framerate', value: '120 FPS' },
      { label: 'Audio Latency', value: '< 20ms' },
      { label: 'Asset Load Time', value: '< 1.2s' }
    ],
    challenges: [
      'Bypassing aggressive browser autoplay policies to activate procedural clicking sound effects dynamically on user gesture.',
      'Achieving zero layout thrashing on custom cursor SVG tracking during high-speed mouse motions.'
    ],
    results: [
      'Developed a global interaction-primed AudioContext hook extending beeps to 80ms to bypass hardware audio latency.',
      'Engineered ref-based DOM position caching and custom transform-origin anchors, reducing mousemove CPU cycles by 90%.'
    ],
    architecture: [
      'Client Interaction -> Prime Web Audio AudioContext',
      'Mouse Motion -> Cache coordinates in React Refs -> Direct SVG transform-origin translation',
      'Viewport Scroll -> IntersectionObserver -> Freeze off-screen canvas particle loops',
      'Site Navigation -> HashRouter -> Restore scroll location and bypass loading screen on reload'
    ],
    futureImprovements: [
      'Compile WebGL custom shaders for higher density star field orbits.',
      'Build localized client analytics logs database in IndexedDB.'
    ]
  }
]

export const experienceData: Experience[] = [
  {
    id: 'exp1',
    role: 'Product Analyst Intern',
    company: 'Unifindss',
    period: 'Nov 2025 - Jan 2026',
    location: 'Remote',
    description: [
      'Collaborated with cross-functional teams to define and prioritize product requirements for 2,000+ students.',
      'Analyzed user feedback from 50+ feature requests to identify pain points and improve platform navigation and usability.',
      'Developed and standardized 12+ reusable UI components, reducing development effort and improving product scalability.'
    ],
    tags: ['Product Strategy', 'User Feedback Analysis', 'UI/UX Design', 'Reusable Components', 'React']
  },
  {
    id: 'exp2',
    role: 'Business Analyst Intern',
    company: 'Atessa Coffee',
    period: 'Jun 2025 - Aug 2025',
    location: 'Remote',
    description: [
      'Analyzed 1,500+ customer transactions to identify purchasing trends, improving inventory accuracy by 15%.',
      'Built KPI dashboards tracking revenue and customer retention, reducing manual reporting effort by 30%.',
      'Conducted market analysis across 10+ competitors, contributing to strategies that increased customer engagement by 12%.'
    ],
    tags: ['Data Analysis', 'KPI Dashboards', 'Competitor Research', 'Inventory Optimization', 'Business Intelligence']
  }
]

export const achievementsData: Achievement[] = [
  {
    id: 'ach1',
    title: 'Hacksprint National Hackathon Winner',
    issuer: 'Hacksprint National Hackathon',
    date: '2025',
    description: 'Won 1st Place in the Hacksprint National Hackathon, competing against teams across India.',
    category: 'Hackathon'
  },
  {
    id: 'ach2',
    title: 'Walmart Sparkthon Semifinalist',
    issuer: 'Walmart Sparkthon',
    date: '2025',
    description: 'Semifinalist in the Sparkthon Walmart Hackathon, advancing through multiple evaluation rounds.',
    category: 'Hackathon'
  },
  {
    id: 'ach3',
    title: 'HackTheChain 3.0 Bronze Medalist',
    issuer: 'HackTheChain 3.0 National Hackathon',
    date: '2025',
    description: 'Secured 3rd Place in the HackTheChain 3.0 National Hackathon for developing an innovative Business solution.',
    category: 'Hackathon'
  },
  {
    id: 'ach4',
    title: 'Smart India Hackathon Top Team',
    issuer: 'Smart India Hackathon (SIH)',
    date: '2024',
    description: 'Selected among the top teams in the institute-level screening of Smart India Hackathon (SIH).',
    category: 'Hackathon'
  },
  {
    id: 'ach5',
    title: 'CodeChef 2-Star Coder',
    issuer: 'CodeChef',
    date: 'Active',
    description: 'Achieved CodeChef 2-Star Rating (Peak Rating: 1456), demonstrating competitive programming proficiency.',
    category: 'Award'
  },
  {
    id: 'ach6',
    title: '300+ SQL Problems Solved',
    issuer: 'LeetCode / Hackerrank',
    date: 'Active',
    description: 'Solved 300+ SQL problems across various platforms demonstrating strong database query and optimization abilities.',
    category: 'Award'
  }
]

export const blogData: BlogPost[] = [
  {
    id: 'blog1',
    title: 'Building a High-Performance 3D Grid inside GLSL Fragment Shaders',
    slug: 'glsl-fragment-shader-grid',
    excerpt: 'Deep-dive into rendering infinitely scaling grid overlays on the GPU using ray-plane intersections and anti-aliasing math.',
    date: 'May 12, 2026',
    readTime: '6 min read',
    tags: ['Graphics', 'GLSL', 'Three.js'],
    coverImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    content: `## The Quest for High-Performance Grids

When designing modern interactive web platforms, developers frequently add grid lines. The traditional approach of inserting thousands of DOM tags creates massive CPU rendering bottlenecks. The modern, elegant way is to write a **fragment shader** in GLSL!

### Ray-Plane Intersections

To draw a 3D grid in a fragment shader, we cast a ray from the camera position through the screen pixel. We then find the exact intersection point with the grid plane ($y = 0$):

$$\\vec{r}(t) = \\vec{o} + t\\vec{d}$$

If we solve for $t$ where $y = 0$, we get the spatial grid coordinates:

\`\`\`glsl
// GLSL snippet representing intersection
float t = -ray_origin.y / ray_direction.y;
vec3 intersection_point = ray_origin + t * ray_direction;
\`\`\`

### Anti-Aliased Lines

If we check if the coordinate is near an integer boundary using a simple \`step()\` function, the lines will experience massive aliasing artifacts at a distance. To fix this, we calculate the screen-space derivatives:

\`\`\`glsl
vec2 grid_coord = intersection_point.xz;
vec2 der = fwidth(grid_coord);
vec2 grid_line = smoothstep(line_width - der, line_width + der, abs(fract(grid_coord - 0.5) - 0.5));
float line_opacity = 1.0 - min(grid_line.x, grid_line.y);
\`\`\`

This ensures that lines smoothly blend out as they approach sub-pixel widths at the horizon, delivering a pristine visual experience at 60 FPS.`
  },
  {
    id: 'blog2',
    title: 'Zustand vs Redux in React 19: The Paradigm Shift',
    slug: 'react-19-zustand-redux',
    excerpt: 'Analyze state stores in React 19 concurrent environments. How Zustand achieves clean render tracking with zero boilerplate.',
    date: 'Apr 25, 2026',
    readTime: '4 min read',
    tags: ['React', 'Zustand', 'State'],
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80',
    content: `## The State of React State Management

React 19 brings concurrent renderings, transitions, and native async support. Traditional giants like Redux often require verbose boilerplate (actions, actions creators, slices, dispatchers) that overcomplicates developer flows.

### Enter Zustand

Zustand is a lightweight state management store built on hooks. It manages states outside the React tree, avoiding re-renders unless specified state properties change.

#### What makes it work in React 19?

- **useSyncExternalStore**: Zustand uses React's native subscription method under the hood, guaranteeing state integrity during concurrent renders.
- **Zero Boilerplate**: You define a store function directly and use it as a hook anywhere in your code.
- **Transient State Updates**: You can subscribe to state properties without causing a re-render using selector functions.

\`\`\`typescript
// Pure simplicity
const theme = usePortfolioStore((state) => state.theme);
\`\`\`

By simplifying state architectures, developers can focus on premium layouts and fluid interactive effects.`
  }
]
