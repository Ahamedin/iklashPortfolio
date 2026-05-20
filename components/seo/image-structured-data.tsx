export function ProfileImagesSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ImageGallery",
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": "https://your-domain.com",
          },
          about: {
            "@type": "Person",
            name: "Iklash Ahamed",
            description:
              "Full Stack Developer specializing in Next.js, React.js, AI-powered applications, and MERN stack development.",
          },
          associatedMedia: [
            {
              "@type": "ImageObject",
              contentUrl: "https://your-domain.com/iklash1.PNG",
              name: "Iklash Ahamed - Full Stack Developer Primary Profile",
              description:
                "Primary profile photo of Iklash Ahamed, Full Stack Developer",
              encodingFormat: "image/png",
              width: "800",
              height: "800",
            },
            {
              "@type": "ImageObject",
              contentUrl: "https://your-domain.com/ik2.PNG",
              name: "Iklash Ahamed - Full Stack Developer Alternate Profile",
              description:
                "Secondary profile photo of Iklash Ahamed, showcasing professional appearance",
              encodingFormat: "image/png",
              width: "800",
              height: "800",
            },
          ],
        }),
      }}
    />
  );
}
