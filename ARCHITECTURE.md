# Portfolio - Architecture Overview

## System Architecture

```mermaid
graph TB
    subgraph "Client Layer"
        BROWSER["🖥️ Browser<br/>React SPA"]
    end

    subgraph "Vite Build System"
        VITE["Vite<br/>Development Server"]
        HMR["Hot Module<br/>Replacement"]
        BUNDLE["Optimized Bundle<br/>Code Splitting"]
    end

    subgraph "React Application"
        ROUTER["React Router<br/>Page Navigation"]
        COMPONENTS["React Components<br/>UI Rendering"]
        HOOKS["Custom Hooks<br/>Logic Management"]
    end

    subgraph "Data & State"
        GITHUB_API["GitHub API<br/>Live Data"]
        STATE["React State<br/>Local Data"]
        CACHE["Client Cache"]
    end

    subgraph "Styling Layer"
        TAILWIND["Tailwind CSS<br/>Utility Classes"]
        COMPONENTS_UI["shadcn/ui<br/>Pre-built Components"]
    end

    subgraph "Deployment"
        GHPAGES["GitHub Pages<br/>Static Hosting"]
        BUILD["npm run build"]
        DEPLOY["npm run deploy"]
    end

    BROWSER --> VITE
    VITE --> HMR
    HMR --> COMPONENTS
    COMPONENTS --> ROUTER
    COMPONENTS --> HOOKS
    HOOKS --> STATE
    STATE --> GITHUB_API
    GITHUB_API --> CACHE
    CACHE --> COMPONENTS
    COMPONENTS --> TAILWIND
    COMPONENTS --> COMPONENTS_UI
    TAILWIND --> BUNDLE
    COMPONENTS_UI --> BUNDLE
    BUNDLE --> DEPLOY
    DEPLOY --> GHPAGES
```

## Page Architecture

```mermaid
graph LR
    HOME["🏠 Hero Section"]
    SKILLS["⚙️ Skills & Tech Stack"]
    STATS["📊 GitHub Stats"]
    SERVICES["🔧 Services/Projects"]
    PROJECTS["🎯 Featured Projects"]
    WRITEUPS["✍️ Writeups & Blog"]
    TERMINAL["💻 Terminal Profile"]
    TIMELINE["📈 Timeline"]
    CONTACT["📬 Contact Form"]

    CLICK["User Navigation"]
    CLICK --> HOME
    CLICK --> SKILLS
    CLICK --> STATS
    CLICK --> SERVICES
    CLICK --> PROJECTS
    CLICK --> WRITEUPS
    CLICK --> TERMINAL
    CLICK --> TIMELINE
    CLICK --> CONTACT
```

## Tech Stack

| Layer | Technologies |
|-------|--------------|
| **Build Tool** | Vite |
| **Framework** | React 18 |
| **Language** | TypeScript (86.6%) |
| **Styling** | Tailwind CSS (10.1%) |
| **Components** | shadcn/ui |
| **API Integration** | GitHub REST API |
| **Hosting** | GitHub Pages |
| **Package Manager** | npm |

## Project Structure

```
portfolio/
├── src/
│   ├── components/
│   │   ├── sections/
│   │   │   ├── Hero.tsx              # Landing hero section
│   │   │   ├── Skills.tsx            # Tech stack display
│   │   │   ├── Stats.tsx             # GitHub stats integration
│   │   │   ├── Services.tsx          # Services offered
│   │   │   ├── Projects.tsx          # Featured projects
│   │   │   ├── Writeups.tsx          # Blog/writeups
│   │   │   ├── Terminal.tsx          # Terminal aesthetic
│   │   │   ├── Timeline.tsx          # Experience timeline
│   │   │   └── Contact.tsx           # Contact form
│   │   ├── ui/
│   │   │   └── [shadcn components]   # Pre-built UI
│   │   └── layout/
│   │       ├── Header.tsx            # Navigation
│   │       └── Footer.tsx            # Footer
│   ├── hooks/
│   │   ├── useGitHubAPI.ts          # GitHub API integration
│   │   └── [custom hooks]
│   ├── lib/
│   │   ├── github.ts                 # GitHub API utilities
│   │   └── utils.ts                  # Helper functions
│   ├── styles/
│   │   ├── globals.css              # Global styles
│   │   └── tailwind.css             # Tailwind directives
│   ├── App.tsx                       # Root component
│   └── main.tsx                      # Entry point
├── public/
│   ├── assets/                       # Static assets
│   └── images/                       # Portfolio images
├── dist/                             # Build output
├── vite.config.ts                    # Vite configuration
├── tsconfig.json                     # TypeScript config
├── tailwind.config.js                # Tailwind config
└── package.json
```

## GitHub API Integration

```
Components
    ↓
useGitHubAPI Hook
    ↓
GitHub REST API
    ↓
Cache (localStorage)
    ↓
Render Stats/Data
```

## Data Flow

1. **User loads page** → Vite serves optimized bundle
2. **Components mount** → useGitHubAPI hook fetches GitHub data
3. **Data cached** → Stored in localStorage for performance
4. **Components render** → Display fetched data with Tailwind styling
5. **User navigates** → React Router handles client-side routing
6. **HMR active** → Instant updates during development

## Build & Deployment

```
npm run dev
    ↓
Vite dev server (localhost:3000)
    ↓
npm run build
    ↓
Vite bundles & optimizes
    ↓
dist/ folder created
    ↓
npm run deploy
    ↓
GitHub Pages deployment
    ↓
harrydev.one/portfolio
```

## Key Features

- ✅ **Live GitHub Integration** - Real-time stats from GitHub API
- ✅ **Bento Grid Layout** - Modern, responsive design
- ✅ **Dark Terminal Aesthetic** - Custom theme matching personal brand
- ✅ **Mobile Responsive** - Works on all screen sizes
- ✅ **Fast Performance** - Vite optimizations + code splitting
- ✅ **Type Safe** - Full TypeScript coverage
- ✅ **Accessible** - shadcn/ui ensures WCAG compliance

## Performance Optimizations

- Code splitting per route
- Lazy loading of images
- CSS purging with Tailwind
- Minified production builds
- Gzip compression
- CDN distribution via GitHub Pages

---

*Last Updated: 2026-07-13*
