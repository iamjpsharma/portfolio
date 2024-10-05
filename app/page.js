import { personalData } from "@/utils/data/personal-data";
import AboutSection from "./components/homepage/about";
import Blog from "./components/homepage/blog";
import ContactSection from "./components/homepage/contact";
import Education from "./components/homepage/education";
import Experience from "./components/homepage/experience";
import HeroSection from "./components/homepage/hero-section";
import Projects from "./components/homepage/projects";
import Skills from "./components/homepage/skills";

async function getData() {
  const url = `https://dev.to/api/articles/me`;
  try {
      const res = await fetch(url, {
          method: 'GET',
          headers: {
              'Accept': 'application/vnd.forem.api-v1+json',
              'api-key': process.env.DEV_TO_API_KEY
          }
      });
      if (!res.ok) {
          throw new Error('Failed to fetch data');
      }
      const textData = await res.text();
      const data = JSON.parse(textData); 
      return data;

  } catch (error) {
      throw error; 
  }
}
export default async function Home() {
  const blogs = await getData();

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
  )
};