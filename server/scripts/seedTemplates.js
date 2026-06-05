import "dotenv/config";
import mongoose from "mongoose";
import Template from "../src/models/Template.js";

const templates = [
  {
    name: "Minimal Engineer",
    description:
      "Clean, simple, and professional portfolio for engineers who let their work speak.",
    category: "minimal",
    templatePath: "minimal-engineer",
    previewImage: "/previews/minimal-engineer.png",
    isOfficial: true,
    schema: {
      sections: [
        {
          id: "hero",
          label: "Hero",
          fields: [
            { key: "name", type: "text", label: "Full Name", required: true },
            {
              key: "role",
              type: "text",
              label: "Role / Title",
              required: true,
            },
            {
              key: "description",
              type: "textarea",
              label: "Short Description",
            },
          ],
        },
        {
          id: "about",
          label: "About",
          fields: [
            { key: "bio", type: "textarea", label: "Bio", required: true },
          ],
        },
        {
          id: "skills",
          label: "Skills",
          fields: [
            { key: "skills", type: "array", label: "Skills", itemType: "text" },
          ],
        },
        {
          id: "experience",
          label: "Experience",
          fields: [
            {
              key: "experience",
              type: "objectList",
              label: "Experience",
              fields: [
                {
                  key: "company",
                  type: "text",
                  label: "Company",
                  required: true,
                },
                {
                  key: "position",
                  type: "text",
                  label: "Position",
                  required: true,
                },
                { key: "duration", type: "text", label: "Duration" },
                { key: "description", type: "textarea", label: "Description" },
              ],
            },
          ],
        },
        {
          id: "projects",
          label: "Projects",
          fields: [
            {
              key: "projects",
              type: "objectList",
              label: "Projects",
              fields: [
                {
                  key: "name",
                  type: "text",
                  label: "Project Name",
                  required: true,
                },
                { key: "description", type: "textarea", label: "Description" },
                { key: "liveUrl", type: "url", label: "Live URL" },
                { key: "githubUrl", type: "url", label: "GitHub URL" },
              ],
            },
          ],
        },
        {
          id: "education",
          label: "Education",
          fields: [
            {
              key: "education",
              type: "objectList",
              label: "Education",
              fields: [
                {
                  key: "degree",
                  type: "text",
                  label: "Degree",
                  required: true,
                },
                {
                  key: "school",
                  type: "text",
                  label: "School",
                  required: true,
                },
                { key: "year", type: "text", label: "Year" },
              ],
            },
          ],
        },
        {
          id: "blogs",
          label: "Blogs",
          fields: [
            {
              key: "blogs",
              type: "objectList",
              label: "Blog Posts",
              fields: [
                { key: "title", type: "text", label: "Title", required: true },
                { key: "excerpt", type: "textarea", label: "Excerpt" },
                { key: "url", type: "url", label: "URL" },
              ],
            },
          ],
        },
        {
          id: "contact",
          label: "Contact",
          fields: [
            { key: "email", type: "text", label: "Email" },
            { key: "message", type: "textarea", label: "Contact Message" },
          ],
        },
      ],
    },
  },
  {
    name: "Modern Dark Developer",
    description:
      "Dark-themed gradient portfolio with a SaaS-inspired look for modern developers.",
    category: "dark",
    templatePath: "modern-dark-developer",
    previewImage: "/previews/modern-dark-developer.png",
    isOfficial: true,
    schema: {
      sections: [
        {
          id: "hero",
          label: "Hero",
          fields: [
            {
              key: "greeting",
              type: "text",
              label: "Greeting",
              required: true,
            },
            { key: "name", type: "text", label: "Full Name", required: true },
            { key: "role", type: "text", label: "Role", required: true },
            { key: "description", type: "textarea", label: "Description" },
          ],
        },
        {
          id: "techStack",
          label: "Tech Stack",
          fields: [
            {
              key: "techStack",
              type: "array",
              label: "Technologies",
              itemType: "text",
            },
          ],
        },
        {
          id: "experience",
          label: "Experience",
          fields: [
            {
              key: "experience",
              type: "objectList",
              label: "Experience",
              fields: [
                {
                  key: "company",
                  type: "text",
                  label: "Company",
                  required: true,
                },
                {
                  key: "position",
                  type: "text",
                  label: "Position",
                  required: true,
                },
                { key: "duration", type: "text", label: "Duration" },
                { key: "description", type: "textarea", label: "Description" },
              ],
            },
          ],
        },
        {
          id: "projects",
          label: "Projects",
          fields: [
            {
              key: "projects",
              type: "objectList",
              label: "Projects",
              fields: [
                {
                  key: "name",
                  type: "text",
                  label: "Project Name",
                  required: true,
                },
                { key: "description", type: "textarea", label: "Description" },
                { key: "liveUrl", type: "url", label: "Live URL" },
                { key: "githubUrl", type: "url", label: "GitHub URL" },
              ],
            },
          ],
        },
        {
          id: "openSource",
          label: "Open Source",
          fields: [
            {
              key: "openSource",
              type: "objectList",
              label: "Contributions",
              fields: [
                {
                  key: "name",
                  type: "text",
                  label: "Project Name",
                  required: true,
                },
                { key: "description", type: "textarea", label: "Description" },
                { key: "url", type: "url", label: "URL" },
              ],
            },
          ],
        },
        {
          id: "achievements",
          label: "Achievements",
          fields: [
            {
              key: "achievements",
              type: "objectList",
              label: "Achievements",
              fields: [
                { key: "title", type: "text", label: "Title", required: true },
                { key: "description", type: "textarea", label: "Description" },
              ],
            },
          ],
        },
        {
          id: "socialLinks",
          label: "Social Links",
          fields: [
            {
              key: "socialLinks",
              type: "objectList",
              label: "Social Links",
              fields: [
                {
                  key: "platform",
                  type: "text",
                  label: "Platform",
                  required: true,
                },
                { key: "url", type: "url", label: "URL", required: true },
              ],
            },
          ],
        },
        {
          id: "contact",
          label: "Contact",
          fields: [
            { key: "email", type: "text", label: "Email" },
            { key: "message", type: "textarea", label: "Contact Message" },
          ],
        },
      ],
    },
  },
  {
    name: "Creative Developer",
    description:
      "Bold typography and modern layout for developers who want to showcase creative work.",
    category: "creative",
    templatePath: "creative-developer",
    previewImage: "/previews/creative-developer.png",
    isOfficial: true,
    schema: {
      sections: [
        {
          id: "hero",
          label: "Hero",
          fields: [
            { key: "name", type: "text", label: "Full Name", required: true },
            { key: "role", type: "text", label: "Role", required: true },
            { key: "tagline", type: "textarea", label: "Tagline" },
          ],
        },
        {
          id: "about",
          label: "About",
          fields: [
            { key: "bio", type: "textarea", label: "Bio", required: true },
          ],
        },
        {
          id: "featuredWork",
          label: "Featured Work",
          fields: [
            {
              key: "featuredWork",
              type: "objectList",
              label: "Projects",
              fields: [
                { key: "title", type: "text", label: "Title", required: true },
                { key: "description", type: "textarea", label: "Description" },
                { key: "url", type: "url", label: "URL" },
              ],
            },
          ],
        },
        {
          id: "skills",
          label: "Skills",
          fields: [
            { key: "skills", type: "array", label: "Skills", itemType: "text" },
          ],
        },
        {
          id: "testimonials",
          label: "Testimonials",
          fields: [
            {
              key: "testimonials",
              type: "objectList",
              label: "Testimonials",
              fields: [
                {
                  key: "quote",
                  type: "textarea",
                  label: "Quote",
                  required: true,
                },
                {
                  key: "author",
                  type: "text",
                  label: "Author",
                  required: true,
                },
                { key: "role", type: "text", label: "Role" },
              ],
            },
          ],
        },
        {
          id: "experience",
          label: "Experience",
          fields: [
            {
              key: "experience",
              type: "objectList",
              label: "Experience",
              fields: [
                {
                  key: "company",
                  type: "text",
                  label: "Company",
                  required: true,
                },
                {
                  key: "position",
                  type: "text",
                  label: "Position",
                  required: true,
                },
                { key: "duration", type: "text", label: "Duration" },
                { key: "description", type: "textarea", label: "Description" },
              ],
            },
          ],
        },
        {
          id: "contact",
          label: "Contact",
          fields: [
            { key: "email", type: "text", label: "Email" },
            { key: "message", type: "textarea", label: "Contact Message" },
          ],
        },
      ],
    },
  },
  {
    name: "Senior Engineer Resume",
    description:
      "Professional resume-style portfolio for experienced engineers and tech leads.",
    category: "professional",
    templatePath: "senior-engineer-resume",
    previewImage: "/previews/senior-engineer-resume.png",
    isOfficial: true,
    schema: {
      sections: [
        {
          id: "hero",
          label: "Hero",
          fields: [
            { key: "name", type: "text", label: "Full Name", required: true },
            {
              key: "title",
              type: "text",
              label: "Professional Title",
              required: true,
            },
            { key: "location", type: "text", label: "Location" },
            { key: "email", type: "text", label: "Email" },
          ],
        },
        {
          id: "summary",
          label: "Summary",
          fields: [
            {
              key: "text",
              type: "textarea",
              label: "Professional Summary",
              required: true,
            },
          ],
        },
        {
          id: "careerTimeline",
          label: "Career Timeline",
          fields: [
            {
              key: "careerTimeline",
              type: "objectList",
              label: "Career Entries",
              fields: [
                {
                  key: "position",
                  type: "text",
                  label: "Position",
                  required: true,
                },
                {
                  key: "company",
                  type: "text",
                  label: "Company",
                  required: true,
                },
                { key: "duration", type: "text", label: "Duration" },
                { key: "description", type: "textarea", label: "Description" },
              ],
            },
          ],
        },
        {
          id: "technicalSkills",
          label: "Technical Skills",
          fields: [
            {
              key: "technicalSkills",
              type: "objectList",
              label: "Skill Groups",
              fields: [
                {
                  key: "category",
                  type: "text",
                  label: "Category",
                  required: true,
                },
                {
                  key: "items",
                  type: "array",
                  label: "Skills",
                  itemType: "text",
                },
              ],
            },
          ],
        },
        {
          id: "majorProjects",
          label: "Major Projects",
          fields: [
            {
              key: "majorProjects",
              type: "objectList",
              label: "Projects",
              fields: [
                {
                  key: "name",
                  type: "text",
                  label: "Project Name",
                  required: true,
                },
                { key: "description", type: "textarea", label: "Description" },
                { key: "impact", type: "text", label: "Impact" },
              ],
            },
          ],
        },
        {
          id: "certifications",
          label: "Certifications",
          fields: [
            {
              key: "certifications",
              type: "objectList",
              label: "Certifications",
              fields: [
                {
                  key: "name",
                  type: "text",
                  label: "Certification Name",
                  required: true,
                },
                { key: "issuer", type: "text", label: "Issuer" },
                { key: "year", type: "text", label: "Year" },
              ],
            },
          ],
        },
        {
          id: "contact",
          label: "Contact",
          fields: [
            { key: "email", type: "text", label: "Email" },
            { key: "linkedin", type: "url", label: "LinkedIn URL" },
          ],
        },
      ],
    },
  },
  {
    name: "Founder Portfolio",
    description:
      "Personal brand portfolio for founders, indie hackers, and product builders.",
    category: "brand",
    templatePath: "founder-portfolio",
    previewImage: "/previews/founder-portfolio.png",
    isOfficial: true,
    schema: {
      sections: [
        {
          id: "hero",
          label: "Hero",
          fields: [
            { key: "name", type: "text", label: "Full Name", required: true },
            { key: "title", type: "text", label: "Title", required: true },
            { key: "tagline", type: "textarea", label: "Tagline" },
          ],
        },
        {
          id: "story",
          label: "Story",
          fields: [
            {
              key: "text",
              type: "textarea",
              label: "Your Story",
              required: true,
            },
          ],
        },
        {
          id: "productsBuilt",
          label: "Products Built",
          fields: [
            {
              key: "productsBuilt",
              type: "objectList",
              label: "Products",
              fields: [
                {
                  key: "name",
                  type: "text",
                  label: "Product Name",
                  required: true,
                },
                { key: "description", type: "textarea", label: "Description" },
                { key: "url", type: "url", label: "URL" },
              ],
            },
          ],
        },
        {
          id: "caseStudies",
          label: "Case Studies",
          fields: [
            {
              key: "caseStudies",
              type: "objectList",
              label: "Case Studies",
              fields: [
                { key: "title", type: "text", label: "Title", required: true },
                { key: "challenge", type: "textarea", label: "Challenge" },
                { key: "outcome", type: "textarea", label: "Outcome" },
              ],
            },
          ],
        },
        {
          id: "blogs",
          label: "Blogs",
          fields: [
            {
              key: "blogs",
              type: "objectList",
              label: "Blog Posts",
              fields: [
                { key: "title", type: "text", label: "Title", required: true },
                { key: "excerpt", type: "textarea", label: "Excerpt" },
                { key: "url", type: "url", label: "URL" },
              ],
            },
          ],
        },
        {
          id: "testimonials",
          label: "Testimonials",
          fields: [
            {
              key: "testimonials",
              type: "objectList",
              label: "Testimonials",
              fields: [
                {
                  key: "quote",
                  type: "textarea",
                  label: "Quote",
                  required: true,
                },
                {
                  key: "author",
                  type: "text",
                  label: "Author",
                  required: true,
                },
                { key: "role", type: "text", label: "Role" },
              ],
            },
          ],
        },
        {
          id: "contact",
          label: "Contact",
          fields: [
            { key: "email", type: "text", label: "Email" },
            { key: "message", type: "textarea", label: "Contact Message" },
          ],
        },
      ],
    },
  },
];

async function seed() {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/devfolio-forge",
    );
    console.log("Connected to MongoDB");

    await Template.deleteMany({ isOfficial: true });
    console.log("Cleared existing official templates");

    await Template.insertMany(templates);
    console.log(`Seeded ${templates.length} templates`);

    await mongoose.disconnect();
    console.log("Done");
  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  }
}

seed();
