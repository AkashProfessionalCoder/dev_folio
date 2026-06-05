# DevFolio Forge

A developer portfolio generator where you choose professional templates, fill details through dynamic forms, preview instantly, and export the entire portfolio as a standalone React + Vite + Tailwind project.

**Core Philosophy:**
- Template controls design
- User controls content
- Schema controls editor
- JSON + Template = Complete Website
- You own the exported source code forever

## Tech Stack

### Frontend
- React 18 + Vite
- Tailwind CSS
- React Router
- Zustand (state management)
- React Hook Form + Zod
- Axios

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- REST API

### Export
- Archiver (ZIP generation)
- Generates standalone React + Vite + Tailwind projects

## Getting Started

### Prerequisites
- Node.js >= 18
- MongoDB running locally or a MongoDB Atlas URI

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/devfolio-forge.git
cd devfolio-forge

# Install all dependencies
npm run install:all

# Set up environment variables
cp server/.env.example server/.env
# Edit server/.env with your MongoDB URI and JWT secret

# Seed default templates
npm run seed:templates

# Start development servers
npm run dev
```

This starts:
- Frontend at `http://localhost:5173`
- Backend at `http://localhost:5000`

## Project Structure

```
devfolio-forge/
├── client/                    # React + Vite frontend
│   └── src/
│       ├── components/
│       │   ├── common/        # Navbar, Spinner, ProtectedRoute
│       │   └── editor/        # SchemaForm, TemplatePreview, SetupModal
│       ├── pages/             # Login, Register, Dashboard, Editor, Profile
│       ├── store/             # Zustand stores (auth, portfolio)
│       ├── services/          # Axios API client
│       └── templates/         # 5 portfolio templates with components
├── server/                    # Express backend
│   ├── src/
│   │   ├── controllers/       # Auth, Template, Portfolio, Export
│   │   ├── models/            # User, Template, Portfolio (Mongoose)
│   │   ├── routes/            # API route definitions
│   │   ├── middleware/        # JWT authentication
│   │   └── services/          # Export ZIP generation
│   └── scripts/               # Database seeding
└── generated/                 # Temporary export files
```

## Default Templates

| Template | Theme | Sections |
|----------|-------|----------|
| **Minimal Engineer** | Clean, simple, professional | Hero, About, Skills, Experience, Projects, Education, Blogs, Contact |
| **Modern Dark Developer** | Dark, gradient, SaaS style | Hero, Tech Stack, Experience, Projects, Open Source, Achievements, Social Links, Contact |
| **Creative Developer** | Portfolio showcase, large typography | Hero, About, Featured Work, Skills, Testimonials, Experience, Contact |
| **Senior Engineer Resume** | Professional resume style | Hero, Summary, Career Timeline, Technical Skills, Major Projects, Certifications, Contact |
| **Founder Portfolio** | Personal brand | Hero, Story, Products Built, Case Studies, Blogs, Testimonials, Contact |

## How It Works

### Schema-Driven Editor

Every template defines a `schema` that describes its sections and fields. The editor dynamically generates forms from this schema — no manual form creation needed.

```json
{
  "sections": [
    {
      "id": "hero",
      "label": "Hero",
      "fields": [
        { "key": "name", "type": "text", "label": "Full Name", "required": true },
        { "key": "role", "type": "text", "label": "Role" }
      ]
    }
  ]
}
```

Supported field types: `text`, `textarea`, `url`, `image`, `array`, `objectList`

### Export Flow

1. Click **Export Code**
2. Backend generates a standalone React + Vite + Tailwind project
3. Injects your portfolio data as `src/data/portfolio.json`
4. Downloads as a ZIP file
5. Extract, run `npm install && npm run dev` — your portfolio works

## API Endpoints

### Auth
- `POST /api/auth/register` — Create account
- `POST /api/auth/login` — Sign in
- `GET /api/auth/me` — Get current user
- `PATCH /api/auth/me` — Update profile

### Templates
- `GET /api/templates` — List all templates
- `GET /api/templates/:id` — Get template details

### Portfolios
- `POST /api/portfolios` — Create portfolio
- `GET /api/portfolios` — List user's portfolios
- `GET /api/portfolios/:id` — Get portfolio
- `PATCH /api/portfolios/:id` — Update portfolio
- `DELETE /api/portfolios/:id` — Delete portfolio
- `GET /api/portfolios/:id/export` — Export as ZIP

## Features

- Register / Login with JWT authentication
- Browse 5 professional portfolio templates
- Create portfolios from templates
- Upload JSON or fill forms manually
- Split-screen editor with live preview
- Auto-save every 5 seconds
- Unsaved changes warning on browser close
- Export complete React + Vite + Tailwind source code
- Dark theme UI inspired by Vercel / Linear

## Scripts

```bash
npm run dev              # Start both frontend and backend
npm run dev:client       # Start frontend only
npm run dev:server       # Start backend only
npm run build            # Build frontend for production
npm run seed:templates   # Seed default templates into MongoDB
npm run install:all      # Install dependencies for all packages
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT
