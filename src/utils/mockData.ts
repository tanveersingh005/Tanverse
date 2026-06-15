export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  tags: string[]
  category: 'Distributed' | 'Graphics' | 'AI & ML' | 'Full Stack'
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
    id: 'novanet',
    title: 'NovaNet: Decentralized AI Inference Hub',
    description: 'A peer-to-peer WebGL-visualized GPU orchestration framework for local AI models.',
    longDescription: 'NovaNet coordinates volunteer GPU nodes to run decentralized LLM inference sessions. It uses custom routing algorithms, WebSocket connections, and cryptographic proof of work to prevent output poisoning. Recruits high availability nodes and partitions requests seamlessly.',
    tags: ['React', 'TypeScript', 'WebSockets', 'WebGPU', 'Go', 'Docker'],
    category: 'AI & ML',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80',
    github: 'https://github.com/Tanverse/novanet',
    demo: 'https://novanet.dev',
    timeline: '6 Months (2025-2026)',
    metrics: [
      { label: 'Token Latency Red.', value: '42%' },
      { label: 'Active GPU Nodes', value: '14,200+' },
      { label: 'Successful Queries', value: '4.8M' }
    ],
    challenges: [
      'Synchronizing weights across volatile P2P nodes without excessive bandwidth overhead.',
      'Verifying the integrity of generated responses when nodes can maliciously spoof results.'
    ],
    results: [
      'Engineered a sliding-window consensus verification algorithm that flags anomalies with 99.8% precision.',
      'Reduced average latency to 45ms per token using active route optimization.'
    ],
    architecture: [
      'User Request -> Gatekeeper API Node',
      'Orchestrator splits request -> Distributed Nodes',
      'Nodes perform local inference -> consensus pool',
      'Consensus check -> verified client response return'
    ],
    futureImprovements: [
      'Introduce homomorphic encryption to protect private user data during remote execution.',
      'Integrate decentralized storage networks for persistent weight caching.'
    ]
  },
  {
    id: 'aether',
    title: 'AetherEngine: Real-time WebGL Ray Tracer',
    description: 'A hardware-accelerated physics engine and shading graph editor running inside browser shaders.',
    longDescription: 'AetherEngine is an in-browser 3D Ray Tracing engine that features a dynamic node-based shading graph, ambient occlusion, spatial indexing via BVH, and procedural texture generators. Built using pure WebGL 2.0 fragment shaders.',
    tags: ['WebGL 2.0', 'GLSL', 'Three.js', 'React', 'Zustand'],
    category: 'Graphics',
    image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=800&q=80',
    github: 'https://github.com/Tanverse/aether-engine',
    demo: 'https://aether.graphics',
    timeline: '4 Months (2025)',
    metrics: [
      { label: 'FPS at 1080p', value: '60 FPS' },
      { label: 'Render Node Count', value: '1.2M polys' },
      { label: 'Bounce Cycles', value: 'Up to 4 bounce' }
    ],
    challenges: [
      'Managing a bounding volume hierarchy (BVH) inside flat texture arrays in GLSL.',
      'Compiling dynamic shader nodes without dropping rendering frames.'
    ],
    results: [
      'Created a stackless BVH traversal algorithm using bitwise operators in WebGL.',
      'Asynchronously compiled GLSL fragment code using Web Workers to prevent main thread blocking.'
    ],
    architecture: [
      'React Canvas Container -> WebGL Context',
      'Object Mesh Loader -> BVH Tree Builder (JS)',
      'BVH Tree packed -> 2D Texture Array (GPU)',
      'Fragment Shader -> BVH traversal -> Ray casting -> Screen Color'
    ],
    futureImprovements: [
      'Migrate engine core to WebGPU for direct compute shader memory access.',
      'Add path tracing denoiser utilizing neural networks.'
    ]
  },
  {
    id: 'sentinels',
    title: 'Sentinels: Real-Time Threat Analysis Console',
    description: 'An enterprise-grade cybersecurity console monitoring global network socket anomalies.',
    longDescription: 'Sentinels parses high-frequency server logs to identify zero-day attacks. It plots attacks in a geographic WebGL heat globe and triggers alarms using distributed Redis clusters.',
    tags: ['Next.js', 'Rust', 'Redis', 'WebSockets', 'Chart.js', 'Three.js'],
    category: 'Distributed',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    github: 'https://github.com/Tanverse/sentinels',
    demo: 'https://sentinels.live',
    timeline: '8 Months (2024)',
    metrics: [
      { label: 'Ingestion Speed', value: '250k logs/sec' },
      { label: 'Threat Detect Lat.', value: '< 12ms' },
      { label: 'False Positives', value: '0.04%' }
    ],
    challenges: [
      'Rendering thousands of live attack nodes on a 3D globe without micro-stuttering.',
      'Parsing irregular system logs at sub-millisecond speeds.'
    ],
    results: [
      'Optimized 3D rendering using instanced point-cloud meshes in Three.js.',
      'Wrote a high-performance log-parsing pipeline in Rust using SIMD instruction sets.'
    ],
    architecture: [
      'Syslogs Ingestion -> Rust Parser Engine',
      'Parsed JSON streams -> Redis PubSub Router',
      'Visual Clients (WebSockets) -> Instanced Meshes',
      'Client Browser -> 3D Globe Render Output'
    ],
    futureImprovements: [
      'Implement auto-mitigation workflows using Kubernetes operator scripts.',
      'Train a lightweight local classifier to categorize unknown anomaly tags.'
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
