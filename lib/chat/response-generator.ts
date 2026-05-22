import { StructuredContent } from "./types";

// Update the generateStructuredResponse function to handle specific project types
export function generateStructuredResponse(
  queryType: string
): StructuredContent | null {

  // Define individual project templates
  const projectTemplates: Record<
    string,
    {
      title: string;
      description: string;
      technologies: string[];
      link: string;
    }[]
  > = {

    unitoids_project: [
      {
        title: "unitoids",
        description:
          "AI-powered freelancing platform connecting clients and freelancers.",

        technologies: [
          "MongoDB",
          "Express.js",
          "React.js",
          "Node.js",
          "Clerk",
          "LangChain",
          "FAISS",
        ],

        link: "https://github.com/Ahamedin/Unitoids.git",
      },
    ],

    LinkED_project: [
      {
        title: "LinkED",

        description:
          "AI-powered career platform for resume building and interview preparation.",

        technologies: [
          "Next.js",
          "React.js",
          "Node.js",
          "Clerk",
          "PostgreSQL",
          "Gemini AI",
        ],

        link: "https://github.com/Ahamedin/LinkED.git",
      },
    ],

    arvr_training_project: [
      {
        title: "AR/VR Training Institute Website",

        description:
          "Immersive AR/VR training platform with interactive 3D experiences and modern UI.",

        technologies: [
          "Next.js",
          "Three.js",
          "React Three Fiber",
          "Framer Motion",
        ],

        link: "https://github.com/Ahamedin/ARVR-Web.git",
      },
    ],

  };

  // Contact Templates
  const contactTemplates: Record<
    string,
    {
      email?: string;
      phone?: string;
      location?: string;
      type: string;
    }
  > = {

    email_contact: {
      email: "iklashriz@gmail.com",
      type: "Email",
    },

    phone_contact: {
      phone: "+91 86103 38487",
      type: "Phone",
    },

    location_contact: {
      location: "Tamil Nadu, India",
      type: "Location",
    },
  };

  // Link Templates
  const linkTemplates: Record<
    string,
    {
      title: string;
      url: string;
      description: string;
    }[]
  > = {

    github_link: [
      {
        title: "GitHub Profile",

        url: "https://github.com/Ahamedin",

        description:
          "Check out my repositories and open-source contributions.",
      },
    ],

    linkedin_link: [
      {
        title: "LinkedIn Profile",

        url: "https://www.linkedin.com/in/iklash",

        description:
          "Connect with me professionally on LinkedIn.",
      },
    ],

    project_links: [
      {
        title: "unitoids",

        url: "https://github.com/Ahamedin/unitoids",

        description:
          "AI-powered freelancing platform connecting clients and freelancers.",
      },

      {
        title: "LinkED",

        url: "https://github.com/Ahamedin/LinkED",

        description:
          "AI-powered career platform for resume building and interview preparation.",
      },

      {
        title: "AR/VR Training Institute Website",

        url: "https://github.com/Ahamedin/ARVR-Web.git",

        description:
          "Immersive AR/VR training platform with modern 3D web experiences.",
      },

      {
        title: "Electronics E-Commerce Platform",

        url: "https://github.com/Ahamedin/ecommerce-platform",

        description:
          "Responsive electronics e-commerce platform with admin features.",
      },
    ],
  };

  // Structured Data Templates
  const structuredDataTemplates: Record<string, unknown> = {

    skills: [
      { name: "Java", category: "Programming Language" },
      { name: "JavaScript", category: "Programming Language" },
      { name: "TypeScript", category: "Programming Language" },
      
      

      { name: "React.js", category: "Frontend Framework" },
      { name: "Next.js", category: "Frontend Framework" },

      { name: "Node.js", category: "Backend" },
      { name: "Express.js", category: "Backend" },

      { name: "PostgreSQL", category: "Database" },
      { name: "MongoDB", category: "Database" },
      { name: "MySQL", category: "Database" },

      { name: "LangChain", category: "AI Framework" },
      { name: "Gemini AI", category: "AI Integration" },
      { name: "Git", category: "Version Control" },
      { name: "Postman", category: "API Testing Tool" },
      { name: "Prisma", category: "ORM" },
      { name: "Clerk", category: "Authentication" },
      { name: "Three.js", category: "3D Web Development" },
    ],

    projects: [
      {
        title: "unitoids",

        description:
          "AI-powered freelancing platform connecting clients and freelancers.",

        technologies: [
          "MongoDB",
          "Express.js",
          "React.js",
          "Node.js",
          "Clerk",
          "LangChain",
          "FAISS",
        ],

        link: "https://github.com/Ahamedin/Unitoids",
      },

      {
        title: "LinkED",

        description:
          "AI-powered career platform for resume building and interview preparation.",

        technologies: [
          "Next.js",
          "React.js",
          "Node.js",
          "PostgreSQL",
          "Gemini AI",
        ],

        link: "https://github.com/Ahamedin/LinkED",
      },

      {
        title: "AR/VR Training Institute Website",

        description:
          "Immersive AR/VR training platform with interactive 3D experiences.",

        technologies: [
          "Next.js",
          "Three.js",
          "React Three Fiber",
        ],

        link: "https://github.com/Ahamedin/ARVR-Web.git",
      },
    ],

    experience: [
      {
        title: "Web Development Intern",

        company: "DrobospaceX Automation Pvt. Ltd.",

        period: "May 2025 - June 2025",

        description:
          "Developed full-stack web applications using PERN stack and contributed to immersive AR/VR training institute website development using Next.js, Three.js, and React Three Fiber.",
      },
    ],

    education: [
      {
        title: "B.Tech Information Technology",

        institution:
          "Kalasalingam Academy of Research and Education",

        period: "2023 - 2027",

        description:
          "Focused on Data Science, IoT, COA, and Web Development.",
      },
    ],

    contact: {
      email: "iklashriz@gmail.com",

      phone: "+91 86103 38487",

      location: "Tamil Nadu, India",

      linkedin:
        "https://www.linkedin.com/in/iklash",

      github:
        "https://github.com/Ahamedin",
    },

    links: [
      {
        title: "GitHub Profile",

        url: "https://github.com/Ahamedin",

        description:
          "Check out my repositories and contributions.",
      },

      {
        title: "LinkedIn",

        url:
          "https://www.linkedin.com/in/iklash",

        description:
          "Connect with me professionally.",
      },
    ],
    summary: {
      title: "Full Stack Developer",
      description:
        "Passionate Full Stack Developer focused on MERN stack, scalable backend systems, AI integrations, and immersive frontend experiences. Currently improving DSA and system design skills for SDE roles.",
    },

    achievements: [
      {
        title: "Top 3 - Web Innovate",
        description:
          "Won Top 3 position in Web Innovate event for web design and frontend development.",
      },
    ],
  };

  // Specific Project Type
  if (queryType.includes("_project")) {
    return {
      type: "projects",
      data: projectTemplates[queryType],
    };
  }

  // Specific Contact Type
  if (queryType.includes("_contact")) {
    return {
      type: "contact",
      data: contactTemplates[queryType],
    };
  }

  // Specific Link Type
  if (queryType.includes("_link")) {
    return {
      type: "links",
      data: linkTemplates[queryType],
    };
  }

  // General Category
  if (structuredDataTemplates[queryType]) {
    return {
      type: queryType,
      data: structuredDataTemplates[queryType],
    };
  }

  return null;
}