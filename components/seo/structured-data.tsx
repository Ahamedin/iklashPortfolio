export function PersonSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Iklash Ahamed",
          url: "https://your-domain.com",
          sameAs: [
            "https://github.com/Ahamedin",
            "https://www.linkedin.com/in/iklash/",
            "https://leetcode.com/u/IklashAhamed/"
          ],
          jobTitle: "Full Stack Developer",
          knowsAbout: ["Web Development", "AI Applications", "TypeScript", "React", "Next.js"],
          image: "/iklash1.PNG",
          description: "Full Stack Developer specializing in Next.js, React.js, AI-powered applications, and MERN stack development."
        })
      }}
    />
  );
} 