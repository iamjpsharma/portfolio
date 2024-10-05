import { personalData } from "@/utils/data/personal-data";
import AboutSection from "./components/homepage/about";
import Blog from "./components/homepage/blog";
import ContactSection from "./components/homepage/contact";
import Education from "./components/homepage/education";
import Experience from "./components/homepage/experience";
import HeroSection from "./components/homepage/hero-section";
import Projects from "./components/homepage/projects";
import Skills from "./components/homepage/skills";

// Fetch data during the build process (static export)
async function getData() {
  const url = `https://dev.to/api/articles/me`;
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/vnd.forem.api-v1+json',
        'api-key': process.env.DEV_TO_API_KEY,
      },
      // This ensures the data is fetched at build time and cached
      next: { revalidate: 10 }, // (Optional) Revalidate every 10 seconds (if you want ISR-like behavior)
    });
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
}

// Page component that renders the homepage
export default async function Home() {
  const blogs = await getData(); // Fetch blog data

  return (
    <>
      <HeroSection />
      <AboutSection />
      <Experience />
      <Skills />
      <Projects />
      <Education />
      <Blog blogs={blogs} />
      <ContactSection />
    </>
  );
}
