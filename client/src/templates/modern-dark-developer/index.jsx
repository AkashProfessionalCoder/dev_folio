import Hero from './components/Hero';
import TechStack from './components/TechStack';
import Experience from './components/Experience';
import Projects from './components/Projects';
import OpenSource from './components/OpenSource';
import Achievements from './components/Achievements';
import SocialLinks from './components/SocialLinks';
import Contact from './components/Contact';

export default function ModernDarkDeveloper({ portfolioData }) {
  return (
    <main className="bg-black min-h-screen">
      <Hero data={portfolioData.hero || portfolioData} />
      <TechStack data={portfolioData.techStack} />
      <Experience data={portfolioData.experience} />
      <Projects data={portfolioData.projects} />
      <OpenSource data={portfolioData.openSource} />
      <Achievements data={portfolioData.achievements} />
      <SocialLinks data={portfolioData.socialLinks} />
      <Contact data={portfolioData.contact || portfolioData} />
    </main>
  );
}
