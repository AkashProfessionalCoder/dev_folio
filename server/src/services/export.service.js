import archiver from "archiver";

function generatePackageJson() {
  return JSON.stringify(
    {
      name: "my-portfolio",
      private: true,
      version: "1.0.0",
      type: "module",
      scripts: {
        dev: "vite",
        build: "vite build",
        preview: "vite preview",
      },
      dependencies: {
        react: "^18.3.1",
        "react-dom": "^18.3.1",
      },
      devDependencies: {
        "@types/react": "^18.3.18",
        "@types/react-dom": "^18.3.5",
        "@vitejs/plugin-react": "^4.3.4",
        autoprefixer: "^10.4.20",
        postcss: "^8.5.1",
        tailwindcss: "^3.4.17",
        vite: "^6.0.7",
      },
    },
    null,
    2,
  );
}

function generateViteConfig() {
  return `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
`;
}

function generateTailwindConfig() {
  return `/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
`;
}

function generatePostcssConfig() {
  return `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
`;
}

function generateIndexHtml() {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Portfolio</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`;
}

function generateMainJsx() {
  return `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`;
}

function generateIndexCss() {
  return `@tailwind base;
@tailwind components;
@tailwind utilities;
`;
}

function generateReadme() {
  return `# My Portfolio

Generated with [DevFolio Forge](https://github.com/devfolio-forge).

## Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

## Build

\`\`\`bash
npm run build
\`\`\`
`;
}

function getTemplateComponents(templatePath) {
  const templates = {
    "minimal-engineer": generateMinimalEngineerComponents,
    "modern-dark-developer": generateModernDarkComponents,
    "creative-developer": generateCreativeDeveloperComponents,
    "senior-engineer-resume": generateSeniorEngineerComponents,
    "founder-portfolio": generateFounderPortfolioComponents,
  };
  return (templates[templatePath] || templates["minimal-engineer"])();
}

function generateMinimalEngineerComponents() {
  return {
    "src/components/Hero.jsx": `export default function Hero({ data }) {
  if (!data) return null;
  return (
    <section className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center px-6">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">{data.name}</h1>
        <p className="text-xl text-gray-600 mb-6">{data.role}</p>
        <p className="text-gray-500 max-w-2xl mx-auto">{data.description}</p>
      </div>
    </section>
  );
}`,
    "src/components/About.jsx": `export default function About({ data }) {
  if (!data) return null;
  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">About</h2>
        <p className="text-gray-600 leading-relaxed">{data.bio}</p>
      </div>
    </section>
  );
}`,
    "src/components/Skills.jsx": `export default function Skills({ data }) {
  if (!data?.length) return null;
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Skills</h2>
        <div className="flex flex-wrap gap-3">
          {data.map((skill, i) => (
            <span key={i} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">{skill}</span>
          ))}
        </div>
      </div>
    </section>
  );
}`,
    "src/components/Experience.jsx": `export default function Experience({ data }) {
  if (!data?.length) return null;
  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Experience</h2>
        <div className="space-y-8">
          {data.map((exp, i) => (
            <div key={i} className="border-l-2 border-gray-300 pl-6">
              <h3 className="text-xl font-semibold text-gray-900">{exp.position}</h3>
              <p className="text-gray-600 font-medium">{exp.company}</p>
              <p className="text-sm text-gray-400 mb-2">{exp.duration}</p>
              <p className="text-gray-500">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`,
    "src/components/Projects.jsx": `export default function Projects({ data }) {
  if (!data?.length) return null;
  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Projects</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {data.map((project, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.name}</h3>
              <p className="text-gray-500 mb-4">{project.description}</p>
              <div className="flex gap-3">
                {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-sm text-blue-600 hover:underline">Live</a>}
                {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-sm text-blue-600 hover:underline">GitHub</a>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`,
    "src/components/Education.jsx": `export default function Education({ data }) {
  if (!data?.length) return null;
  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Education</h2>
        <div className="space-y-6">
          {data.map((edu, i) => (
            <div key={i}>
              <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
              <p className="text-gray-600">{edu.school}</p>
              <p className="text-sm text-gray-400">{edu.year}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`,
    "src/components/Blogs.jsx": `export default function Blogs({ data }) {
  if (!data?.length) return null;
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Blog</h2>
        <div className="space-y-6">
          {data.map((blog, i) => (
            <a key={i} href={blog.url} target="_blank" rel="noreferrer" className="block border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{blog.title}</h3>
              <p className="text-gray-500">{blog.excerpt}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}`,
    "src/components/Contact.jsx": `export default function Contact({ data }) {
  if (!data) return null;
  return (
    <section className="py-20 px-6 bg-gray-900 text-white">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
        <p className="text-gray-300 mb-6">{data.message}</p>
        {data.email && <a href={"mailto:" + data.email} className="text-blue-400 hover:underline text-lg">{data.email}</a>}
      </div>
    </section>
  );
}`,
    "src/App.jsx": `import portfolioData from './data/portfolio.json';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Blogs from './components/Blogs';
import Contact from './components/Contact';

export default function App() {
  return (
    <main>
      <Hero data={portfolioData.hero} />
      <About data={portfolioData.about} />
      <Skills data={portfolioData.skills} />
      <Experience data={portfolioData.experience} />
      <Projects data={portfolioData.projects} />
      <Education data={portfolioData.education} />
      <Blogs data={portfolioData.blogs} />
      <Contact data={portfolioData.contact} />
    </main>
  );
}`,
  };
}

function generateModernDarkComponents() {
  return {
    "src/components/Hero.jsx": `export default function Hero({ data }) {
  if (!data) return null;
  return (
    <section className="min-h-screen flex items-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-emerald-400 font-mono mb-4">{data.greeting}</p>
        <h1 className="text-6xl font-bold text-white mb-4">{data.name}</h1>
        <p className="text-2xl text-gray-400 mb-6">{data.role}</p>
        <p className="text-gray-500 max-w-2xl">{data.description}</p>
      </div>
    </section>
  );
}`,
    "src/components/TechStack.jsx": `export default function TechStack({ data }) {
  if (!data?.length) return null;
  return (
    <section className="py-20 px-6 bg-gray-900">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8">Tech Stack</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data.map((tech, i) => (
            <div key={i} className="bg-gray-800 border border-gray-700 rounded-lg p-4 text-center hover:border-emerald-500 transition-colors">
              <p className="text-white font-medium">{tech}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`,
    "src/components/Experience.jsx": `export default function Experience({ data }) {
  if (!data?.length) return null;
  return (
    <section className="py-20 px-6 bg-black">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8">Experience</h2>
        <div className="space-y-6">
          {data.map((exp, i) => (
            <div key={i} className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold text-white">{exp.position}</h3>
                <span className="text-emerald-400 text-sm">{exp.duration}</span>
              </div>
              <p className="text-gray-400 font-medium mb-2">{exp.company}</p>
              <p className="text-gray-500">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`,
    "src/components/Projects.jsx": `export default function Projects({ data }) {
  if (!data?.length) return null;
  return (
    <section className="py-20 px-6 bg-gray-900">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8">Projects</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {data.map((project, i) => (
            <div key={i} className="bg-black border border-gray-800 rounded-lg p-6 hover:border-emerald-500 transition-colors">
              <h3 className="text-lg font-semibold text-white mb-2">{project.name}</h3>
              <p className="text-gray-400 mb-4">{project.description}</p>
              <div className="flex gap-3">
                {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-emerald-400 text-sm hover:underline">Live</a>}
                {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-emerald-400 text-sm hover:underline">GitHub</a>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`,
    "src/components/OpenSource.jsx": `export default function OpenSource({ data }) {
  if (!data?.length) return null;
  return (
    <section className="py-20 px-6 bg-black">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8">Open Source</h2>
        <div className="space-y-4">
          {data.map((item, i) => (
            <a key={i} href={item.url} target="_blank" rel="noreferrer" className="block bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-emerald-500 transition-colors">
              <h3 className="text-lg font-semibold text-white mb-1">{item.name}</h3>
              <p className="text-gray-400">{item.description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}`,
    "src/components/Achievements.jsx": `export default function Achievements({ data }) {
  if (!data?.length) return null;
  return (
    <section className="py-20 px-6 bg-gray-900">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8">Achievements</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {data.map((item, i) => (
            <div key={i} className="bg-black border border-gray-800 rounded-lg p-6">
              <h3 className="text-white font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`,
    "src/components/SocialLinks.jsx": `export default function SocialLinks({ data }) {
  if (!data?.length) return null;
  return (
    <section className="py-16 px-6 bg-black">
      <div className="max-w-3xl mx-auto text-center">
        <div className="flex justify-center gap-6">
          {data.map((link, i) => (
            <a key={i} href={link.url} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-emerald-400 transition-colors text-lg">{link.platform}</a>
          ))}
        </div>
      </div>
    </section>
  );
}`,
    "src/components/Contact.jsx": `export default function Contact({ data }) {
  if (!data) return null;
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-gray-900 to-black">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Get In Touch</h2>
        <p className="text-gray-400 mb-6">{data.message}</p>
        {data.email && <a href={"mailto:" + data.email} className="text-emerald-400 hover:underline text-lg">{data.email}</a>}
      </div>
    </section>
  );
}`,
    "src/App.jsx": `import portfolioData from './data/portfolio.json';
import Hero from './components/Hero';
import TechStack from './components/TechStack';
import Experience from './components/Experience';
import Projects from './components/Projects';
import OpenSource from './components/OpenSource';
import Achievements from './components/Achievements';
import SocialLinks from './components/SocialLinks';
import Contact from './components/Contact';

export default function App() {
  return (
    <main className="bg-black min-h-screen">
      <Hero data={portfolioData.hero} />
      <TechStack data={portfolioData.techStack} />
      <Experience data={portfolioData.experience} />
      <Projects data={portfolioData.projects} />
      <OpenSource data={portfolioData.openSource} />
      <Achievements data={portfolioData.achievements} />
      <SocialLinks data={portfolioData.socialLinks} />
      <Contact data={portfolioData.contact} />
    </main>
  );
}`,
  };
}

function generateCreativeDeveloperComponents() {
  return {
    "src/components/Hero.jsx": `export default function Hero({ data }) {
  if (!data) return null;
  return (
    <section className="min-h-screen flex items-center bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-7xl font-black text-gray-900 mb-6 leading-tight">{data.name}</h1>
        <p className="text-2xl text-purple-600 font-medium mb-4">{data.role}</p>
        <p className="text-xl text-gray-500 max-w-2xl">{data.tagline}</p>
      </div>
    </section>
  );
}`,
    "src/components/About.jsx": `export default function About({ data }) {
  if (!data) return null;
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-black text-gray-900 mb-8">About Me</h2>
        <p className="text-xl text-gray-600 leading-relaxed">{data.bio}</p>
      </div>
    </section>
  );
}`,
    "src/components/FeaturedWork.jsx": `export default function FeaturedWork({ data }) {
  if (!data?.length) return null;
  return (
    <section className="py-24 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-black text-gray-900 mb-12">Featured Work</h2>
        <div className="space-y-16">
          {data.map((work, i) => (
            <div key={i} className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{work.title}</h3>
                <p className="text-gray-600 mb-4">{work.description}</p>
                {work.url && <a href={work.url} target="_blank" rel="noreferrer" className="text-purple-600 font-medium hover:underline">View Project</a>}
              </div>
              <div className="bg-purple-100 rounded-2xl h-64 flex items-center justify-center">
                <span className="text-purple-400 text-lg">Preview</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`,
    "src/components/Skills.jsx": `export default function Skills({ data }) {
  if (!data?.length) return null;
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-black text-gray-900 mb-8">Skills</h2>
        <div className="flex flex-wrap gap-4">
          {data.map((skill, i) => (
            <span key={i} className="px-6 py-3 bg-purple-100 text-purple-700 rounded-full font-medium">{skill}</span>
          ))}
        </div>
      </div>
    </section>
  );
}`,
    "src/components/Testimonials.jsx": `export default function Testimonials({ data }) {
  if (!data?.length) return null;
  return (
    <section className="py-24 px-6 bg-purple-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-black text-gray-900 mb-12">Testimonials</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {data.map((t, i) => (
            <blockquote key={i} className="bg-white rounded-2xl p-8 shadow-sm">
              <p className="text-gray-600 italic mb-4">"{t.quote}"</p>
              <footer className="text-gray-900 font-semibold">{t.author}</footer>
              <p className="text-sm text-gray-400">{t.role}</p>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}`,
    "src/components/Experience.jsx": `export default function Experience({ data }) {
  if (!data?.length) return null;
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-black text-gray-900 mb-8">Experience</h2>
        <div className="space-y-8">
          {data.map((exp, i) => (
            <div key={i} className="border-l-4 border-purple-500 pl-6">
              <h3 className="text-xl font-bold text-gray-900">{exp.position}</h3>
              <p className="text-purple-600 font-medium">{exp.company}</p>
              <p className="text-sm text-gray-400 mb-2">{exp.duration}</p>
              <p className="text-gray-500">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`,
    "src/components/Contact.jsx": `export default function Contact({ data }) {
  if (!data) return null;
  return (
    <section className="py-24 px-6 bg-gray-900">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl font-black text-white mb-4">Let's Work Together</h2>
        <p className="text-gray-400 mb-8">{data.message}</p>
        {data.email && <a href={"mailto:" + data.email} className="inline-block px-8 py-3 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 transition-colors">{data.email}</a>}
      </div>
    </section>
  );
}`,
    "src/App.jsx": `import portfolioData from './data/portfolio.json';
import Hero from './components/Hero';
import About from './components/About';
import FeaturedWork from './components/FeaturedWork';
import Skills from './components/Skills';
import Testimonials from './components/Testimonials';
import Experience from './components/Experience';
import Contact from './components/Contact';

export default function App() {
  return (
    <main>
      <Hero data={portfolioData.hero} />
      <About data={portfolioData.about} />
      <FeaturedWork data={portfolioData.featuredWork} />
      <Skills data={portfolioData.skills} />
      <Testimonials data={portfolioData.testimonials} />
      <Experience data={portfolioData.experience} />
      <Contact data={portfolioData.contact} />
    </main>
  );
}`,
  };
}

function generateSeniorEngineerComponents() {
  return {
    "src/components/Hero.jsx": `export default function Hero({ data }) {
  if (!data) return null;
  return (
    <section className="bg-slate-900 py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-2">{data.name}</h1>
        <p className="text-xl text-blue-400 mb-4">{data.title}</p>
        <div className="flex gap-4 text-slate-400 text-sm">
          {data.location && <span>{data.location}</span>}
          {data.email && <a href={"mailto:" + data.email} className="hover:text-blue-400">{data.email}</a>}
        </div>
      </div>
    </section>
  );
}`,
    "src/components/Summary.jsx": `export default function Summary({ data }) {
  if (!data) return null;
  return (
    <section className="py-12 px-6 border-b border-slate-200">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Professional Summary</h2>
        <p className="text-slate-600 leading-relaxed">{data.text}</p>
      </div>
    </section>
  );
}`,
    "src/components/CareerTimeline.jsx": `export default function CareerTimeline({ data }) {
  if (!data?.length) return null;
  return (
    <section className="py-12 px-6 border-b border-slate-200">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Career Timeline</h2>
        <div className="space-y-8">
          {data.map((item, i) => (
            <div key={i} className="flex gap-6">
              <div className="w-32 flex-shrink-0 text-sm text-slate-400 pt-1">{item.duration}</div>
              <div className="border-l-2 border-blue-500 pl-6 pb-4">
                <h3 className="text-lg font-semibold text-slate-900">{item.position}</h3>
                <p className="text-blue-600 font-medium">{item.company}</p>
                <p className="text-slate-500 mt-2">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`,
    "src/components/TechnicalSkills.jsx": `export default function TechnicalSkills({ data }) {
  if (!data?.length) return null;
  return (
    <section className="py-12 px-6 border-b border-slate-200">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Technical Skills</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {data.map((group, i) => (
            <div key={i}>
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">{group.category}</h3>
              <p className="text-slate-700">{group.items?.join(', ')}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`,
    "src/components/MajorProjects.jsx": `export default function MajorProjects({ data }) {
  if (!data?.length) return null;
  return (
    <section className="py-12 px-6 border-b border-slate-200">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Major Projects</h2>
        <div className="space-y-6">
          {data.map((project, i) => (
            <div key={i} className="bg-slate-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{project.name}</h3>
              <p className="text-slate-600 mb-3">{project.description}</p>
              {project.impact && <p className="text-sm text-blue-600 font-medium">Impact: {project.impact}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`,
    "src/components/Certifications.jsx": `export default function Certifications({ data }) {
  if (!data?.length) return null;
  return (
    <section className="py-12 px-6 border-b border-slate-200">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Certifications</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {data.map((cert, i) => (
            <div key={i} className="border border-slate-200 rounded-lg p-4">
              <h3 className="font-semibold text-slate-900">{cert.name}</h3>
              <p className="text-sm text-slate-400">{cert.issuer} &middot; {cert.year}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`,
    "src/components/Contact.jsx": `export default function Contact({ data }) {
  if (!data) return null;
  return (
    <section className="py-12 px-6 bg-slate-900">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Contact</h2>
        {data.email && <a href={"mailto:" + data.email} className="text-blue-400 hover:underline">{data.email}</a>}
        {data.linkedin && <p className="mt-2"><a href={data.linkedin} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-400">LinkedIn</a></p>}
      </div>
    </section>
  );
}`,
    "src/App.jsx": `import portfolioData from './data/portfolio.json';
import Hero from './components/Hero';
import Summary from './components/Summary';
import CareerTimeline from './components/CareerTimeline';
import TechnicalSkills from './components/TechnicalSkills';
import MajorProjects from './components/MajorProjects';
import Certifications from './components/Certifications';
import Contact from './components/Contact';

export default function App() {
  return (
    <main className="bg-white min-h-screen">
      <Hero data={portfolioData.hero} />
      <Summary data={portfolioData.summary} />
      <CareerTimeline data={portfolioData.careerTimeline} />
      <TechnicalSkills data={portfolioData.technicalSkills} />
      <MajorProjects data={portfolioData.majorProjects} />
      <Certifications data={portfolioData.certifications} />
      <Contact data={portfolioData.contact} />
    </main>
  );
}`,
  };
}

function generateFounderPortfolioComponents() {
  return {
    "src/components/Hero.jsx": `export default function Hero({ data }) {
  if (!data) return null;
  return (
    <section className="min-h-screen flex items-center bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-6xl font-black text-gray-900 mb-4">{data.name}</h1>
        <p className="text-2xl text-orange-600 font-medium mb-4">{data.title}</p>
        <p className="text-xl text-gray-500 max-w-2xl">{data.tagline}</p>
      </div>
    </section>
  );
}`,
    "src/components/Story.jsx": `export default function Story({ data }) {
  if (!data) return null;
  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-black text-gray-900 mb-8">My Story</h2>
        <p className="text-lg text-gray-600 leading-relaxed">{data.text}</p>
      </div>
    </section>
  );
}`,
    "src/components/ProductsBuilt.jsx": `export default function ProductsBuilt({ data }) {
  if (!data?.length) return null;
  return (
    <section className="py-24 px-6 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-black text-gray-900 mb-12">Products Built</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {data.map((product, i) => (
            <div key={i} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
              <p className="text-gray-500 mb-4">{product.description}</p>
              {product.url && <a href={product.url} target="_blank" rel="noreferrer" className="text-orange-600 font-medium hover:underline">Visit</a>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`,
    "src/components/CaseStudies.jsx": `export default function CaseStudies({ data }) {
  if (!data?.length) return null;
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-black text-gray-900 mb-12">Case Studies</h2>
        <div className="space-y-12">
          {data.map((cs, i) => (
            <div key={i} className="border-l-4 border-orange-500 pl-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{cs.title}</h3>
              <p className="text-gray-600 mb-2">{cs.challenge}</p>
              <p className="text-gray-500">{cs.outcome}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`,
    "src/components/Blogs.jsx": `export default function Blogs({ data }) {
  if (!data?.length) return null;
  return (
    <section className="py-24 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-black text-gray-900 mb-12">Blog</h2>
        <div className="space-y-6">
          {data.map((blog, i) => (
            <a key={i} href={blog.url} target="_blank" rel="noreferrer" className="block bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-gray-900 mb-2">{blog.title}</h3>
              <p className="text-gray-500">{blog.excerpt}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}`,
    "src/components/Testimonials.jsx": `export default function Testimonials({ data }) {
  if (!data?.length) return null;
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-black text-gray-900 mb-12">Testimonials</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {data.map((t, i) => (
            <blockquote key={i} className="bg-orange-50 rounded-2xl p-8">
              <p className="text-gray-700 italic mb-4">"{t.quote}"</p>
              <footer className="font-semibold text-gray-900">{t.author}</footer>
              <p className="text-sm text-gray-400">{t.role}</p>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}`,
    "src/components/Contact.jsx": `export default function Contact({ data }) {
  if (!data) return null;
  return (
    <section className="py-24 px-6 bg-gray-900">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl font-black text-white mb-4">Let's Connect</h2>
        <p className="text-gray-400 mb-8">{data.message}</p>
        {data.email && <a href={"mailto:" + data.email} className="inline-block px-8 py-3 bg-orange-500 text-white rounded-full font-medium hover:bg-orange-600 transition-colors">{data.email}</a>}
      </div>
    </section>
  );
}`,
    "src/App.jsx": `import portfolioData from './data/portfolio.json';
import Hero from './components/Hero';
import Story from './components/Story';
import ProductsBuilt from './components/ProductsBuilt';
import CaseStudies from './components/CaseStudies';
import Blogs from './components/Blogs';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';

export default function App() {
  return (
    <main>
      <Hero data={portfolioData.hero} />
      <Story data={portfolioData.story} />
      <ProductsBuilt data={portfolioData.productsBuilt} />
      <CaseStudies data={portfolioData.caseStudies} />
      <Blogs data={portfolioData.blogs} />
      <Testimonials data={portfolioData.testimonials} />
      <Contact data={portfolioData.contact} />
    </main>
  );
}`,
  };
}

export async function generateExport(portfolio) {
  const template = portfolio.templateId;
  const exportData = nestPortfolioData(portfolio.portfolioData, template.schema);

  return new Promise((resolve, reject) => {
    const archive = archiver("zip", { zlib: { level: 9 } });
    const chunks = [];

    archive.on("data", (chunk) => chunks.push(chunk));
    archive.on("end", () => resolve(Buffer.concat(chunks)));
    archive.on("error", reject);

    archive.append(generatePackageJson(), {
      name: "my-portfolio/package.json",
    });
    archive.append(generateViteConfig(), {
      name: "my-portfolio/vite.config.js",
    });
    archive.append(generateTailwindConfig(), {
      name: "my-portfolio/tailwind.config.js",
    });
    archive.append(generatePostcssConfig(), {
      name: "my-portfolio/postcss.config.js",
    });
    archive.append(generateIndexHtml(), { name: "my-portfolio/index.html" });
    archive.append(generateMainJsx(), { name: "my-portfolio/src/main.jsx" });
    archive.append(generateIndexCss(), { name: "my-portfolio/src/index.css" });
    archive.append(generateReadme(), { name: "my-portfolio/README.md" });

    archive.append(JSON.stringify(exportData, null, 2), {
      name: "my-portfolio/src/data/portfolio.json",
    });

    const components = getTemplateComponents(template.templatePath);
    for (const [path, content] of Object.entries(components)) {
      archive.append(content, { name: `my-portfolio/${path}` });
    }

    archive.finalize();
  });
}

function nestPortfolioData(data, schema) {
  if (!schema?.sections || !data) return data;

  const allFieldKeys = new Set(
    schema.sections.flatMap((s) => s.fields.map((f) => f.key)),
  );
  const topKeys = Object.keys(data);
  const isAlreadyNested = topKeys.length > 0 && topKeys.every(
    (k) => schema.sections.some((s) => s.id === k) && typeof data[k] === "object" && !Array.isArray(data[k]),
  );
  if (isAlreadyNested) return data;

  const isFlat = topKeys.some((k) => allFieldKeys.has(k));
  if (!isFlat) return data;

  const nested = {};
  for (const section of schema.sections) {
    const fields = section.fields;
    if (fields.length === 1 && fields[0].key === section.id && fields[0].key in data) {
      nested[section.id] = data[fields[0].key];
    } else {
      const sectionData = {};
      for (const field of fields) {
        if (field.key in data) {
          sectionData[field.key] = data[field.key];
        }
      }
      if (Object.keys(sectionData).length > 0) {
        nested[section.id] = sectionData;
      }
    }
  }
  return nested;
}
