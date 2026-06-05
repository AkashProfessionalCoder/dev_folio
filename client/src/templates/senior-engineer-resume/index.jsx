import Hero from './components/Hero';
import Summary from './components/Summary';
import CareerTimeline from './components/CareerTimeline';
import TechnicalSkills from './components/TechnicalSkills';
import MajorProjects from './components/MajorProjects';
import Certifications from './components/Certifications';
import Contact from './components/Contact';

export default function SeniorEngineerResume({ portfolioData }) {
  return (
    <main className="bg-white min-h-screen">
      <Hero data={portfolioData.hero || portfolioData} />
      <Summary data={portfolioData.summary || portfolioData} />
      <CareerTimeline data={portfolioData.careerTimeline} />
      <TechnicalSkills data={portfolioData.technicalSkills} />
      <MajorProjects data={portfolioData.majorProjects} />
      <Certifications data={portfolioData.certifications} />
      <Contact data={portfolioData.contact || portfolioData} />
    </main>
  );
}
