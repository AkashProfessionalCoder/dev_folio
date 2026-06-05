import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Blogs from "./components/Blogs";
import Contact from "./components/Contact";

export default function MinimalEngineer({ portfolioData }) {
  return (
    <main>
      <Hero data={portfolioData.hero || portfolioData} />
      <About data={portfolioData.about || portfolioData} />
      <Skills data={portfolioData.skills} />
      <Experience data={portfolioData.experience} />
      <Projects data={portfolioData.projects} />
      <Education data={portfolioData.education} />
      <Blogs data={portfolioData.blogs} />
      <Contact data={portfolioData.contact || portfolioData} />
    </main>
  );
}
